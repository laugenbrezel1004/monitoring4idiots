import {prisma} from "$lib/server/prisma";
import {z} from 'zod';
import {createWorkspaceSchema, type CreateWorkspaceSchema} from "$lib/schemas/workspace";
import type {Workspace} from "@prisma/client";

export async function createWorkspace(data: z.infer<CreateWorkspaceSchema>): Promise<Workspace> {
    const validatedData = createWorkspaceSchema.parse(data);
    return prisma.workspace.create({
        data: {
            name: validatedData.name,
            creatorId: data.userId,
            members: {
                create: {
                    userId: data.userId,
                    role: "ADMIN"
                }
            }
        },
        include: {
            creator: true,
            members: true
        }
    });
}