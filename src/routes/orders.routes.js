const { Router } = require("express");
const ordersController= require("../controllers/orders.controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
/**
 * @openapi
 * /store/orders/:
 *   get:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Get order whit products
 *     tags: [Orders]
 *     responses:
 *       201:
 *         description: Order whit products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/getOrdersResponse"
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
 * /store/orders/purchase:
 *   post:
 *     security:
 *       - ApiKeyAuth: []
 *     summary: Create new Order Purchase
 *     tags: [Orders]
 *     requestBody:
 *       description: Required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/newOrder"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/newOrderResponse"
 *       400:
 *         description: Error create Order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error Sequeliza / Something wrong / Not Token
 */
//Ver todas las ordenes del usuario
router.get("/", [validarJWT], ordersController.getOrders);

//Realizar una compra, ( Todos los productos en el carrito se marcan como comprados stauts = 'purchases' ) y el carrito cambia a status ‘purchased’ 
router.post("/purchase", [validarJWT], ordersController.createOrder);

module.exports = router; // ahorita lo usamos en app
