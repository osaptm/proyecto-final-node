const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../utils/init-models");

require("dotenv").config();

class AuthServices {
  static async register(user_) {
    try {
      const salt = bcrypt.genSaltSync();
      user_.password = bcrypt.hashSync( user_.password, salt );
      const result = await models.user.create(user_);
      return result;

    } catch (error) {
      throw error;
    }
  }
  static async login(credentials) {
    try {
      const { email, password } = credentials;
      const user_ = await models.user.findOne({ where: { email } });

      if (user_) {
        const isValid = bcrypt.compareSync(password, user_.password);
        return isValid ? { isValid, user:user_ } : { isValid };
      }
      return { isValid: false };
    } catch (error) {
      throw error;
    }
  }
  static async confirmedUser(id) {
    try {
        const res = await models.user.update(
        {is_confirmed: true},
        {where: { id:id }});
        return res[0];
    } catch (error) {
      throw error;
    }
  }
  static genToken(data) {
    try {
      const token = jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1000m",
        algorithm: "HS512",
      });
      return token;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;
