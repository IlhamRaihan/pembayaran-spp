import React from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { base_url } from "../Config.js";
class Petugas extends React.Component{
constructor(){
super()
this.state = {
modal: "hidden",
id_petugas: "",
level: "",
nama_petugas: "",
username: "",
password: "",
fillPassword: true,
action: "",
token: "",
id: "",
data_petugas: [],
message: "",
found: ""
}
// dapetin token dari localstorage
if (localStorage.getItem("token")) {
this.state.token = localStorage.getItem("token")
this.state.id =
JSON.parse(localStorage.getItem("user")).id_petugas
} else {
// token ga ada, redirect ke laman login
window.location = "/login"
}
}
getDataPetugas = () => {
let url = base_url + "/petugas"
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
let data_petugas =
JSON.parse(JSON.stringify(response.data.petugas))
this.setState({
data_petugas: data_petugas
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
username: "",
password: "",
nama_petugas: "",
level: "admin",
fillPassword: true
})
}
updateData = (selectedItem) => {
this.toggleModal(true)
this.setState({
action: "update",
id_petugas: selectedItem.id_petugas,
username: selectedItem.username,
password: "",
nama_petugas: selectedItem.nama_petugas,
level: selectedItem.level,
fillPassword: false
})
}
dropData = (selectedItem) => {
if (window.confirm("Yakin nih dihapus?")) {
let url = base_url + "/petugas/" +
selectedItem.id_petugas
axios.delete(url,{
headers:{
Authorization: "Bearer " + this.state.token
}
})
.then(response => {
this.getDataPetugas()
})
.catch(error => console.log(error))
}
}
save = event => {
event.preventDefault()
let form;
if (this.state.fillPassword) {
form = {
id_petugas: this.state.id_petugas,
username: this.state.username,
nama_petugas: this.state.nama_petugas,
level: this.state.level,
password: this.state.password
}
} else {
form = {
id_petugas: this.state.id_petugas,
username: this.state.username,
nama_petugas: this.state.nama_petugas,
level: this.state.level
}
}
let url = base_url + "/petugas"
if (this.state.action === "add") {
axios.post(url, form, { headers:{
Authorization: "Bearer " + this.state.token
}})
.then(response => {
this.getDataPetugas()
})
.catch(error => console.log("catch"))
} else if(this.state.action === "update"){
axios.put(url, form, { headers:{
Authorization: "Bearer " + this.state.token
}})
.then(response => {
this.getDataPetugas()
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
this.getDataPetugas()
}
render(){
return(
<>
<div className="mx-auto flex flex-row items-start
items-center justify-between pb-4 border-b border-gray-300">
<div className="mx-auto">
<div className="flex flex-col md:flex-row
items-start md:items-center text-gray-600 text-sm">
<div className="flex items-center">
<h4 className="text-2xl font-bold
leading-tight text-gray-800 text-center">Tabel Daftar Admin</h4>
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
text-gray-900">{this.state.action.toUpperCase()}
Admin/Petugas</h3>
<p
class="mt-1 text-sm text-gray-600">
Gunakan
untuk {this.state.action.toUpperCase()} petugas maupun
admin<br/><br/>
Syarat
Penggunaan: <br/>
- Wajib
memasukan semua kolom <br/>
- Pilih
level sesuka anda
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
<label for="nama_petugas" class="block text-sm font-medium
text-gray-700">Nama Admin / Petugas</label>
<input type="text" name="nama_petugas" id="nama_petugas"
autocomplete="nama_petugas"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.nama_petugas}
onChange={ev => this.setState({nama_petugas: ev.target.value})}
required/>
</div>
<div class="col-span-6 sm:col-span-3">
<label for="username" class="block text-sm font-medium
text-gray-700">Username</label>
<input type="text" name="username" id="username"
autocomplete="username"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.username}
onChange={ev => this.setState({username: ev.target.value})}
required/>
</div>
{ this.state.action === "update" && this.state.fillPassword ===
false ? (
<div class="col-span-6 sm:col-span-3">
<label for="password" class="block text-sm font-medium
text-gray-700">Password</label>
<button className="inline-flex justify-center py-2 px-4 border
border-transparent shadow-sm text-sm font-medium rounded-md
text-white bg-indigo-600 hover:bg-indigo-800 focus:outline-none
focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
type="button"
onClick={() => this.setState({fillPassword: true})}>
Change Password
</button>
</div>
) : (
<div class="col-span-6 sm:col-span-3">
<label for="password" class="block text-sm font-medium
text-gray-700">Password</label>
<input type="password" name="password" id="password"
autocomplete="password"
class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block
w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
value={this.state.password} placeholder="**********"
onChange={ev => this.setState({password: ev.target.value})}
required/>
</div>
)}
<div class="col-span-6 sm:col-span-3">
<label for="level" class="block text-sm font-medium
text-gray-700">Role / Level ({this.state.level})</label>
<select id="level" name="level"
class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white
rounded-md shadow-sm focus:outline-none focus:ring-indigo-500
focus:border-indigo-500 sm:text-sm"
value={this.state.level}
onChange={ ev => this.setState({ level: ev.target.value }) }>
<option value="admin">Admin</option>
<option value="petugas">Petugas</option>
</select>
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
ID
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
Username/nama
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
Role
</th>
<th scope="col"
class="px-6 py-3 text-left text-xs font-medium text-gray-500
uppercase tracking-wider">
Password
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
this.state.data_petugas.map( item => (
<tr>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.id_petugas}
</div>
</td>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.username}
</div>
<div
class="text-sm text-gray-500">
Nama:
{item.nama_petugas}
</div>
</td>
<td class="px-6
py-4 whitespace-nowrap">
{ item.level
=== "admin" ? (
<span
class="px-2 inline-flex text-xs leading-5 font-semibold
rounded-full bg-green-100 text-green-800">
{item.level}
</span>
) :
<span
class="px-2 inline-flex text-xs leading-5 font-semibold
rounded-full bg-red-100 text-red-800">
{item.level}
</span>
}
</td>
<td class="px-6
py-4 whitespace-nowrap">
<div
class="text-sm text-gray-900">
{item.password}
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
<div
class="text-sm text-gray-900">
{item.id_petugas === this.state.id ? (
<Link
to="/setting">
<span class="px-2 inline-flex text-xs leading-5 font-semibold
rounded-full bg-yellow-100 text-yellow-800">
Anda memakai akun ini!
</span>
</Link>
):
<>
<ul
className="flex flex-col md:flex-row items-start md:items-center
text-gray-600 text-sm mt-3">
<li className="flex items-center mr-3 mt-3 md:mt-0">
<span className="mr-2">
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
<li className="flex items-center mr-3 mt-3 md:mt-0">
<span className="mr-2">
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
</>
}
</div>
</td>
</tr>
)) }
</tbody>
</table>
</div>
</div>
</div>
</div>
</>
)
}
}
export default Petugas;