const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");


// use middleware
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


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
    console.log('server working...');
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "/db/ or /db/id",
  });
});

app.get("/db/", (req, response) => {
  pool.query("SELECT * FROM customers", (err, res) => {
    //we using err.message to display
    //"error": "relation \"customer\" does not exist"

    if (err) {
      response.json({
        error: err.message,
      });
    } else {
      const data = res.rows;

      if (!data.length) {
        response.json({
          msg: "DB is empty",
          db: data,
        });
      } else {
        response.send(data);
 
      }
    }


  

  


  });
});

// app.get("/db/", (req, response) => {
//   pool.query("SELECT * FROM customers", (err, res) => {
//     const DATA = res.rows;

//     if(!DATA.length){
//       response.json({
//         msg: "Data doest exist",

//       })
//     }

//   });
// });

// if (err) {
//   response.json({
//     messages: [err.message,err.name,err.stack]
//    });
// } else {

//   response.json({data: res.rows});
// }

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
    // if (err) {
    //   response.json({
    //     messages: [err.message,err.name,err.stack]
    //    });
    // } else {
    //   const [data] = res.rows;
    //   response.json(data);
    // }
  });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
 
});
