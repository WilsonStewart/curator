const now_UnixEpochNanoseconds = (): BigInt => {
	return BigInt(Date.now()) * 1_000_000n;
};
