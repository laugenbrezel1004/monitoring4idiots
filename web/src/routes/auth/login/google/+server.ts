import { google } from '$lib/server/oauth';
import { generateCodeVerifier, generateState } from 'arctic';
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = google.createAuthorizationURL(state, codeVerifier, ['openid', 'email', 'profile']);

	event.cookies.set('google_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});
	event.cookies.set('google_code_verifier', codeVerifier, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return redirect(302, url.toString());
};
