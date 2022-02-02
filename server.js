const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ success: true, message: "Welcome to Wiam's ecommerce API" });
});

const PORT = process.env.PORT || 5000;
const listener = app.listen(PORT, () =>
  console.log(`Your app is listening on port ${PORT}`)
);
