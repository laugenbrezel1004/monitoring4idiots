import {prisma} from "$lib/server/prisma";
import {redirect} from "sveltekit-flash-message/server";
import {error} from "@sveltejs/kit";
import type {MemoryInfo} from "@prisma/client";

export const load = async (event) => {
    const hostId = event.params.hostId;

    let host;
    try {
        host = await prisma.host.findUnique({
            where: {
                id: hostId,
            },
            include: {
                systemInfo: true,
                memoryInfo: true,
                diskInfo: true,
                interfaceInfo: true,
            }
        });
        if(!host) return redirect(302, '/app/hosts', { type: 'error', message: 'This Host couldn\'t be found!' }, event);
    } catch (err) {
        return error(500, 'An unknown error occurred while finding host');
    }

    const memoryData = host.memoryInfo.map((info: MemoryInfo) => {
        return {
            totalMemory: info.totalMemory,
            availableMemory: info.availableMemory,
            usedMemory: info.usedMemory,
            date: info.timestamp,
        }
    });

    const swapData = host.memoryInfo.map((info: MemoryInfo) => {
        return {
            totalSwap: info.totalSwap,
            availableSwap: info.availableSwap,
            usedSwap: info.usedSwap,
            date: info.timestamp,
        }
    });

    return {
        host,
        memoryData,
        processorData: memoryData,
        swapData,
    }
}