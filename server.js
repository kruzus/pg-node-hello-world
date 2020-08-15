const express = require("express");
const { Pool, Client } = require("pg");
require('dotenv').config();

const app = express();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
  res.json({
    msg: "Success!",
  });
});

app.get("/db/", (req, response) => {
  pool.query("SELECT * FROM customers", (err, res) => {
    response.send(res.rows);
    
  });
});

app.get("/db/:id", (req, response) => {
  pool.query(`SELECT * FROM customers WHERE id='${req.params.id}'`, (err, res) => {
    response.send(res.rows);
    
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
