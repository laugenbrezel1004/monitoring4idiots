<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import {Box, EllipsisVertical, LogOut} from "@lucide/svelte";
	import {userNavItems} from "$lib/components/navigation/index";
	import type {User} from "@prisma/client";

	type NavUserProps = {
		user: User;
	}

	let { user }: NavUserProps = $props();

	const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={user.avatarUrl} alt={user.name} />
							<Avatar.Fallback class="rounded-lg">{user.name.split(" ").map((p) => p[0]).toString().replace(',', '')}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{user.name}</span>
							<span class="text-muted-foreground truncate text-xs">
								{user.email}
							</span>
						</div>
						<EllipsisVertical class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={user.avatarUrl} alt={user.name} />
							<Avatar.Fallback class="rounded-lg">{user.name.split(" ").map((p) => p[0]).toString().replace(',', '')}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{user.name}</span>
							<span class="text-muted-foreground truncate text-xs">
								{user.email}
							</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					{#each userNavItems as item (item.href)}
						{@const Icon = item.icon ?? Box}
						<a href={`/app/${item.href}`}>
							<DropdownMenu.Item>
								<Icon />
								{item.title}
							</DropdownMenu.Item>
						</a>
					{/each}
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<a href="/auth/logout">
					<DropdownMenu.Item>
						<LogOut />
						Log out
					</DropdownMenu.Item>
				</a>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
