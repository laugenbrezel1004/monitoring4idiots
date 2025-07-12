import {json} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const GET = async ({request}) => {

    try {
        const hosts = await prisma.host.findMany({
            include: {
                systemInfo: true,
                memoryInfo: true,
                diskInfo: true,
                interfaceInfo: true
            }
        });

        return json({type: 'success', data: hosts}, {status: 200});
    } catch (err) {
        return json({type: 'error', message: `Host '${name}' already exists!`}, {status: 400});
    }
}