export const updateModifiedDateBody = <T extends object>(body: T) => {
	return { ...body, modifiedAt: new Date().toISOString() };
};
