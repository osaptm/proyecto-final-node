var DataTypes = require("sequelize").DataTypes;
var _car = require("./car");
var _order = require("./order");
var _product = require("./product");
var _productincar = require("./productincar");
var _user = require("./user");

function initModels(sequelize) {
  var car = _car(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var productincar = _productincar(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  order.belongsTo(car, { as: "cart", foreignKey: "cartid"});
  car.hasMany(order, { as: "orders", foreignKey: "cartid"});
  productincar.belongsTo(car, { as: "cart", foreignKey: "cartid"});
  car.hasMany(productincar, { as: "productincars", foreignKey: "cartid"});
  productincar.belongsTo(product, { as: "product", foreignKey: "productid"});
  product.hasMany(productincar, { as: "productincars", foreignKey: "productid"});
  car.belongsTo(user, { as: "user", foreignKey: "userid"});
  user.hasMany(car, { as: "cars", foreignKey: "userid"});
  order.belongsTo(user, { as: "user", foreignKey: "userid"});
  user.hasMany(order, { as: "orders", foreignKey: "userid"});
  product.belongsTo(user, { as: "user", foreignKey: "userid"});
  user.hasMany(product, { as: "products", foreignKey: "userid"});

  return {
    car,
    order,
    product,
    productincar,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
