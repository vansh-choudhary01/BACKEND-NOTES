const express = require("express");

// console.log(express());
const app = express();
const port = 8080;

app.listen(port, () => {
    console.log(`app is listning on port ${port}`);
})

app.get("/", (req, res) => {
    res.send("you contacted root path");
})

// app.get("/apple", (req, res) => {
//     res.send("you contacted apple path");
// })

// app.get("/orange", (req, res) => {
//     res.send("you contacted orange path");
// })

// app.get("*", (req, res) => {
//     res.send("This path does not exist");
// })

// app.post("/", (req, res) => {
//     res.send("you send a post req to root path");
// })

// app.get("/:username/:id", (req, res) => {
//     console.log(req.params);
//     let {username, id} = req.params;
//     let htmlStr = `<h1>welcome to the page of @${username}!!</h1>`;
//     res.send(htmlStr);
// })

app.get("/search", (req, res) => {
    let {q} = req.query;
    if(!q) {
        res.send(`q not found`);
    }
    res.send(`search result for query : ${q}`);
})

// app.use((req, res) => {
//     // res.send({
//     //     name : "apple",
//     //     color : "red",
//     // });
//     let code = "<h1>fruits</h1> <ul><li>apple</li><li>orange</li></ul>";
//     res.send(code);
//     // console.log(req);
//     console.log("request received");
// })