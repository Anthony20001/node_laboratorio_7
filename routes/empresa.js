const express = require("express")
const router = express.Router()
const MongoConnect = require("../database/MongoConnect")
const EmpresaModel = require("../models/EmpresaModel")
const jwt = require('jsonwebtoken')

router.use(express.json())

MongoConnect()

router.post("/create", async (req, res) => {
    try {
        console.log(req.body)
        const {nombre, llave} = req.body
        const empresa = new EmpresaModel({nombre, llave})
        await empresa.save()
        return res.json(empresa)
    } catch (err) {
        res.status(500).json({status: "Error de servidor"})
        console.log(err)
    }
})

router.post("/validate", async (req, res) => {
    try {
        const {llave} = req.body
        const empresa = await EmpresaModel.find({llave})
        if(!empresa) return res.status(404).json({status: "Llave no encontrada"})

        jwt.sign({empresa}, process.env.LOCAL_KEY, {expiresIn: "20s"}, (error, token) => {
            if(error) return res.status(500).json({status: "json no generado"})
            return res.json(token)
        })
    } catch (err) {
        res.status(500).json({status: "Error de servidor"})
        console.log(err)
    }
})
module.exports = router