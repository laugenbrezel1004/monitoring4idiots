import {json} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const POST = async ({request}) => {
    const {id, totalMemory, usedMemory, totalSwap, usedSwap} = await request.json();

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

        const memoryInfo = await prisma.memoryInfo.create({
            data: {
                hostId: host.id,
                totalMemory,
                usedMemory,
                availableMemory: parseFloat(totalMemory ?? 0) - parseFloat(usedMemory ?? 0),
                totalSwap,
                usedSwap,
                availableSwap: parseFloat(totalSwap ?? 0) - parseFloat(usedSwap ?? 0),
            }
        });

        return json({type: 'success', data: memoryInfo}, {status: 200});
    } catch (err) {
        console.error(err);
        return json({type: 'error', message: `Couldn't save data!`}, {status: 500});
    }
}