const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require('express-fileupload');
const db = require("./utils/database");
const initModels = require("./models/init-models");
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require("./routes/products.routes");
const carsRoutes = require("./routes/cars.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:false, limit: '50mb'}));
app.use(fileUpload());
app.use(cors());
app.use(morgan("tiny"));

initModels(db);

db.authenticate()
  .then(() => console.log("Base de datos autenticada"))
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my server" });
});

app.use("/store/auth", authRoutes);
app.use("/store/products", productsRoutes);
app.use("/store/cart", carsRoutes);
app.use("/store/orders", ordersRoutes);

module.exports = app;
