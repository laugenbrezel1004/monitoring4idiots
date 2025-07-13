import {prisma} from "$lib/server/prisma";

export const load = async (event) => {

    const onlineHostsCount = await prisma.host.count({
        where: {
            OR: [
                {
                    systemInfo: {
                        some: {
                            timestamp: {
                                gte: new Date(new Date().getTime() - 60 * 1000)
                            }
                        }
                    }
                },
                {
                    memoryInfo: {
                        some: {
                            timestamp: {
                                gte: new Date(new Date().getTime() - 60 * 1000)
                            }
                        }
                    }
                },
                {
                    interfaceInfo: {
                        some: {
                            timestamp: {
                                gte: new Date(new Date().getTime() - 60 * 1000)
                            }
                        }
                    }
                },
                {
                    diskInfo: {
                        some: {
                            timestamp: {
                                gte: new Date(new Date().getTime() - 60 * 1000)
                            }
                        }
                    }
                },
            ]
        }
    })

    return {
        hostsCount: await prisma.host.count() ?? 0,
        onlineHostsCount,
        usersCount: await prisma.user.count() ?? 0,
    }
}