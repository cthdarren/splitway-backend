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

router.post("/create", async (req: Request, res: Response) => {
    const nameFieldEmpty: boolean = req.body.name === undefined;
    const categoryFieldEmpty: boolean = req.body.category === undefined;
    const currencyFieldEmpty: boolean = req.body.currency === undefined;
    const userIdFieldEmpty: boolean = req.body.userId === undefined;

    if (
        nameFieldEmpty ||
        categoryFieldEmpty ||
        currencyFieldEmpty ||
        userIdFieldEmpty
    ) {
        res.send("Please fill in all required fields");
        return;
    }

    let newGroupId: UUID = randomUUID();
    while (
        (await prisma.group.findUnique({ where: { id: newGroupId } })) !== null
    ) {
        newGroupId = randomUUID();
    }

    const transactions = [
        prisma.group.create({
            data: {
                id: newGroupId,
                name: req.body.name,
                category: req.body.category,
                currency: req.body.currency,
                sharelink: generateShareLink(),
                userId: req.body.userId
            }
        }),
        prisma.groupMember.create({
            data: {
                userId: req.body.userId,
                groupId: newGroupId
            }
        })
    ];

    if (req.body.participants !== undefined) {
        req.body.participants.map((participantId: string) => {
            transactions.push(
                prisma.groupMember.create({
                    data: {
                        userId: participantId,
                        groupId: newGroupId
                    }
                })
            );
        });
    }
    await prisma.$transaction(transactions);
});

export default router;
