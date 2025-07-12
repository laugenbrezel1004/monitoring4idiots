<script lang="ts">
	import { m as messages } from '$lib/i18n/messages';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ThemeSwitcher } from '$lib/components/theme';
	import { LocaleSwitcher } from '$lib/components/i18n';
	import { Clapperboard } from '@lucide/svelte';

	let { children } = $props();
</script>

<div class="flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10 gap-8">
	<a href="/" class="flex items-center gap-2 self-center font-medium">
		<div
			class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-sm"
		>
			<Clapperboard class="p-1" />
		</div>
		Monitoring
	</a>
	<div class="w-full max-w-sm md:max-w-md">
		<div class="flex flex-col gap-6">
			<Card class="overflow-hidden">
				<CardContent class="flex flex-col p-0">
					{@render children()}
				</CardContent>
			</Card>
			<div
				class="text-balance text-center text-xs text-muted-foreground"
			>
				<!-- eslint-disable svelte/no-at-html-tags -->
				{@html messages['auth.legal']({
					tos: `<a href="/legal/terms-of-service" class="hover:text-primary hover:underline underline-offset-4">${messages['common.tos']()}</a>`,
					privacy: `<a href="/legal/privacy-policy" class="hover:text-primary hover:underline underline-offset-4">${messages['common.privacy']()}</a>`
				})}
			</div>
		</div>
	</div>
	<div>
		<div class="flex flex-row gap-4">
			<ThemeSwitcher />
			<LocaleSwitcher />
		</div>
	</div>
</div>
