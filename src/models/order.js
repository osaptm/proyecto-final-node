const Sequelize = require('sequelize');
/**
 * @openapi
 * components:
 *   schemas:
 *     newOrder:
 *       type: object
 *       properties:
 *         cartid:
 *           type: integer
 *           example: 6
 *     newOrderResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string,
 *           example: Create Order OK
 *         order:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: pending 
 *             id:
 *               type: integer
 *               example: 8
 *             totalprice:
 *               type: float
 *               example: 5555.6
 *             userid:
 *               type: integer
 *               example: 5
 *             cartid:
 *               type: integer
 *               example: 8
 *     getOrdersResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             example: 5 
 *           totalprice:
 *             type: float
 *             example: 800.5
 *           userid:
 *             type: integer
 *             example: 10
 *           status:
 *             type: string
 *             example: pending
 *           cartid:
 *             type: integer
 *             example: 5
 *           productincars:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 5
 *                 cartid:
 *                   type: integer
 *                   example: 5
 *                 productid:
 *                   type: integer
 *                   example: 5
 *                 quantity:
 *                   type: integer
 *                   example: 5
 *                 price:
 *                   type: float
 *                   example: 55.6
 *                 status:
 *                   type: string
 *                   example: pending
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     name:
 *                       type: string
 *                       example: TV SONY
 *                     price:
 *                       type: float
 *                       example: 500.60
 *                     availableqty:
 *                       type: integer
 *                       example: 5
 *                     status:
 *                       type: boolean
 *                       example: true
 *                     userid:
 *                       type: integer
 *                       example: 5
 *                     image:
 *                       type: string
 *                       example: a984caef-4136-4fe1-b43f-1b410f65a9de.jpg
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    totalprice: {
      type: DataTypes.REAL,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending"
    },
    cartid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'car',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'order',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "order_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
