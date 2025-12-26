import { customAlphabet } from "nanoid";
import { ulid } from "ulid";
import { v7 } from "uuid";

export function genNanoid(): string {
	const nanoid = customAlphabet(
		"23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz",
		8,
	);

	return nanoid();
}

export function genUlid(): string {
	return ulid();
}

export function genUuidv7(): string {
	return v7();
}
