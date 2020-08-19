const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");


// use middleware
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DB,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5000,
});
pool.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("connected");
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "/db/ or /db/id",
  });
});

// app.get("/db/", (req, response) => {
//   pool.query("SELECT * FROM customers", (err, res) => {
//     const data = res.rows;

//     if (err) {
//       response.json({
//         error: "connection is not stablished",
//       });
//     } else {
//       response.send(data);
//     }
//   });
// });

app.get("/db/", (req, response) => {
  pool.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      response.json({ 
        errorMessage: err.message
       });
    } else {
      const data = res.rows;
      response.json(data);
    }
  });
});


app.get("/db/:id", (req, response) => {
  const { id } = req.params;
  pool.query(`SELECT * FROM customers WHERE id='${id}'`, (err, res) => {
    

  //   if (!data && err) {
  //     response.json({
  //       msg: `Data with an ID#: ${id} was not found.`,
  //       data: `${data}`,
  //     });
  //   } else {
  //     response.json(data);
  //   }
  // });


  if (err) {
    response.json({ 
      errorMessage: err.message
     });
  } else {
    const [data] = res.rows;
    response.json(data);
  }
});

});


const PORT = 8080;

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
