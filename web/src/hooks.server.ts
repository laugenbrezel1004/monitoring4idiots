import { type Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/i18n/server';
import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/session';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect } from 'sveltekit-flash-message/server';

const AUTH_ROUTES = [
	'/auth/login',
	'/auth/register'
];

const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});

const authHandle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;

		if (event.url.pathname.startsWith('/app'))
			return redirect(
				302,
				'/auth/login',
				{ type: 'error', message: 'Please log in first!' },
				event
			);

		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);
	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	if ((!event.locals.session || !event.locals.user) && !AUTH_ROUTES.includes(event.url.pathname)) {
		return redirect(302, '/auth/login', { type: 'error', message: 'Please log in first!' }, event);
	}

	if (event.locals.session && event.url.pathname === '/auth/login') {
		return redirect(302, '/app');
	}

	return resolve(event);
};

export const handle: Handle = sequence(authHandle, paraglideHandle);
