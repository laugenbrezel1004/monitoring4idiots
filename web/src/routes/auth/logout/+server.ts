import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/session';
import { redirect } from 'sveltekit-flash-message/server';
import { m as messages } from '$lib/i18n/messages';

export const GET = async (event) => {
	if (!event.locals.session || !event.locals.session.id)
		throw redirect(
			302,
			'/auth/login',
			{ type: 'error', message: messages['auth.error.already-logged-out']() },
			event
		);

	await invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);

	return redirect(
		302,
		'/auth/login',
		{ type: 'success', message: messages['auth.success.logged-out']() },
		event
	);
};
