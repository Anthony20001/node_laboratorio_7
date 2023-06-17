const mongoose = require("mongoose")

const MongoConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:55555/base_de_datos")
        .then(() => console.log("Conexión a base de datos exitosa"))
        .catch((err) => console.log(err))
}

module.exports = MongoConnect