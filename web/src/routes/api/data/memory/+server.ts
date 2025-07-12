import {json} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const POST = async ({request}) => {
    const {id, totalMemory, usedMemory, totalSwap, usedSwap} = await request.json();

    try {
        const memoryInfo = await prisma.memoryInfo.create({
            data: {
                hostId: id,
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
        return json({type: 'error', message: `Couldn't save data!`}, {status: 500});
    }
}