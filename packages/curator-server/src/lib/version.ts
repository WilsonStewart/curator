import { major, minor, patch, prerelease } from "semver";

interface ISplitSemver {
	major: number;
	minor: number;
	patch: number;
	prereleaseTag: string | null;
	prereleaseVersion: number | null;
}

type TBitwiseVersion = number;
type TPrereleaseTag = "alpha" | "beta" | "rc";

const convert_PrereleaseTagToBitwiseTagRepresentation = (
	tag: TPrereleaseTag | null,
): number => {
	if (tag) {
		switch (tag) {
			case "alpha":
				return 1;
			case "beta":
				return 2;
			case "rc":
				return 3;
			default:
				return 0;
		}
	} else {
		return 0;
	}
};

const convert_BitwiseTagRepresentationToPrereleaseTag = (
	tag: number,
): string | null => {
	switch (tag) {
		case 1:
			return "alpha";
		case 2:
			return "beta";
		case 3:
			return "rc";
		case 0:
			return null;
		default:
			return null;
	}
};

export const convert_SemverToSplitSemver = (semver: string): ISplitSemver => {
	const prereleaseParts = prerelease(semver) ?? [];
	const prereleaseTag = (prereleaseParts[0] as string) || null;
	const prereleaseVersion =
		(prereleaseParts[1] as number) != null ? Number(prereleaseParts[1]) : null;

	return {
		major: major(semver),
		minor: minor(semver),
		patch: patch(semver),
		prereleaseTag: prereleaseTag,
		prereleaseVersion: prereleaseVersion,
	};
};

export const convert_SplitSemverToBitwiseVersion = (
	splitSemver: ISplitSemver,
): TBitwiseVersion => {
	const bitwisePrereleaseTag = splitSemver.prereleaseTag
		? convert_PrereleaseTagToBitwiseTagRepresentation(
				splitSemver.prereleaseTag as TPrereleaseTag,
			)
		: 0;
	const bitwisePrereleaseVersion = splitSemver.prereleaseVersion
		? splitSemver.prereleaseVersion
		: 0;

	return (
		(splitSemver.major << 21) |
		(splitSemver.minor << 13) |
		(splitSemver.patch << 4) |
		(bitwisePrereleaseTag << 2) |
		bitwisePrereleaseVersion
	);
};

export const convert_BitwiseVersionToSplitSemver = (
	bitwiseVersion: number,
): ISplitSemver => {
	return {
		major: (bitwiseVersion >> 21) & 0b111,
		minor: (bitwiseVersion >> 13) & 0b1111_1111,
		patch: (bitwiseVersion >> 4) & 0b1_1111_1111,
		prereleaseTag: convert_BitwiseTagRepresentationToPrereleaseTag(
			(bitwiseVersion >> 2) & 0b11,
		),
		prereleaseVersion: bitwiseVersion & 0b11,
	};
};
