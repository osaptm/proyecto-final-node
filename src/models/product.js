const Sequelize = require('sequelize');

/**
 * @openapi
 * components:
 *   schemas:
 *     newProduct:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: TV Samsung
 *         price:
 *           type: float
 *           example: 10.5
 *         availableqty:
 *           type: integer
 *           example: 5
 *         archivo:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *     newProductResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string,
 *           example: Product Created
 *         product:
 *           type: object
 *           properties:
 *             status:
 *               type: boolean
 *               example: true 
 *             id:
 *               type: integer
 *               example: 8
 *             name:
 *               type: string
 *               example: TV SanmSung
 *             price:
 *               type: float
 *               example: 800.50
 *             availableqty:
 *               type: integer
 *               example: 8
 *             userid:
 *               type: integer
 *               example: 8
 *             image:
 *               type: string
 *               example: 716c8676-a44a-460a-81e3-1b92950afdde.jpg
 *     allProductsResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           staus:
 *             type: boolean
 *             example: true 
 *           id:
 *             type: integer
 *             example: 8
 *           name:
 *             type: string
 *             example: TV SanmSung
 *           price:
 *             type: float
 *             example: 800.50
 *           availableqty:
 *             type: integer
 *             example: 8
 *           userid:
 *             type: integer
 *             example: 8
 *           image:
 *               type: string
 *               example: 716c8676-a44a-460a-81e3-1b92950afdde.jpg
 *           user:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: exmilder
 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false
    },
    availableqty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'product',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "product_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
