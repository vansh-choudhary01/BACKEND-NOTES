const express = require("express");
const app = express();
const port = 8080;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/register", (req, res) => {
    let {user, password} = req.query;
    res.send(`recived GET request. Welcome ${user}`);
    // res.send(req.query);
})

app.post("/register", (req, res) => {
    let {user, password} = req.body;
    res.send(`recived POST request. Welcome ${user}`);
    // res.send(req.body);
})

app.listen(port, () => {
    console.log("Request listening");
})