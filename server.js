const express = require("express");

const pool = require("./Pool");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/products", (req, res) => {
  pool.query(
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id;",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ success: true, message: "Welcome to Wiam's ecommerce API" });
});

app.get("/*", (req, res) => {
  res.status(400).json({
    success: false,
    msg: "Not within my API s reach...",
  });
});

const PORT = process.env.PORT || 5000;
const listener = app.listen(PORT, () =>
  console.log(`Your app is listening on port ${PORT}`)
);
