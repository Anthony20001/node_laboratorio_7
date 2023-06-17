const jwt = require('jsonwebtoken')

const validarToken = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1]
    jwt.verify(token, process.env.LOCAL_KEY, (error, data) => {
        if(error) return res.status(404).json({status: "Token inválido"})
        next()
    })
}

module.exports = validarToken