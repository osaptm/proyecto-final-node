const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const models = require("../utils/init-models");


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { email } = jwt.verify( token, process.env.JWT_SECRET );

        // leer el usuario que corresponde al uid
        const user_ = await models.user.findOne({ where: { email } });
        if( !user_ ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !user_.is_confirmed ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        
        
        req.user_ = user_;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}