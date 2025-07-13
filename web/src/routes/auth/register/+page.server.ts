import {superValidate} from 'sveltekit-superforms';
import {zod} from 'sveltekit-superforms/adapters';
import {error, fail} from '@sveltejs/kit';
import {Prisma, type User} from '@prisma/client';
import {createUserByProvider, getUserByProvider} from '$lib/server/data/user';
import {hashPassword} from '$lib/utils/password';
import {redirect, setFlash} from 'sveltekit-flash-message/server';
import {registerSchema} from '$lib/schemas/register';
import {m as messages} from '$lib/i18n/messages';
import {prisma} from "$lib/server/prisma";

export const load = async () => {
    return {
        form: await superValidate(zod(registerSchema))
    };
};

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(registerSchema));
        if (!form.valid) return fail(400, {form});

        const {email, password, firstName, lastName} = form.data;
        if (!email || !password) return fail(400, {form});

        let user: User | null;
        try {
            user = await getUserByProvider('credentials', String(email));
            if (user) {
                setFlash({type: 'error', message: messages['auth.error.account-exists']()}, event);
                return fail(400, {form});
            }
        } catch (err) {
            console.error(err);
            return error(500, {message: messages['auth.error.unexpected']()});
        }

        try {
            const hash: string = await hashPassword(String(password));
            user = await createUserByProvider(String(email), false, `${firstName} ${lastName}`,'credentials', String(email), hash);
            if (!user) return error(400, {message: messages['auth.error.unexpected']()});
        } catch (err: unknown) {
            // @ts-expect-error message may be undefined
            if (err?.message === 'ALREADY_OAUTH') {
                setFlash({type: 'error', message: messages['auth.error.account-is-oauth']()}, event);
                return fail(400, {form});
            }
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                setFlash({type: 'error', message: messages['auth.error.account-exists']()}, event);
                return fail(400, {form});
            }
            console.error(err);
            return error(500, {message: messages['auth.error.unexpected']()});
        }

        redirect(
            302,
            '/auth/login',
            {type: 'success', message: messages['auth.success.account-created']()},
            event
        );
    }
};
