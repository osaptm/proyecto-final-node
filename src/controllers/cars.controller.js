const { getProductById } = require("../services/products.services");
const Cars = require("../services/cars.services");
const Products = require("../services/products.services");


const getProductsCar = async (req, res) => {
  try {    
      const resul = await Cars.getProductsCar();
      res.status(201).json(resul);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const addProductCar = async (req, res) => {
  try {
    const {quantity, productid} = req.body;
    const objProduct = await getProductById(productid);
    if(objProduct===null) throw {message:'El productid no es valido'};
    const price = objProduct.price;
    const product_quantity = objProduct.availableqty;
    // Validamos que tenemos el stock necesario
    if(product_quantity<quantity) throw {message:'No hay stock requerido'};
    // Validamos si hay un carrito pendiente - sino lo creamos
    let objCar = await Cars.getCarPending(req.user_.id);
    if(objCar === null) objCar = await Cars.createCar(req.user_.id);  
    const cartid = objCar.id;
    const totalpriceCar = objCar.totalprice;

    // Agregamos el producto al carrito
    const productObj = {
      cartid, 
      productid, 
      quantity, 
      price,
    }  
    const result = await Cars.addProductCar(productObj);
    // Update totalprice in car
    const newTotalPriceCar = (Number.parseFloat(price) * Number(quantity)) + totalpriceCar;
    await  Cars.updatePrice(cartid, newTotalPriceCar);
    // Update Stok en producto
    const newStock = Number(product_quantity) - Number(quantity);
    await  Products.updateStock(productid, newStock);

    res.status(201).json({ message: "Product Add in Car", product: result});
} catch (error) {
  res.status(400).json(error.message);
}
};


module.exports = {
  getProductsCar,
  addProductCar,
};
