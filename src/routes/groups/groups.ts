import { Group, PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

const router = Router();

// TODO: Remove this and figure out how to import the same prismaclient for the whole app in other areas
const prisma = new PrismaClient()

// GET groups that the user is currently in
router.get('/groups', async (req: Request, res: Response) => {
    const groupData :Group[] = []
    const groups = await prisma.groupMember.findMany({select: {group: true}, where: {userId: req.body.userId}})
    groups.map(group => {
        groupData.push(group.group)
    })
    res.send({success: true, data: groupData})
});

export default router;
