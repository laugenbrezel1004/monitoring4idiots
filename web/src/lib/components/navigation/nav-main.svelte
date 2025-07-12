<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import type { Icon } from "@tabler/icons-svelte";
	import {mainNavItems} from "$lib/components/navigation/index";
	import {Box} from "@lucide/svelte";
</script>

<Sidebar.Group>
	<Sidebar.GroupContent class="flex flex-col gap-2">
		<Sidebar.Menu>
			{#each mainNavItems as item (item.href)}
				{@const Icon = item.icon ?? Box}
				<Sidebar.MenuItem>
					<a href={`/app/${item.href}`} class="flex flex-row">
						<Sidebar.MenuButton tooltipContent={item.title}>
							<Icon />
							{item.title}
						</Sidebar.MenuButton>
					</a>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
