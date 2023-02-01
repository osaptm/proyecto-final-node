const models = require("../utils/init-models");
const { Op } = require("sequelize")

class Orders {

  static async getOrders(userid) {
    try {
     
      const result = await models.order.findAll({
        where: {
          status: 'pending'
        }, 
        include: {
            model: models.car,
            as:"cart",
            include: {
              model: models.productincar,
              as:"productincars",
              include: {
                model: models.product,
                as:"product"
            }
          }
        }
    });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async createOrder(objOrder, transact) {
    try {      
      const result = await models.order.create(objOrder,{transaction:transact});
      return result;
    } catch (error) {
      throw error;
    }
  }

 
}

module.exports = Orders;
