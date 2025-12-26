import { execSync } from "child_process";

export const executeGitCommand = (command: string) => {
	return execSync(command)
		.toString("utf8")
		.replace(/[\n\r\s]+$/, "");
};

export const GIT_CURRENT_BRANCH_NAME = executeGitCommand(
	"git rev-parse --abbrev-ref HEAD",
);
export const GIT_COMMIT_SHA = executeGitCommand("git rev-parse HEAD");
export const GIT_COMMIT_SHA_SHORT = executeGitCommand(
	"git rev-parse --short HEAD",
);

const oneliner = executeGitCommand("git log --oneline -1");
export const GIT_BANNER_COMMIT_MESSAGE = `${oneliner}`;
