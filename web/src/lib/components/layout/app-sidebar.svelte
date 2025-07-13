<script lang="ts">
	import {NavMain, NavUser} from "$lib/components/navigation";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import {Activity} from '@lucide/svelte';
	import type {ComponentProps} from "svelte";
	import type {User} from "@prisma/client";

	let {
		user,
		ref = $bindable(null),
		collapsible = "icon",
		...restProps
	}: { user: User | null } & ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					{#snippet child({ props })}
						<a href="/app" {...props}>
							<Activity class="!size-5 text-primary" />
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
		{#if user}
			<NavUser user={user} />
		{/if}
	</Sidebar.Footer>
</Sidebar.Root>
