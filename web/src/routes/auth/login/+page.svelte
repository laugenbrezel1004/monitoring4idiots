<script lang="ts">
	import { m as messages } from '$lib/i18n/messages';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Github, LogIn } from '@lucide/svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '$lib/schemas/login';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(loginSchema),
		validationMethod: 'oninput'
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" class="p-6 md:p-8" use:enhance>
	<div class="flex flex-col gap-4">
		<div class="flex flex-row justify-center items-center gap-2 text-center">
			<LogIn class="size-6 stroke-primary" />
			<h1 class="text-2xl font-bold">
				{messages['auth.login']()}
			</h1>
		</div>
		<div class="grid gap-2 pt-4">
			<FormField {form} name="email">
				<FormControl>
					{#snippet children({ props })}
						<Label>{messages['common.email']()}</Label>
						<Input
							{...props}
							bind:value={$formData.email}
							placeholder="email@example.com"
							autocomplete="email"
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors />
			</FormField>
			<FormField {form} name="password">
				<FormControl>
					{#snippet children({ props })}
						<Label>{messages['common.password']()}</Label>
						<Input
								{...props}
								bind:value={$formData.password}
								placeholder="********"
								autocomplete="current-password"
								type="password"
						/>
					{/snippet}
				</FormControl>
				<FormFieldErrors />
			</FormField>
		</div>
		<Button type="submit" class="w-full">
			{messages['auth.login']()}
		</Button>
		<div
			class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
			<span class="bg-card text-muted-foreground uppercase text-xs relative z-10 px-2">
				{messages['auth.separator']()}
			</span>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<Button href="/auth/login/github" variant="outline" class="w-full">
				<Github class="text-foreground" />
				<span class="sr-only">Login with GitHub</span>
			</Button>
			<Button href="/auth/login/google" variant="outline" class="w-full">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
						fill="currentColor"
					/>
				</svg>
				<span class="sr-only">Login with Google</span>
			</Button>
		</div>
		<div class="text-center text-sm">
			{messages['auth.no-account']()}
			<a href="/auth/register" class="text-primary hover:underline underline-offset-4">
				{messages['auth.register']()}
			</a>
		</div>
	</div>
</form>
