const express = require("express")
const app = express()
var md5 = require('md5');

// call model
const petugas = require("../models/index").petugas

// allow request body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// auth_verify
const verify = require("./auth_verify")
app.use(verify)

// get data
app.get("/", async(req,res) => {
    petugas.findAll({include:[{ all: true, nested: true }]})
    .then(result => {
        res.json({
            petugas: result,
            found: true
        })
    })
    .catch(error => {
        res.json({
            message: error.message,
            found: false
        })
    })
})

// add data
app.post("/", async(req,res) => {
    // put data
    let data = {
        username: req.body.username,
        nama_petugas: req.body.nama_petugas,
        level: req.body.level,
        password: md5(req.body.password)
    }

    petugas.create(data)
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
        username: req.body.username,
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }

    let param = {
        id_petugas: req.body.id_petugas
    }

    if(req.body.password){
        data.password = md5(req.body.password)
    }

    petugas.update(data, {where: param})
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
app.delete("/:id_petugas", async(req,res) => {
    // put data
    let param = {
        id_petugas: req.params.id_petugas
    }

    petugas.destroy({where: param})
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