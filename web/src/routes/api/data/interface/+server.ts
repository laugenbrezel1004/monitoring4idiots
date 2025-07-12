import {json} from "@sveltejs/kit";
import {prisma} from "$lib/server/prisma";

export const POST = async ({request}) => {
    const {id, name, dataReceived, dataTransmitted} = await request.json();

    try {
        const interfaceInfo = await prisma.interfaceInfo.create({
            data: {
                hostId: id,
                name,
                dataReceived,
                dataTransmitted,
            }
        });

        return json({type: 'success', data: interfaceInfo}, {status: 200});
    } catch (err) {
        return json({type: 'error', message: `Couldn't save data!`}, {status: 500});
    }
}