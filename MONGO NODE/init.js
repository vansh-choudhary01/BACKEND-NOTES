const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

let allChats = [
    {
        from: "Anita",
        to: "Amit",
        msg: "Call me.",
        created_at: new Date("2024-08-17T12:01:07.803812")
    },
    {
        from: "Vansh",
        to: "Rahul",
        msg: "Call me.",
        created_at: new Date("2024-08-02T12:01:07.803841")
    },
    {
        from: "Riya",
        to: "Priya",
        msg: "Good morning!",
        created_at: new Date("2024-08-12T12:01:07.803852")
    },
    {
        from: "Rahul",
        to: "Neha",
        msg: "Good morning!",
        created_at: new Date("2024-07-28T12:01:07.803857")
    },
    {
        from: "Karan",
        to: "Priya",
        msg: "Take care!",
        created_at: new Date("2024-08-08T12:01:07.803861")
    },
    {
        from: "Neha",
        to: "Anita",
        msg: "How are you?",
        created_at: new Date("2024-07-30T12:01:07.803866")
    },
    {
        from: "Amit",
        to: "Anita",
        msg: "Hi!",
        created_at: new Date("2024-07-31T12:01:07.803870")
    },
    {
        from: "Priya",
        to: "Rahul",
        msg: "How are you?",
        created_at: new Date("2024-08-04T12:01:07.803877")
    },
    {
        from: "Priya",
        to: "Vansh",
        msg: "Good morning!",
        created_at: new Date("2024-07-28T12:01:07.803886")
    },
    {
        from: "Riya",
        to: "Anita",
        msg: "Good morning!",
        created_at: new Date("2024-08-01T12:01:07.803892")
    }
];

Chat.insertMany(allChats)
    .then(res => console.log(res))
    .catch(e => console.log(e));