const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const { v4: uuid } = require("uuid");
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const app = express();

app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  port: 3306,
  password: "choudhary21*",
});

function getRandomUser() {
  return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]['COUNT(*)'];
      res.render("home", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error occouring : ");
  }
});

app.get("/user", (req, res) => {
  let q = "SELECT * FROM user";
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result;
      res.render("show", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("some error occouring : ");
  }
});

app.get("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = "${id}"`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0]
      res.render("edit", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("some error occouring : ");
  }
});

app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = "${id}"`;
  console.log(req.body);
  let { password: formPass, username: newUsername } = req.body;
  try {
    connection.query(q, (err, result) => {
      if(err) throw err;
      let user = result[0];
      if (formPass != user.password) {
        res.send("Wrong Password");
      } else {
        let q2 = `UPDATE user SET name = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) {
            console.error("An error occurred:", err);
            res.send(err);
          }
          // console.log(result);
          res.redirect("/user");
        })
      }
    });
  } catch (err) {
    console.log(err);
    return res.send("some error occouring : ");
  }
})

app.listen(8080);

// try {
//   connection.query(q,[data], (err, result) => {
//       if(err) throw err;
//       console.log(result);
//   })
// } catch(err) {
//   console.log(err);
// }

// connection.end();
