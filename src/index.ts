import { Group, PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import "dotenv/config";
import { randomBytes, randomUUID } from "crypto";

const prisma = new PrismaClient();
const express = require("express");

const app = express();

// this enables the application to read JSON data
// wasted so much time trying to figure out why
// it kept returning undefined bruh
app.use(express.json())

const cors = require("cors");
let corsOptions = {
    origin: ["http://localhost:8081"]
};
app.use(cors(corsOptions));

// TODO work with passportjs to introduce authentication
//
// app.post("/register", async (req: Request, res: Response) => {
//     const missingFields :string[] = []
//     if (req.body.username === undefined){
//         missingFields.push("username")
//     }
//
//     if (req.body.email === undefined){
//         missingFields.push("email")
//     }
//
//     if (req.body.password === undefined){
//         missingFields.push("password")
//     }
//
//     if (req.body.verifypassword === undefined){
//         missingFields.push("verify password")
//     }
//
//     if (missingFields.length > 0){
//         res.send(missingFields.join(",") + " fields cannot be empty")
//     }
//     
//     try {
//         const usernameCheck = await prisma.user.findUnique({
//             where: { username: req.body.username }
//         });
//
//         const emailCheck = await prisma.user.findUnique({
//             where: { email: req.body.email}
//         });
//         if (usernameCheck === null) {
//             const user: User = await prisma.user.create({
//                 data: {
//                     id: randomUUID(),
//                     username: req.body.username,
//                     pwhash: ,
//                     salt: randomBytes(8),
//                     email: req.body.email,
//                     locale: "en_us",
//                     status: "ACTIVE",
//                     pictureurl: "http://lmao.com"
//                 }
//             });
//             res.send(user);
//         }
//         res.send("Username already exists!");
//     } catch (err){
//         console.error(err)
//         res.send("Invalid username");
//     }
// });

app.get("/groups/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    res.send({
        id: id,
        name: "Japan Trip" + id,
        currency: "JPY",
        expenditure: 500,
        members: [
            {
                id: 1,
                name: "Darren"
            },
            {
                id: 2,
                name: "Jason"
            },
            { id: 3, name: "Pin Kang" }
        ]
    });
    console.log("HIT!");
});

app.get("/expenses/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    res.send([
        {
            id: 1,
            expenseAmount: 500,
            expenseName: "7-11 Ramen" + id,
            groupId: id,
            category: "Food",
            paidBy: "Darren",
            splitType: false,
            dateCreated: new Date("2024-12-23").toDateString(),
            participants: [
                { userId: 2, splitAmount: null },
                { userId: 1, splitAmount: null }
            ]
        },
        {
            id: 1,
            expenseAmount: 500,
            expenseName:
                "Very very very very long expense nameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            groupId: id,
            category: "Food",
            paidBy: "Darren",
            splitType: false,
            dateCreated: new Date("2024-11-24").toDateString(),
            participants: [
                { userId: 2, splitAmount: null },
                { userId: 1, splitAmount: null }
            ]
        },
        {
            id: 1,
            expenseAmount: 500,
            expenseName: "7-11 Ramen",
            groupId: id,
            category: "Food",
            paidBy: "Darren",
            splitType: false,
            dateCreated: new Date("2024-10-24").toDateString(),
            participants: [
                { userId: 2, splitAmount: null },
                { userId: 1, splitAmount: null }
            ]
        }
    ]);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
