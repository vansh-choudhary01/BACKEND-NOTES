const express = require("express");
const path = require("path");

const app = express();

const port = 8080;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.set("views", path.join(__dirname, "/views"));

app.listen(port, () => {
    console.log(`listning on port : ${port}`);
})

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/roledice", (req, res) => {
    let diceValue = Math.floor(Math.random() * 6 + 1);
    // res.render("roledice", {num : diceValue});
    // res.render("roledice", {diceValue : diceValue});
    res.render("roledice", {diceValue});
})

app.get("/ig/:username", (req, res) => {
    let {username} = req.params;
    const instaData = require("./data.json");
    let data = instaData[username];
    if(data) {
        res.render("instagram", {data});
    } else {
        res.render("error");
    }
})