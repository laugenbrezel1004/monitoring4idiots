import {json} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const POST = async ({request}) => {
    const {id, cores, usage} = await request.json();

    try {
        const host = await prisma.host.upsert({
            where: {
                name: id,
            },
            create: {
                name: id,
            },
            update: {}
        });

        if(!host) return json({type: 'error', message: `Couldn't upsert host!`}, {status: 500});

        const processorInfo = await prisma.processorInfo.create({
            data: {
                hostId: host.id,
                cores,
                usage,
            }
        });

        return json({type: 'success', data: processorInfo}, {status: 200});
    } catch (err) {
        return json({type: 'error', message: `Couldn't save data!`}, {status: 500});
    }
}