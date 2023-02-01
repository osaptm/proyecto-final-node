const { Router } = require("express");
const carsController= require("../controllers/cars.controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
/**
 * @openapi
 * /store/cart/:
 *   get:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: get all products Cart
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: All Products Cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/productsCartResponse"
 *       400:
 *         description: Error in sequelize
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error in sequelize
 * /store/cart/addproduct:
 *   post:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Add new Product to Cart
 *     tags: [Cart]
 *     requestBody:
 *       description: Required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/addProductCart"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/addProductCartResponse"
 *       400:
 *         description: Error Add new Product to Cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error Sequeliza / Something wrong / Not Token
 */
router.get("/", [validarJWT], carsController.getProductsCar);
router.post("/addproduct", [validarJWT], carsController.addProductCar);

module.exports = router; // ahorita lo usamos en app
