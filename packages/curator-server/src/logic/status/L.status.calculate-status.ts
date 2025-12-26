import { db } from "@/lib/db";
import type { z } from "zod";
import type { VStatusUnauthenticated } from "@/schemas/validator-schema/v-status";
import pkgdotjson from "@/../package.json";
import {
	convert_SemverToSplitSemver,
	convert_SplitSemverToBitwiseVersion,
} from "@/lib/version";

const calculateBitwiseServiceStatus = (): number => {
	return 0; // TODO: add real logic here eventually
};

export const LCalculateUnauthenticatedStatus = async (): Promise<
	z.infer<typeof VStatusUnauthenticated>
> => {
	return {
		product: "com.bellbellbell.curator-server",
		version: pkgdotjson.version,
		versionBw: convert_SplitSemverToBitwiseVersion(
			convert_SemverToSplitSemver(pkgdotjson.version),
		),
		serviceStatus: calculateBitwiseServiceStatus(),
		timestamp: new Date().toISOString(),
	};
};
