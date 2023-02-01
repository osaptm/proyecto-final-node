const Products = require("../services/products.services");
const { subirArchivo } = require("../utils/subir-archivos");

const getAllProducts = async (req, res) => {
  try {    
      const resul = await Products.getAllProducts();
      res.status(201).json(resul);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const createNewProducts = async (req, res) => {
  try {
    if(!req.files) throw {message:'No hay Imagen'};   
    const image_ = await subirArchivo( req.files, undefined, 'products' );

    const {name, price, availableqty} = req.body
    const productObj = {
      name, 
      price, 
      availableqty, 
      userid: req.user_.id,
      image:image_
    }    
    const result = await Products.createNewProducts(productObj);
    res.status(201).json({ message: "Product created", product: result});
} catch (error) {
  res.status(400).json(error.message);
}
};


module.exports = {
  getAllProducts,
  createNewProducts,
};
