export const load = async (event) => {
	const sidebarState = (event.cookies.get('sidebar:state') as unknown as boolean) ?? true;

	return {
		sidebarState
	};
};
