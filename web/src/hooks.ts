import { deLocalizeUrl } from '$lib/i18n/runtime';

export const reroute = (request) => deLocalizeUrl(request.url).pathname;
