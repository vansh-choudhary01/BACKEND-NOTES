const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// logger - ex: morgen
app.use("/random", (req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
})

const checkToken = (req, res, next) => {
    let {token} = req.query;
    if(token === "giveaccess") {
        next();
    }
    throw new ExpressError(401, "Access Denied");
}
app.get("/api", checkToken,(req, res, next) => {
    // res.status(500).send("data");
    res.send("data");
})

app.get("/", (req, res) => {
    res.send("this is root");
}) 

app.get("/random", (req, res) => {
    res.send("this is random root");
})

app.get("/err", (req, res, next) => {
    abc = abc
})

app.get("/admin", (req, res) => {
    throw new ExpressError(403, "Permission Denied");
})

app.use((err, req, res, next) => {
    console.log("------------ERROR---------------");
    // next(err);
    let {status=500, message="some error occoured"} = err;
    res.status(status).send(message);
})

app.use((req, res) => {
    res.status(404).send("path not found");
})

app.listen(8080);