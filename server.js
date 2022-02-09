const express = require("express");

const pool = require("./Pool");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/products", (req, res) => {
  const { name } = req.query;
  let query =
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id ORDER BY products.product_name";

  let params = [];

  if (name) {
    query =
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE products.product_name LIKE $1 ORDER BY products.product_name";

    params.push(`%${name}%`);
  }

  pool
    .query(query, params)
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
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
