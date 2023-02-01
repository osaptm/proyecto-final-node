const AuthServices = require("../services/auth.services");
const models = require("../utils/init-models");
const transporter = require("../utils/mailer");

const register = async (req, res) => {
  try {
    const user = req.body;
    const result = await AuthServices.register(user);
    if (result) {
      
      const resultado_email = await transporter.sendMail({
        to: result.email,
        from: "exmilder@gmail.com",
        subject: "Email confirmation",
        html: "<h1>Bienvenido a la mejor app de chat creada por mi</h1> <p>Tienes que confirmar tu email</p><p> Solo haz click en el siguiente <a href='#'' target='new_blank'> enlace </a>",
      });

      res.status(201).json({ message: "user created" });

    } else {
      res.status(400).json({ message: "somethign wrong" });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not email provided",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Missing data",
        message: "Not password provided",
      });
    }
    const result = await AuthServices.login({ email, password });
    if (result.isValid) {
      const { username, id, email } = result.user;
      const userData = { username, id, email };
      const token =  AuthServices.genToken(userData);      
      const confirmed = (await AuthServices.confirmedUser(id))===1;  
      userData['token'] = token;
      userData['confirmed'] = confirmed;  
      res.json(userData);
    } else {
      res.status(400).json({ message: "user not found" });
    }
    // usuario no encontrado
    // contraseña incorrecta
  } catch (error) {
    res.status(400).json({ message: "Something wrong" });
  }
};

module.exports = {
  register,
  login,
};
