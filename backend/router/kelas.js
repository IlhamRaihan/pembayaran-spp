const express = require("express")
const app = express()

// call model
const kelas = require("../models/index").kelas

// allow request body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// auth_verify
const verify = require("./auth_verify")
app.use(verify)

// get data
app.get("/", async(req,res) => {
    kelas.findAll({include:[{ all: true, nested: true }]})
    .then(result => {
        res.json({
            message: "Data founded",
            kelas: result, 
            found: true
        })
    })
    .catch(error => {
        res.json({
            message: error.message, 
            found: true
        })
    })
})

// add data
app.post("/", async(req,res) => {
    // put data
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }

    kelas.create(data)
    .then(result => {
        res.json({
            message: "Data inserted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// update data
app.put("/", async(req,res) => {
    // put data
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }

    let param = {
        id_kelas: req.body.id_kelas
    }

    kelas.update(data, {where: param})
    .then(result => {
        res.json({
            message: "Data updated",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// delete data
app.delete("/:id_kelas", async(req,res) => {
    // put data
    let param = {
        id_kelas: req.params.id_kelas
    }

    kelas.destroy({where: param})
    .then(result => {
        res.json({
            message: "Data deleted",
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

module.exports = app;