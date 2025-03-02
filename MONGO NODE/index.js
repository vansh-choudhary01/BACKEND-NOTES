const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const path = require("path");
const methodOverride = require("method-override");
// const del = require("./public/app.js");
const ExpressError = require("./ExpressError.js");

app.set("ejs", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride("_method"));


main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
}

//new show route
app.get("/chats", asyncWrap(async (req, res) => {
    let chats = await Chat.find();
    res.render("chat", {chats});
}))

app.get("/chats/new", (req, res) => {
    // throw new ExpressError(404, "Page not found");
    res.render("new");
})

app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat) {
        next(new ExpressError(404,"Chat not found"));
    }
    res.render("edit", {data : chat});
}));

app.post("/chats", async (req, res, next) => {
    try {
        req.body.created_at = new Date();
        const user = new Chat(req.body);
        await user.save()
            // .then(res => console.log(res))
            // .catch(e => console.log(e));
        res.redirect("chats");
    } catch(e) {
        // next(new ExpressError(402, e.message));
        next(e);
    }
})

app.get("/chats/:id/edit", asyncWrap(async (req, res) => {
    let {id} = req.params;
    let data = await Chat.findById({_id : id});
    res.render("edit", {data});
}))

app.put("/chats/:id",asyncWrap( async (req, res) => {
    let {id} = req.params;
    let {msg} = req.body;
    let data = await Chat.findByIdAndUpdate({_id : id}, {msg, created_at : new Date()}, {runValidaters : true, new : true});
    console.log(data);

    res.redirect("/chats");
}))

app.delete("/chats/:id", asyncWrap(async (req, res) => {
    let {id} = req.params;
    await Chat.deleteOne({_id : id});
    res.redirect("/chats");
}))

app.get("/", (req, res) => {
    res.send("request working");
})

const handleValidationError = (err) => {
    console.log("this was a validation error plese follow rules");
    console.log(err);
    return err;
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if(err.name == "ValidationError") {
        err = handleValidationError(err);
    }
    next(err);
})

app.use((err, req, res, next) => {
    let {status=500, message="some error occoured"} = err;
    res.status(status).send(message);
})

app.listen(8080);   