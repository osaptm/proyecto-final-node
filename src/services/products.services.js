const models = require("../utils/init-models");
const { Op } = require("sequelize")

class Products {

  static async getAllProducts() {
    try {
     
      const result = await models.product.findAll({
        where: {
          availableqty: {
            [Op.gt]: 0
          }
        }, 
        include: {
            model: models.user,
            as:"user",
            attributes: ['username'], 
        }
    });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async getProductById(productid) {
    try {
     
      const result = await models.product.findOne({
        where: {
          id: productid
        }
    });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateStock(productid, stock) {
    try {
        const res = await models.product.update(
        {availableqty: stock},
        {where: { id:productid }});
        return res[0];
    } catch (error) {
      throw error;
    }
  }

  static async purchasedProducts(cartid_) {
    try {
        // Cambiamos Car a estado purchased
        const res = await models.productincar.update(
        {status: 'purchased'},
        {where: { cartid:cartid_ }});        
        // Retornamos si se actualizo         
        return res[0];
    } catch (error) {
      throw error;
    }
  }

  static async createNewProducts(productObj) {
    try {
      const result = await models.product.create(productObj);
      return result;
    } catch (error) {
      throw error;
    }
  }
 
}

module.exports = Products;
