const express = require("express");
const { Pool, Client } = require("pg");
require('dotenv').config();
const cors = require('cors');
const app = express();



// use middleware
app.use(cors());



const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
  res.json({
   message: "/db/ or /db/id"
  });

  
});

app.get("/db/", (req, response) => {
  pool.query("SELECT * FROM customers", (err, res) => {
    response.send(res.rows);
    
  });
});

app.get("/db/:id",  (req, response) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM customers WHERE id='${id}'`,  (err, res) => {
    const [ data ] = res.rows;

    if(!data){
      response.json({
        err: `id with ${id} returned: ${data}`
      })
    } else {
      response.json(data)
    }
   
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
