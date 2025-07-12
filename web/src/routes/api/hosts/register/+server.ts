import {json} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const POST = async ({request}) => {
    const {name} = await request.json();

    try {
        const host = await prisma.host.create({
            data: {
                name,
            }
        });

        return json({type: 'success', id: host.id}, {status: 200});
    } catch (err) {
        return json({type: 'error', message: `Host '${name}' already exists!`}, {status: 400});
    }
}