const models = require("../utils/init-models");
const { Op } = require("sequelize")

class Car {

  static async getProductsCar() {
    try {
     
      const result = await models.car.findAll({
        where: {
          status: 'pending'
        }, 
        include: {
            model: models.productincar,
            as:"productincars"
        }
    });

      return result;
    } catch (error) {
      throw error;
    }
  }
  static async getCarPending(userid_) {
    try {
     
      const result = await models.car.findOne({
        where: {
          status: 'pending',
          userid:userid_
        }
    });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async createCar(userid_) {
    try {
     
      const objCar = {
        userid:userid_,
        totalprice:0
      }
      
      return await models.car.create(objCar);
     
    } catch (error) {
      throw error;
    }
  }

  static async purchasedCar(cartid, userid) {
    try {
        // Cambiamos Car a estado purchased
        const res = await models.car.update(
        {status: 'purchased'},
        {where: { id:cartid }});
        //Creamos un nuevo Carro Vacio
        const resCreate = this.createCar(userid); 
        // Retornamos si se actualizo         
        return res[0];
    } catch (error) {
      throw error;
    }
  }

  static async updatePrice(cartid, price) {
    try {
        const res = await models.car.update(
        {totalprice: price},
        {where: { id:cartid }});
        return res[0];
    } catch (error) {
      throw error;
    }
  }

  static async addProductCar(productObj) {
    try {
      const result = await models.productincar.create(productObj);
      return result;
    } catch (error) {
      throw error;
    }
  }
 
}

module.exports = Car;
