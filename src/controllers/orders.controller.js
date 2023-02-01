const db = require("../utils/database");
const Orders = require("../services/orders.services");
const Cars = require("../services/cars.services");
const Products = require("../services/products.services");
const transporter = require("../utils/mailer");

const getOrders = async (req, res) => {
  try {    
      const resul = await Orders.getOrders();
      res.status(201).json(resul);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createOrder = async (req, res) => {
  try {

    
        const {cartid} = req.body;
        // Revisar si hay productos en el carrito
        const resul = await Cars.getProductsCar();
        if(resul.length === 0){
          throw {message:'No existe un carrito o no hay productos en el carrito'};
        }else{
          if(resul[0].productincars.length === 0){
            throw {message:'No hay productos en el carrito'};
          }
        }
         // Todos los productos en el carrito se marcan como comprados stauts = 'purchases' 
        const resPurchasedProducts = await Products.purchasedProducts(cartid); 
        if(resPurchasedProducts<1) throw {message:'El cartid no es valido u error inesperado'};
        // Carrito cambia a status ‘purchased’ 
        const resPurchasedCar = await Cars.purchasedCar(cartid, req.user_.id);        
        if(resPurchasedCar!==1) throw {message:'El cartid no es valido'};
       
       

        const orderObj = {
          totalprice:resul[0].totalprice, 
          userid:req.user_.id, 
          cartid:cartid, 
        }    
    
        const result = await Orders.createOrder(orderObj);

        // Enviar Email
        const resultado_email = await transporter.sendMail({
          to: result.email,
          from: "exmilder@gmail.com",
          subject: "Email confirmation Order",
          html: "<h1>Compra Realizada con Exito</h1>",
        });
  
        res.status(201).json({ message: "Create Order OK", order: result});
 
} catch (error) {
  res.status(400).json(error.message);
}
};


module.exports = {
  getOrders,
  createOrder,
};
