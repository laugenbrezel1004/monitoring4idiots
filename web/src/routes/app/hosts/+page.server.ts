import {prisma} from "$lib/server/prisma";

export const load = async (event) => {
    return {
        hosts: await prisma.host.findMany(),
    }
}