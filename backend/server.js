const express = require('express')
const app = express()

/*
Access to XMLHttpRequest at 'http://localhost:8000/auth' from origin 
'http://localhost:3000' has been blocked by CORS policy: Response to 
preflight request doesn't pass access control check: No 
'Access-Control-Allow-Origin' header is present on the requested resource.
*/
var cors = require('cors')
app.use(cors()) 

app.use(express.static(__dirname))

// router
const kelas = require("./router/kelas")
const spp = require("./router/spp")
const siswa = require("./router/siswa")
const petugas = require("./router/petugas")
const pembayaran = require("./router/pembayaran")
const auth = require("./router/auth")

app.use("/auth", auth)
app.use("/kelas", kelas)
app.use("/spp", spp)
app.use("/siswa", siswa)
app.use("/petugas", petugas)
app.use("/pembayaran", pembayaran)

app.listen(8000, () => {
    console.log("Server run on 8000")
})