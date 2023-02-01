const { Router } = require("express");
const pruductsController= require("../controllers/products.controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

/**
 * @openapi
 * /store/products/:
 *   get:
 *     summary: get all products whit availableqty > 0
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: All Products whit availableqty > 0
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/allProductsResponse"
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
 * /store/products/create:
 *   post:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Created new Product
 *     tags: [Products]
 *     requestBody:
 *       description: Required fields to created Product
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: "#/components/schemas/newProduct"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/newProductResponse"
 *       400:
 *         description: Error create Product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error Sequeliza / Something wrong / Not Token
 */

//- Obtener todos los productos que su cantidad sea mayor que 0, debe incluir el nombre del usuario quien esta vendiendo el producto
router.get("/",pruductsController.getAllProducts);
//- Crear un nuevo producto, incluyendo una imagen.
router.post("/create", [validarJWT], pruductsController.createNewProducts);

module.exports = router; // ahorita lo usamos en app
