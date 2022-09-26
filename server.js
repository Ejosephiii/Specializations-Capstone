require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const port = process.env.port || 3001;
const app = express();
const bcrypt = require("bcryptjs");

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

//get requests
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

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;

  const [[user]] = await db.query(`
            SELECT * FROM users
            WHERE username = '${username}';
        `);

  if (user) {
    console.log("it's a login");
    const authenticated = bcrypt.compareSync(password, user.password);

    if (authenticated) {
      res.status(200).send({
        username: user.username,
        userId: user.user_id,
      });
    } else {
      res.status(401).send("wrong password");
    }
  } else if (!user) {
    console.log("it's a register");

    const salt = bcrypt.genSaltSync(5);
    const passHash = bcrypt.hashSync(password, salt);
    console.log(salt, passHash);

    const [[newUser]] = await db.query(`
                INSERT INTO users ( username, password ) 
                VALUES ( '${username}', '${passHash}' )
                RETURNING user_id, username;
            `);

    console.log(newUser);
    res.status(200).send(newUser);
  }
});
//post request
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

//put request
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

//delete request
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
