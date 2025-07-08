import { GitHub, Google } from 'arctic';
import {
	AUTH_GITHUB_ID,
	AUTH_GITHUB_SECRET,
	AUTH_GOOGLE_ID,
	AUTH_GOOGLE_SECRET
} from '$env/static/private';

const BASE_URL = 'http://localhost:5173';

export const github = new GitHub(
	AUTH_GITHUB_ID,
	AUTH_GITHUB_SECRET,
	`${BASE_URL}/auth/login/github/callback`
);
export const google = new Google(
	AUTH_GOOGLE_ID,
	AUTH_GOOGLE_SECRET,
	`${BASE_URL}/auth/login/google/callback`
);
