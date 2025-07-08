<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import De from 'svelte-flag-icons/De.svelte';
	import Us from 'svelte-flag-icons/Us.svelte';
	import { getLocale, setLocale } from '$lib/i18n/runtime';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';
	import type { Component } from 'svelte';

	type Locale = {
		value: 'de' | 'en';
		label: string;
		icon: Component;
	};

	const locales: Locale[] = [
		{ value: 'en', label: 'English', icon: Us },
		{ value: 'de', label: 'Deutsch', icon: De }
	];

	let selectedLocale = $state(locales.find((lang) => lang.value === getLocale()) || locales[0]);

	function changeLocale(locale: Locale) {
		selectedLocale = locale;
		setLocale(locale.value, {
			reload: true
		});
	}
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		<selectedLocale.icon />
		<span class="sr-only">Change locale</span>
	</DropdownMenuTrigger>
	<DropdownMenuContent>
		{#each locales as locale (locale.value)}
			<DropdownMenuItem onclick={() => changeLocale(locale)}>
				<div class="flex flex-row justify-between gap-3 items-center">
					<locale.icon class="w-4" />
					<span>{locale.label}</span>
				</div>
			</DropdownMenuItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenu>
