import {json} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const POST = async ({request}) => {
    const {id, kernelVersion, osVersion} = await request.json();

    try {
        const systemInfo = await prisma.systemInfo.create({
            data: {
                hostId: id,
                kernelVersion,
                osVersion,
            }
        });

        return json({type: 'success', data: systemInfo}, {status: 200});
    } catch (err) {
        return json({type: 'error', message: `Couldn't save data!`}, {status: 500});
    }
}