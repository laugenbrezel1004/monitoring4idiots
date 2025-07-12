export const load = async (event) => {
	const { user } = event.locals;

	const sidebarState = (event.cookies.get('sidebar:state') as unknown as boolean) ?? true;

	return {
		user,
		sidebarState
	};
};
