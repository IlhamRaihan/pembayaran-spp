import React from "react";
import axios from "axios";
import { base_url } from "../Config.js";
class Siswa extends React.Component{
constructor(){
super()
this.state = {
token: "",
data_siswa: [],
message: "",
found: "",
nisn: "",
nis: "",
nama: "",
id_kelas: "",
alamat: "",
no_telp: "",
id_spp: "",
modal: "hidden",
action: ""
}
// dapetin token dari localstorage
if (localStorage.getItem("token")) {
this.state.token = localStorage.getItem("token")
} else {
// token ga ada, redirect ke laman login
window.location = "/login"
}
}
getDataSiswa = () => {
let url = base_url + "/siswa"
axios.get(url,{
headers:{
Authorization: "Bearer " + this.state.token
}
})
.then(response => {
this.setState({
found: response.data.found
})
if(this.state.found){
let data_siswa =
JSON.parse(JSON.stringify(response.data.siswa))
this.setState({
data_siswa: data_siswa
})
} else {
this.setState({
message: response.data.message
})
}
})
.catch(error => console.log(error))
}
addData = () => {
this.toggleModal(true)
this.setState({
action: "add",
nisn: "",
nis: "",
nama: "",
id_kelas: "",
alamat: "",
no_telp: "",
id_spp: ""
})
}
updateData = selectedItem => {
this.toggleModal(true)
this.setState({
action: "update",
nisn: selectedItem.nisn,
nis: selectedItem.nis,
nama: selectedItem.nama,
id_kelas: selectedItem.id_kelas,
alamat: selectedItem.alamat,
no_telp: selectedItem.no_telp,
id_spp: selectedItem.id_spp
})
}
dropData = selectedItem => {
if (window.confirm("Yakin nih dihapus?")) {
let url = base_url + "/siswa/" + selectedItem.nisn
axios.delete(url,{
headers:{
Authorization: "Bearer " + this.state.token
}
})
.then(response => {
window.alert(response.data.message)
this.getDataSiswa()
})
.catch(error => console.log(error))
}
}
save = event => {
event.preventDefault()
let form = {
nisn: this.state.nisn,
nis: this.state.nis,
nama: this.state.nama,
id_kelas: this.state.id_kelas,
alamat: this.state.alamat,
no_telp: this.state.no_telp,
id_spp: this.state.id_spp
}
let url = base_url + "/siswa"
if (this.state.action === "add") {
axios.post(url, form, { headers:{
Authorization: "Bearer " + this.state.token
}})
.then(response => {
this.getDataSiswa()
})
.catch(error => console.log("catch"))
} else if(this.state.action === "update"){
axios.put(url, form, { headers:{
Authorization: "Bearer " + this.state.token
}})
.then(response => {
this.getDataSiswa()
})
.catch(error => console.log(error))
}
this.toggleModal(false)
}
toggleModal = (modal) => {
if(modal){
this.setState({modal: "flex"})
}else{
this.setState({modal: "hidden"})
}
}
componentDidMount(){
this.getDataSiswa()
}
render(){
return(
<div>
<div className="mx-auto flex flex-row items-start
items-center justify-between pb-4 border-b border-gray-300">
<div className="mx-auto">
<div className="flex flex-col md:flex-row
items-start md:items-center text-gray-600 text-sm">
<div className="flex items-center">
<h4 className="text-2xl font-bold
leading-tight text-gray-800 text-center">Tabel Daftar Siswa</h4>
</div>
</div>
</div>
<div>
<button onClick={() => this.addData()}
className="transition duration-150 ease-in-out hover:bg-indigo-600
focus:outline-none border bg-indigo-700 rounded text-white px-8
py-2 text-sm">
Tambah Data
</button>
{/* Modal */}
<div className={`${this.state.modal}
justify-center items-center flex overflow-x-hidden overflow-y-auto
fixed inset-0 z-50 outline-none focus:outline-none`}>
<div className="relative w-auto my-6
mx-auto max-w-3xl">
{/*content*/}
<div className="border-0 rounded-lg
shadow-lg relative flex flex-col w-full glass outline-none
focus:outline-none">
{/*body*/}
<div className="relative p-6
flex-auto">
<div class="mt-10
sm:mt-0">
<div class="md:grid
md:grid-cols-3 md:gap-6">
<div
class="md:col-span-1">
<div
class="px-4 sm:px-0">
<h3
class="text-lg font-medium leading-6
text-gray-900">{this.state.action.toUpperCase()} Siswa</h3>
<p
class="mt-1 text-sm text-gray-600">
Gunakan
untuk {this.state.action.toUpperCase()} Siswa<br/><br/>
Syarat
Penggunaan: <br/>
- Wajib
memasukan semua kolom
</p>
</div>
</div>
<div class="mt-5
md:mt-0 md:col-span-2">
<form
method="POST" onSubmit={ev => this.save(ev)}>
<div
class="shadow overflow-hidden sm:rounded-md">
<div
class="px-4 py-5 bg-white sm:p-6">
<div class="grid grid-cols-6 gap-6">
<div class="col-span-6 sm:col-span-4">
<label for="nama" class="block text-sm font-medium
text-gray-700">Nama Lengkap</label>
<input type="text" name="nama" id="nama" autocomplete="nama"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.nama}
onChange={ev => this.setState({nama: ev.target.value})}
required/>
</div>
<div class="col-span-6 sm:col-span-4">
<label for="no_telp" class="block text-sm font-medium
text-gray-700">Nomor Telepon</label>
<input type="number" name="no_telp" id="no_telp"
autocomplete="no_telp"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.no_telp}
onChange={ev => this.setState({no_telp: ev.target.value})}
required/>
</div>
{ this.state.action === "update" ? (
<div class="col-span-6 sm:col-span-3">
<label for="nisn" class="block text-sm font-medium
text-gray-700">NISN <span
className="text-red-500">(Disabled)</span></label>
<input type="number" name="nisn" id="nisn" autocomplete="nisn"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.nisn}
disabled/>
</div>
):
<div class="col-span-6 sm:col-span-3">
<label for="nisn" class="block text-sm font-medium
text-gray-700">NISN</label>
<input type="number" name="nisn" id="nisn" autocomplete="nisn"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.nisn}
onChange={ev => this.setState({nisn: ev.target.value})}
required/>
</div>
}
<div class="col-span-6 sm:col-span-3">
<label for="nis" class="block text-sm font-medium
text-gray-700">NIS</label>
<input type="number" name="nis" id="nis" autocomplete="nis"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.nis}
onChange={ev => this.setState({nis: ev.target.value})}
required/>
</div>
<div class="col-span-6 sm:col-span-6">
<label for="alamat" class="block text-sm font-medium
text-gray-700">Alamat Lengkap</label>
<input type="text" name="alamat" id="alamat" autocomplete="alamat"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.alamat}
onChange={ev => this.setState({alamat: ev.target.value})}
required/>
</div>
<div class="col-span-6 sm:col-span-3">
<label for="id_kelas" class="block text-sm font-medium
text-gray-700">Kelas</label>
<input type="number" name="id_kelas" id="id_kelas"
autocomplete="id_kelas"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.id_kelas}
onChange={ev => this.setState({id_kelas: ev.target.value})}
required/>
</div>
<div class="col-span-6 sm:col-span-3">
<label for="id_spp" class="block text-sm font-medium
text-gray-700">SPP</label>
<input type="number" name="id_spp" id="id_spp"
autocomplete="id_spp"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.id_spp}
onChange={ev => this.setState({id_spp: ev.target.value})}
required/>
</div>
</div>
</div>
<div
class="px-4 py-3 bg-gray-50 text-right sm:px-6">
<button
className="text-red-500 background-transparent font-bold uppercase
px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1
ease-linear transition-all duration-150"
type="button"
onClick={() => this.toggleModal(false)}>
Close
</button>
<button
className="inline-flex justify-center py-2 px-4 border
border-transparent shadow-sm text-sm font-medium rounded-md
text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none
focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
type="submit">
Save
</button>
</div>
</div>
</form>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div className={`${this.state.modal}
opacity-25 fixed inset-0 z-40 bg-black`}></div>
</div>
</div>
<div class="flex flex-col">
<div class="-my-2 overflow-x-auto sm:-mx-6
lg:-mx-8">
<div class="py-2 align-middle inline-block
min-w-full sm:px-6 lg:px-8">
<div class="shadow overflow-hidden
border-b border-gray-200 sm:rounded-lg">
<table class="min-w-full divide-y
divide-gray-200">
<thead class="bg-gray-50">
<tr>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
NISN
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
Nama
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
Kelas
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
Alamat
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
No Telp
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
Tanggal Dibuat
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
Changes
</th>
</tr>
</thead>
<tbody class="bg-white
divide-y divide-gray-200">
{
this.state.data_siswa.map( item => (
<tr>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.nisn}
</div>
</td>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.nama}
</div>
</td>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.kelas.nama_kelas.toUpperCase()}
</div>
<div
class="text-sm text-gray-500">
{item.kelas.kompetensi_keahlian}
</div>
</td>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.alamat}
</div>
</td>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.no_telp}
</div>
</td>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.createdAt}
</div>
</td>
<td class="px-6
py-4 whitespace-nowrap">
<ul
className="flex flex-col md:flex-row items-start md:items-center
text-gray-600 text-sm mt-3">
<li
className="flex items-center mr-3 mt-3 md:mt-0">
<span
className="mr-2">
<button className="bg-indigo-500 text-white active:bg-indigo-600
font-bold uppercase text-sm px-6 py-3 rounded shadow
hover:shadow-lg outline-none focus:outline-none mr-1 mb-1
ease-linear transition-all duration-150"
type="button"
onClick={() => this.updateData(item)}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16
16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459
3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75
2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0
.316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5
1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0
1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1
2.5v11z"/>
</svg>
</button>
</span>
</li>
<li
className="flex items-center mr-3 mt-3 md:mt-0">
<span
className="mr-2">
<button className="bg-red-500 text-white active:bg-red-600
font-bold uppercase text-sm px-6 py-3 rounded shadow
hover:shadow-lg outline-none focus:outline-none mr-1 mb-1
ease-linear transition-all duration-150"
type="button"
onClick={() => this.dropData(item)}>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1
.5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1
.5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0
1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0
0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1
1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5
3V2h11v1h-11z"/>
</svg>
</button>
</span>
</li>
</ul>
</td>
</tr>
)) }
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
)
}
}
export default Siswa;