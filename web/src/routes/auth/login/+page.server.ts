import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas/login';
import { error, fail } from '@sveltejs/kit';
import type { User } from '@prisma/client';
import { getUserByProvider } from '$lib/server/data/user';
import { verifyPassword } from '$lib/utils/password';
import { createSession, generateSessionToken, setSessionTokenCookie } from '$lib/server/session';
import { redirect, setFlash } from 'sveltekit-flash-message/server';
import { m as messages } from '$lib/i18n/messages';

export const load = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));
		if (!form.valid) return fail(400, { form });

		const { email, password } = form.data;
		if (!email || !password) return fail(400, { form });

		let user: User | null;
		try {
			user = await getUserByProvider('credentials', String(email));
		} catch (err) {
			console.error(err);
			return error(400, { message: messages['auth.error.invalid-credentials']() });
		}

		if (!user || !user.password) {
			console.log('User or Password is null!')
			setFlash({ type: 'error', message: messages['auth.error.invalid-credentials']() }, event);
			return fail(400, { form });
		}

		try {
			const isSuccess = await verifyPassword(user.password, String(password));
			console.log(isSuccess);
			if (!isSuccess) {
				setFlash({ type: 'error', message: messages['auth.error.invalid-credentials']() }, event);
				return fail(400, { form });
			}
		} catch (err) {
			console.error(err);
			return error(500, { message: messages['auth.error.unexpected']() });
		}

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user.id);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(
			302,
			'/app',
			{ type: 'success', message: messages['auth.success.login']() },
			event
		);
	}
};
