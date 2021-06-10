import React from "react";
import axios from "axios";
import { base_url } from "../Config.js";

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "admin",
            password: "admin",
            level: "admin",
            nisn: "12345",
            message: "",
            logged: true,
            token: ""
        }
        // dapetin token dari localstorage
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            window.location = "/"
        }
    }

    FindSiswa = event => {
        event.preventDefault() // menghilangkan effect refreshpage
        let nisn = '/' + this.state.nisn
        window.location = '/siswa' + nisn
    }

    Login = event => {
        event.preventDefault() // menghilangkan effect refreshpage

        let data = {
            username: this.state.username,
            password: this.state.password,
            level: this.state.level
        }

        let url = base_url + "/auth"

        axios.post(url, data)
        .then(response => {
            this.setState({
                logged: response.data.logged
            })
            if(this.state.logged){
                let user = response.data.data
                let token = response.data.token

                // set to local storage
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)

                // redirect
                // this.props.history.push("/dashboard")
                window.location = '/dashboard'
            } else {
                this.setState({
                    message: response.data.message
                })
            }
        })
        .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="login">
                <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div class="max-w-md w-full space-y-8">
                        <div>
                            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
                            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                { this.state.level !== "siswa" ? (
                                    <div>
                                        Sign in to your account
                                    </div>
                                ) : 
                                    <div>
                                        Search your data
                                    </div>
                                }
                            </h2>
                            { !this.state.logged ? (
                                    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-5 text-center" role="alert">
                                        <strong class="font-bold">Oops! </strong>
                                        <span class="block sm:inline">{ this.state.message }</span>
                                    </div>
                            ) : null }
                        </div>
                        <form class="mt-8 space-y-6" onSubmit= { this.state.level !== "siswa" ?  ev => this.Login(ev) : ev => this.FindSiswa(ev) }>
                            <input type="hidden" name="remember" value="true"/>
                            <div class="rounded-md shadow-sm -space-y-px">
                                <select required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={this.state.level} onChange={ ev => this.setState({ level: ev.target.value }) }>
                                    <optgroup label="Select Role:">
                                        <option value="siswa" >Siswa</option>
                                        <option value="admin" >Admin</option>
                                        <option value="petugas" >Petugas</option>
                                    </optgroup>
                                </select>
                                { this.state.level !== "siswa" ? (
                                    <div>
                                        <div>
                                            <label for="username" class="sr-only">Username</label>
                                            <input id="username" name="username" type="username" autocomplete="username" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username"
                                            value={ this.state.username } onChange={ ev => this.setState({ username: ev.target.value }) }/>
                                        </div>
                                        <div>
                                            <label for="password" class="sr-only">Password</label>
                                            <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"
                                            value={ this.state.password } onChange={ ev => this.setState({ password: ev.target.value }) }/>
                                        </div>
                                    </div>
                                ) : 
                                <div>
                                    <label for="nisn" class="sr-only">nisn</label>
                                    <input id="nisn" name="nisn" type="number" autocomplete="nisn" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="NISN"
                                    value={ this.state.nisn } onChange={ ev => this.setState({ nisn: ev.target.value }) }/>
                                </div>
                                }
                            </div>
                            { this.state.level !== "siswa" ? (
                            <div>
                                <div>
                                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                            {/* <!-- Heroicon name: solid/lock-closed --> */}
                                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                        Sign in
                                    </button>
                                </div>
                            </div>
                            ) : 
                                <div>
                                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                            {/* <!-- Heroicon name: solid/lock-closed --> */}
                                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                        Search Data
                                    </button>
                                </div> 
                            }
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;