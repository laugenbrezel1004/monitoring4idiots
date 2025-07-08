<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import NavUser from "./nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import {Boxes, Cpu, LayoutDashboard, Users} from '@lucide/svelte';
	import type {ComponentProps} from "svelte";

	const data = {
		user: {
			name: "Philip Krauß",
			email: "kontakt@philipkrauss.it",
			avatar: "/avatars/asd.jpg",
		},
		navMain: [
			{
				title: "Dashboard",
				url: "#",
				icon: LayoutDashboard,
			},
			{
				title: "Hosts",
				url: "#",
				icon: Boxes,
			},
			{
				title: "Users",
				url: "#",
				icon: Users,
			},
		],
	};

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="/app" {...props}>
							<Cpu class="!size-5 text-primary" />
							<span class="text-base font-semibold">Monitoring</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
</Sidebar.Root>
