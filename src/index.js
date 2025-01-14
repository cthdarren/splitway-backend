const express = require("express");

const app = express();

const cors = require("cors");
let corsOptions = {
    origin: ["http://localhost:8081"]
};
app.use(cors(corsOptions));

app.get("/groups/:id", (req, res) => {
        const id = req.params.id
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
        })
    console.log("HIT!");
});

app.get("/expenses/:id", (req, res) => {
    const id = req.params.id
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
