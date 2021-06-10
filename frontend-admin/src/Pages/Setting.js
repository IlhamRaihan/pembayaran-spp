import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { base_url } from "../Config.js";
class Setting extends React.Component{
constructor(){
super()
this.state = {
token: "",
username: "",
nama_petugas: "",
id_petugas: "",
password: "",
level: "",
fillPassword: false
}
// dapetin token dari localstorage
if (localStorage.getItem("token")) {
this.state.token = localStorage.getItem("token")
} else {
// token ga ada, redirect ke laman login
window.location = "/login"
}
}
getUser = () => {
let data = JSON.parse(localStorage.getItem("user"))
this.setState({
id_petugas: data.id_petugas,
username: data.username,
nama_petugas: data.nama_petugas,
level: data.level
})
}
Logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");
window.location = "/login"
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
axios.put(url, form, { headers:{
Authorization: "Bearer " + this.state.token
}})
.then(response => {
alert("Update Success")
this.Logout()
})
.catch(error => console.log(error))
}
componentDidMount(){
this.getUser()
}
render(){
return(
<div>
{/* Page title starts */}
<div className="mt-10 lg:mt-9 container px-6
mx-auto flex flex-col lg:flex-row items-start items-center
justify-between pb-4 border-b border-gray-300">
<div className="mx-auto">
<h4 className="text-2xl font-bold
leading-tight text-gray-800
text-center">{this.state.nama_petugas}</h4>
<ul className="flex flex-col md:flex-row
items-start md:items-center text-gray-600 text-sm mt-3">
<li className="flex items-center mr-3
mt-3 md:mt-0">
<span className="mr-2">
<svg
xmlns="http://www.w3.org/2000/svg" width="17" height="17"
viewBox="0 0 24 24" fill="none" stroke="#000000"
stroke-width="1.5" stroke-linecap="round"
stroke-linejoin="bevel"><rect x="4" y="4" width="16" height="16"
rx="2" ry="2"></rect><rect x="9" y="9" width="6"
height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line
x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9"
y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line
x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23"
y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line
x1="1" y1="14" x2="4" y2="14"></line></svg>
</span>
<span>Username:
{this.state.username}</span>
</li>
<li className="flex items-center mr-3
mt-3 md:mt-0">
<span className="mr-2">
<svg
xmlns="http://www.w3.org/2000/svg" width="17" height="17"
viewBox="0 0 24 24" fill="none" stroke="#000000"
stroke-width="1.5" stroke-linecap="round"
stroke-linejoin="bevel"><circle cx="12" cy="12" r="10"/><path
d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"/></svg>
</span>
<span>Role:
{this.state.level}</span>
</li>
<li className="flex items-center mt-3
md:mt-0">
<span className="mr-2">
<svg
xmlns="http://www.w3.org/2000/svg" width="17" height="17"
viewBox="0 0 24 24" fill="none" stroke="#000000"
stroke-width="1.5" stroke-linecap="round"
stroke-linejoin="bevel"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0
0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline
points="17 11 19 13 23 9"></polyline></svg>
</span>
<span>ID:
{this.state.id_petugas}</span>
</li>
</ul>
</div>
<div className="mt-6">
<Link to="/dashboard">
<button className="mx-2 my-2 bg-white
transition duration-150 ease-in-out focus:outline-none
hover:bg-gray-100 rounded text-indigo-700 px-6 py-2
text-sm">Dashboard</button>
</Link>
<button onClick={() => this.Logout()}
className="transition duration-150 ease-in-out hover:bg-indigo-600
focus:outline-none border bg-indigo-700 rounded text-white px-8
py-2 text-sm">Logout</button>
</div>
</div>
<div className="w-full bg-gray-200
dark:bg-gray-900 py-10">
<div className="container mx-auto px-6 flex
items-start justify-center">
<div className="w-full">
{/* Card code block start */}
<div className="flex flex-col
lg:flex-row mx-auto w-full bg-white dark:bg-gray-800 shadow
rounded">
<div className="w-full p-6
border-t border-b lg:border-t-0 lg:border-b-0 sm:border-l
sm:border-r border-gray-300">
<h4 className="text-2xl
font-bold leading-tight text-gray-800 text-center mb-5">
Ubah Profile Anda
</h4>
<div className="mt-6 mb-8
w-full bg-gray-100 dark:bg-gray-700 rounded p-4 relative
break-words">
<div className="relative
p-6 flex-auto">
<div class="mt-10
sm:mt-0">
<div
class="md:grid md:grid-cols-3 md:gap-6">
<div
class="md:col-span-1">
<div
class="px-4 sm:px-0">
<h3
class="text-lg font-medium leading-6 text-gray-900">UPDATE
Admin/Petugas</h3>
<p
class="mt-1 text-sm text-gray-600">
Gunakan untuk menambah petugas maupun admin<br/><br/>
Syarat
Penggunaan: <br/>
-
Wajib memasukan semua kolom <br/>
-
Pilih level sesuka anda
</p>
</div>
</div>
<div
class="mt-5 md:mt-0 md:col-span-2">
<form
method="POST" onSubmit={ev => this.save(ev)}>
<div
class="shadow overflow-hidden sm:rounded-md">
<div class="px-4 py-5 bg-white sm:p-6">
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
{ this.state.fillPassword === false ? (
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
<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
</div>
</div>
</div>
</div>
)
}
}
export default Setting;