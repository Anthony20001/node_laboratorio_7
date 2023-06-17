const express = require("express")
const VALIDAR_VACIOS = require("../middleware/validar_vacios")
let USUARIOS = require('../models/usuario')
const MongoConnect = require("../database/MongoConnect")
const UsuarioModel = require("../models/UsuarioModel")
const VALIDA_TOKEN = require("../middleware/validar_token")

let router = express.Router()

router.use(express.json())
router.use(VALIDAR_VACIOS)


const petitionStructure = ($status, message, response) => {
    if(response !== null && $status >= 199 && $status <= 399){
        return {
            result: {
                message,
                status: $status
            },
            response
        }
    }

    return {
        error: {
            message,
            status: $status
        }
    }
}

MongoConnect()

//-------------------- 7 ---------------------
//router.get("/", (req, res) => res.status(200).json(petitionStructure(200, "ok", USUARIOS)))

router.get("/", VALIDA_TOKEN, async (req, res) => {
    try{
        const usuarios =  await UsuarioModel.find()
        return res.json(usuarios)
    }catch (error){
        return res.status(500).json({status: "Error de servidor"})
    }
})

//-------------------- 8 ---------------------
/*router.get("/:id", (req, res) => {
    const query = USUARIOS.find(usuario => parseInt(usuario.id) === parseInt(req.params.id))
    if (query) {
        res.status(200).json(petitionStructure(200, "ok", query))
    } else {
        res.status(404).json(petitionStructure(404, "bad", null))
    }
})*/

router.get("/:id", VALIDA_TOKEN, async (req, res) => {
    try {
        const {id} = req.params
        const usuarios = await UsuarioModel.findById(id)
        if(usuarios) return res.status(200).json(usuarios)
        if(!usuarios) return res.status(404).json({status: "Usuario no encontrado"})
    } catch (err) {
        return res.status(500).json({status: "Error de servdor"})
    }
})

//-------------------- 9 ---------------------
/*router.post("/", VALIDAR_VACIOS, (req, res) => {
    console.log(0)
    if(!req.errMsg){
        console.log(1)
        try{
            const id = USUARIOS.length + 1
            const nombre = req.body?.nombre
            const apellido = req.body.apellido
            const edad = req.body.edad

            USUARIOS.push({ id, nombre, apellido, edad })

            const nuevoUsuario = USUARIOS.find(u => u.id === id)
            res.status(201).json(petitionStructure(201, "ok", nuevoUsuario))
        }catch (e){
            res.status(500).json(petitionStructure(500, "bad", null))
        }
    }else{
        console.log("2")
        res.status(400).send(petitionStructure(400, req.errMsg, null))
    }

})*/

router.post("/", VALIDAR_VACIOS, async (req, res) => {
    try{
        const {nombre, apellido, edad, salario} = req.body
        const Usuario = new UsuarioModel({nombre, apellido, edad, salario})
        await Usuario.save()
        return res.json(Usuario)
    }catch (error){
        return res.status(500).json({status: "Error de servidor"})
    }
})

//-------------------- 10 ---------------------
/*router.put("/:id", (req, res) => {
    try{
        const id = req.params.id

        USUARIOS = USUARIOS.map(u => {
            if(parseInt(u.id) === parseInt(id)){
                u.id = id
                u.nombre = req.body?.nombre ?? u.nombre
                u.apellido = req.body?.apellido ?? u .apellido
                u.edad = req.body?.edad ?? u.edad
            }

            return u
        })

        const updatedUser = USUARIOS.find(u => u.id === id)

        res.status(201).json(petitionStructure(201, "ok", updatedUser))
    }catch (e){
        res.status(500).json(petitionStructure(500, "bad", null))
        console.log(e)
    }
})*/

router.put("/:id", async(req, res) => {
    try {
        const {id} = req.params
        const {nombre, apellido, edad, salario} = req.body
        const usuarios = await UsuarioModel.findByIdAndUpdate(id, {nombre, apellido, edad, salario}, {new:true})
        if(usuarios) return res.status(200).json(usuarios)
        if(!usuarios) return res.status(404).json({status: "Usuario no encontrado"})
    }catch (err) {
        res.status(500).json({status: "Error de servidor"})
    }
})

//-------------------- 11 ---------------------
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {nombre, apellido, edad, salario} = req.body
        const usuarios = await UsuarioModel.findByIdAndDelete(id)
        if(usuarios) return res.status(200).json(usuarios)
        if(!usuarios) return res.status(404).json({status: "Usuario no encontrado"})
    }catch (err) {
        res.status(500).json({status: "Error de servidor"})
    }
})

router.delete("/:id", async (req, res) => {

})

module.exports = router