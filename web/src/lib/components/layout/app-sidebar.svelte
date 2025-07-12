<script lang="ts">
	import {NavMain, NavUser} from "$lib/components/navigation";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import {Boxes, Cpu, LayoutDashboard, Users} from '@lucide/svelte';
	import type {ComponentProps} from "svelte";
	import type {User} from "@prisma/client";

	let { user, ...restProps }: { user: User } & ComponentProps<typeof Sidebar.Root> = $props();
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
		<NavMain />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={user} />
	</Sidebar.Footer>
</Sidebar.Root>
