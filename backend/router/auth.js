const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const md5 = require('md5')

// call model
const petugas = require("../models/index").petugas

// allow request body
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.post('/', async (req,res) => {
    // put data
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        level: req.body.level
    }

    // let exp = {
    //     expToken: req.body.expToken
    // }
    
    // put result
    let result = await petugas.findOne({where:data})

    if(result === null){
        res.json({
            message: "invalid username or password or level",
            logged: false
        })
    } else {
        // jwt
        let jwtHeader = {
            algorithm: "HS256",
            // expiresIn: exp.expToken // 1s 1h 1d 1w 1y
        }

        let payload = {
            data: result
        }
        
        let secretKey = "koala"

        let token = jwt.sign(payload, secretKey, jwtHeader)
        res.json({
            data: result,
            token: token,
            logged: true
        })
    }
})

module.exports = app