const mongoose = require("mongoose")

const EmpresaSchema = mongoose.Schema({
    nombre: String,
    llave: String,
})

const EmpresaModel = mongoose.model("empresa", EmpresaSchema)
module.exports = EmpresaModel