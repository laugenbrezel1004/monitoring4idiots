import {json} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const POST = async ({request}) => {
    const {id, kernelVersion, osVersion} = await request.json();

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

        const systemInfo = await prisma.systemInfo.create({
            data: {
                hostId: host.id,
                kernelVersion,
                osVersion,
            }
        });

        return json({type: 'success', data: systemInfo}, {status: 200});
    } catch (err) {
        console.error(err);
        return json({type: 'error', message: `Couldn't save data!`}, {status: 500});
    }
}