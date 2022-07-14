import express from "express";
import pool from "./db.js";
import cors from "cors";

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

app.get("/shops", (req, res) => {
  console.log("hello");
  pool.connect(function (error, client, done) {
    console.log(error);
    let sqlStr = "SELECT * FROM shops ORDER BY id ASC";
    client.query(sqlStr, [], function (err, response) {
      done();
      res.json(response.rows); // Данные найдены на основе оператора SQL
    });
  });
});

app.get("/shops/:id", (req, res) => {
  pool.connect(function (error, client, done) {
    let sqlStr = `SELECT * FROM shops WHERE id=${req.params.id};`;
    client.query(sqlStr, [], function (err, response) {
      done();
      res.json(response.rows); // Данные найдены на основе оператора SQL
    });
  });
});

app.put("/shops/:id", (req, res) => {
  pool.connect(function (error, client, done) {
    let sqlStr = `UPDATE shops SET name='${req.body.name}', logo='${req.body.logo}' WHERE id=${req.params.id};`;
    client.query(sqlStr, [], function (err, response) {
      done();
      res.sendStatus(201); // Данные найдены на основе оператора SQL
    });
  });
});

app.post("/shops", (req, res) => {
  pool.connect(function (error, client, done) {
    let sqlStr = `INSERT INTO shops(name, logo) VALUES ('${req.body.name}', '${req.body.logo}');`;
    client.query(sqlStr, [], function (err, response) {
      done();
      res.sendStatus(201);
    });
  });
});

app.delete("/shops/:id", (req, res) => {
  pool.connect(function (error, client, done) {
    let sqlStr = `DELETE FROM shops WHERE id=${req.params.id};`; // оператор SQL для поиска в таблице
    client.query(sqlStr, [], function (err, response) {
      done();
      res.sendStatus(200); // Данные найдены на основе оператора SQL
    });
  });
});

app.get("/products", (req, res) => {
  pool.connect(function (error, client, done) {
    let sqlStr = "SELECT * FROM products ORDER BY id ASC";
    client.query(sqlStr, [], function (err, response) {
      done();
      res.json(response.rows); // Данные найдены на основе оператора SQL
    });
  });
});

app.get("/products/:shop_id", (req, res) => {
  pool.connect(function (error, client, done) {
    let sqlStr = `SELECT * FROM products WHERE shop_id=${req.params.shop_id};`;
    client.query(sqlStr, [], function (err, response) {
      done();
      res.json(response.rows); // Данные найдены на основе оператора SQL
    });
  });
});

app.put("/products/:id", (req, res) => {
  pool.connect(function (error, client, done) {
    let sqlStr = `UPDATE products SET shop_id='${req.body.shop_id}', name='${req.body.name}', price='${req.body.price}', image='${req.body.image}' WHERE id=${req.params.id};`;
    client.query(sqlStr, [], function (err, response) {
      done();
      res.sendStatus(201); // Данные найдены на основе оператора SQL
    });
  });
});

app.post("/products", (req, res) => {
  pool.connect(function (error, client, done) {
    let sqlStr = `INSERT INTO products(shop_id, name, price, image) VALUES ('${req.body.shop_id}', '${req.body.name}', '${req.body.price}', '${req.body.image}');`;
    client.query(sqlStr, [], function (err, response) {
      done();
      res.sendStatus(201);
    });
  });
});

app.post("/orders", (req, res) => {
  let { name, email, phone, address, totalPrice, products } = req.body;

  pool.connect(async function (error, client, done) {
    let sqlStr = `INSERT INTO orders(name, email, phone, address, total_price)
    VALUES ('${name}', '${email}', '${phone}', '${address}', '${totalPrice}')
    RETURNING id`;
    let response = await client.query(sqlStr, []);
    let orderId = response.rows[0].id;
    sqlStr = "INSERT INTO order_items(product_id, order_id, quantity) VALUES ";
    for (let item of products) {
      sqlStr += `(${item.id}, ${orderId}, ${item.quantity}), `;
    }
    await client.query(sqlStr.slice(0, sqlStr.length - 2), []);
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
