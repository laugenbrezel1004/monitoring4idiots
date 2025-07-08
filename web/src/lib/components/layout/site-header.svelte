<script lang="ts">
	import { Separator } from "$lib/components/ui/separator";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import { page } from '$app/state';
	import { ThemeSwitcher } from '$lib/components/theme';
</script>

<header
	class="h-(--header-height) group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear"
>
	<div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
		<Sidebar.Trigger class="-ml-1" />
		<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
		<div class="ml-auto flex items-center gap-2">
			<ThemeSwitcher />
		</div>
	</div>
</header>
