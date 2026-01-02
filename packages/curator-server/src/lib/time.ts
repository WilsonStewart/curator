const now_UnixEpochNanoseconds = (): bigint => {
	return BigInt(Date.now()) * 1_000_000n;
};
