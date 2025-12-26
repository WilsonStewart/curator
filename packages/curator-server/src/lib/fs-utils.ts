// fs-utils.ts
import { stat, mkdir } from "fs/promises";

/**
 * Returns whether a path exists and what type it is.
 */
export async function existsPath(
	path: string,
): Promise<"file" | "dir" | "other" | null> {
	try {
		const info = await stat(path);
		if (info.isFile()) return "file";
		if (info.isDirectory()) return "dir";
		return "other"; // symlink, socket, FIFO, etc.
	} catch {
		return null; // path doesn't exist
	}
}

/**
 * Returns true if path is a regular file.
 */
export async function existsFile(path: string): Promise<boolean> {
	return (await existsPath(path)) === "file";
}

/**
 * Returns true if path is a directory.
 */
export async function existsDir(path: string): Promise<boolean> {
	return (await existsPath(path)) === "dir";
}

export async function mkDir(path: string): Promise<void> {
	await mkdir(path, { recursive: true });
}
