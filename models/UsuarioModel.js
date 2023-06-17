const mongoose = require("mongoose")

const UsuarioSchema = mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    salario: Number
})

const UsuarioModel = mongoose.model("usuario", UsuarioSchema)
module.exports = UsuarioModel