require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.port || 3001;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "./src")));

const Sequelize = require("sequelize");

const db = new Sequelize("InstaClone_Database", "postgres", "Behappy12", {
  host: "localhost",
  dialect: "postgres",
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    aquire: 30000,
    idle: 10000,
  },
});

app.get("/api/users", (req, res) => {
  db.query(`SELECT * FROM users;`)
    .then((dbRes) => {
      res.status(200).send(dbRes[0]);
    })
    .catch((err) => console.log(err));
});

app.get("/api/posts", (req, res) => {
  db.query(`SELECT * FROM posts;`)
    .then((dbRes) => {
      console.log(dbRes);
      res.status(200).send(dbRes[0]);
    })
    .catch((err) => console.log(err));
});

//? 2. create an endpoint that will receive the request and create the post

app.post("/api/posts", (req, res) => {
  let { image, caption } = req.body;
  req.body.caption;
  db.query(
    `INSERT INTO posts( image, caption)
  VALUES('${image}', '${caption}')`
  )
    .then((dbRes) => {
      res.status(200).send(dbRes[0]);
    })
    .catch((err) => console.log(err));
});

app.put("/api/posts", (req, res) => {
  let { caption, id } = req.body.data;

  db.query(
    `
    UPDATE posts
    SET caption = '${caption}'
    WHERE post_id = '${id}'
    `
  )
    .then((dbRes) => {
      res.status(200).send(dbRes[0]);
    })
    .catch((err) => console.log(err));
});

app.delete("/api/posts", (req, res) => {
  let { id } = req.body;

  db.query(
    `
    DELETE FROM posts
    WHERE post_id = ${id};
    `
  )
    .then((dbRes) => {
      res.status(200).send(dbRes[0]);
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log(`App is running on port ${port}`));
