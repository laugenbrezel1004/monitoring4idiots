import { github } from '$lib/server/oauth';
import { generateState } from 'arctic';
import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const state = generateState();
	const url = github.createAuthorizationURL(state, ['user:email']);

	event.cookies.set('github_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return redirect(302, url.toString());
};
