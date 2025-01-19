import { Group, PrismaClient } from "@prisma/client";
import { randomUUID, UUID } from "crypto";
import { Router, Request, Response } from "express";
import prisma from "../prismaclient";

const router = Router();

const generateShareLink = () => {
    return "INSERTLINKHERE";
};
// GET groups that the user is currently in
router.get("/", async (req: Request, res: Response) => {
    const groupData: Group[] = [];
    const groups = await prisma.groupMember.findMany({
        select: { group: true },
        where: { userId: req.body.userId }
    });
    groups.map((group) => {
        groupData.push(group.group);
    });

    res.send({ success: true, data: groupData });
});

router.get("/create", async (req: Request, res: Response) => {
    const nameFieldEmpty: boolean = req.body.name === undefined;
    const categoryFieldEmpty: boolean = req.body.name === undefined;
    const currencyFieldEmpty: boolean = req.body.name === undefined;
    const userIdFieldEmpty: boolean = req.body.name === undefined;

    let newGroupId: UUID = randomUUID();
    while (prisma.group.findUnique({ where: { id: newGroupId } }) !== undefined)
        newGroupId = randomUUID();

    await prisma.$transaction([
        prisma.group.create({
            data: {
                id: newGroupId,
                name: req.body.name,
                category: req.body.category,
                currency: req.body.currency,
                sharelink: generateShareLink(),
                createdBy: req.body.createdBy
            }
        }),
        prisma.groupMember.create({
            data: {
                userId: req.body.createdBy,
                groupId: newGroupId
            }
        }),
        req.body.participants.map((participantId: string) => {
            prisma.groupMember.create({
                data: {
                    userId: participantId,
                    groupId: newGroupId
                }
            });
        })
    ]);
});

export default router;
