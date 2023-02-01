const Sequelize = require('sequelize');
/**
 * @openapi
 * components:
 *   schemas:
 *     addProductCart:
 *       type: object
 *       properties:
 *         quantity:
 *           type: integer
 *           example: 5
 *         productid:
 *           type: integer
 *           example: 6
 *     addProductCartResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string,
 *           example: Product Add in Car
 *         product:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: pending 
 *             id:
 *               type: integer
 *               example: 8
 *             cartid:
 *               type: integer
 *               example: 5
 *             productid:
 *               type: integer
 *               example: 5
 *             quantity:
 *               type: integer
 *               example: 8
 *             price:
 *               type: float
 *               example: 8.5
 *     productsCartResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *             example: 5 
 *           userid:
 *             type: integer
 *             example: 8
 *           totalprice:
 *             type: float
 *             example: 1000.5
 *           status:
 *             type: string
 *             example: pending
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
 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    totalprice: {
      type: DataTypes.REAL,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending"
    }
  }, {
    sequelize,
    tableName: 'car',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "car_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
