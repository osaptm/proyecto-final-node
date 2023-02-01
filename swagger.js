const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const options = {
  apis: [
    "./src/routes/auth.routes.js", 
    "./src/models/user.js",
    "./src/routes/products.routes.js", 
    "./src/models/product.js",
    "./src/routes/cars.routes.js", 
    "./src/models/car.js",
    "./src/routes/orders.routes.js", 
    "./src/models/order.js"
  ],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API STORE",
      version: "1.0.0",
      description: "API para una tienda virtual",
    },
  },
};

// vamos a generar una especificación en json para nuestra docu
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  // generar la ruta donde se mostrará la documentación
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req, res) => {
    res.setHeader({ "Content-Type": "application/json" });
    res.send(swaggerSpec);
  });

  console.log(
    `La documentación esta disponible en ${process.env.URL}:${port}/docs`
  );
};

module.exports = swaggerDocs;
