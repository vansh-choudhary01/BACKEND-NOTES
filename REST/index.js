const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
// uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const port = 8080;

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");

// Set the directory for views
app.set("views", path.join(__dirname, "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

let posts = [
    {
        id : uuidv4(),
        username : "apnacollege",
        content : "i love coding"
    },
    {
        id : uuidv4(),
        username : "shradhakhapra",
        content : "Hardwork is importent to achive success"
    },
    {
        id : uuidv4(),
        username : "rahulkumar",
        content : "I got selected for my Ist internship"
    }
]


app.get("/post", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/post/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/post", (req, res) => {
    let {username, content} = req.body;
    posts.push({username, content, id : uuidv4()});
    res.redirect("/post");
})

app.get("/post/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
})

app.patch("/post/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    // res.send("patch request working");
    res.redirect("/post");
})

app.get("/post/:id/edit", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/post/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id != p.id);
    res.redirect("/post");
})

app.listen(port, () => {
    console.log(`Server is started on port ${port} :)`);
});
