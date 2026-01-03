import { db } from "../../lib/db";
import type { z } from "zod";
import {
	convert_SemverToSplitSemver,
	convert_SplitSemverToBitwiseVersion,
} from "../../lib/version";
import { VStatusUnauthenticated } from "../../schemas/validator/v-status";
import { rootPkgDotJson } from "../../lib/pkg-dot-json";

const calculateBitwiseServiceStatus = (): number => {
	return 0; // TODO: add real logic here eventually
};

export const LCalculateUnauthenticatedStatus = async (): Promise<
	z.infer<typeof VStatusUnauthenticated>
> => {
	return {
		product: "com.bellbellbell.curator-server",
		version: rootPkgDotJson.version,
		// Disabled until I re-work the bw version number, or retire it -ws 1/2/26
		// versionBw: convert_SplitSemverToBitwiseVersion(
		// 	convert_SemverToSplitSemver(rootPkgDotJson.version),
		// ),
		serviceStatus: calculateBitwiseServiceStatus(),
		timestamp: new Date().toISOString(),
	};
};
