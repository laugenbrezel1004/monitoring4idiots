import {prisma} from "$lib/server/prisma";

export const load = async (event) => {
    return {
        hostsCount: await prisma.host.count() ?? 0,
        usersCount: await prisma.user.count() ?? 0,
    }
}