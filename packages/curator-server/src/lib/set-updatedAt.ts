const setUpdatedAt = (prop: PropertyKey) => {
	prop ?? new Date().toISOString();
};
