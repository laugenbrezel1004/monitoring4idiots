<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/layout/app-sidebar.svelte';
	import SiteHeader from '$lib/components/layout/site-header.svelte';
	import { SIDEBAR_COOKIE_MAX_AGE, SIDEBAR_COOKIE_NAME } from '$lib/components/ui/sidebar/constants';

	let { children, data } = $props();

	let state = $state(data.sidebarState ?? true);
	$effect(() => {
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${state}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	});
</script>

<Sidebar.Provider
	bind:open={state}
	onOpenChange={(e) => {
		state = e;
	}}
	class="transition-none duration-0"
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar user={data.user} variant="inset" />
	<Sidebar.Inset>
		<SiteHeader />
		<div class="flex flex-1 flex-col">
			<div class="@container/main flex flex-1 flex-col gap-2">
				<div class="flex flex-col gap-4 p-4">
					{@render children()}
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>