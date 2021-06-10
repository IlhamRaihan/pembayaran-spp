import React from "react";
import axios from "axios";
import { base_url } from "../Config.js";
import { Link } from "react-router-dom";

// components
import Tabs from '../Components/Tabs'
import RIWAYAT_PEMBAYARAN from '../Components/Table_Riwayat_Pembayaran'
import Kelas from '../Components/Table_Kelas'
import Petugas from '../Components/Table_Petugas'
import Siswa from '../Components/Table_Siswa'
import Spp from '../Components/Table_Spp'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            userData: "",
            data_pembayaran: [],
            data_petugas: [],
            data_siswa: [],
            data_kelas: [],
            message: "",
            found: ""
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
        let userdata = JSON.parse(localStorage.getItem("user"))
        this.setState({
            userData: userdata
        })
    }

    getDataPembayaran = () => {
        let url = base_url + "/pembayaran"

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
                let data_pembayaran = JSON.parse(JSON.stringify(response.data.pembayaran))
                
                this.setState({
                    data_pembayaran: data_pembayaran
                })
            } else {
                this.setState({
                    message: response.data.message
                })
            }
        })
        .catch(error => console.log(error))
    }

    getDataPetugas = () => {
        let url = base_url + "/petugas"

        axios.get(url,{
            headers:{ 
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(response => {
            let data_petugas = JSON.parse(JSON.stringify(response.data.petugas))
            this.setState({
                data_petugas: data_petugas
            })
        })
        .catch(error => console.log(error))
    }

    getDataSiswa = () => {
        let url = base_url + "/siswa"

        axios.get(url,{
            headers:{ 
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(response => {
            let data_siswa = JSON.parse(JSON.stringify(response.data.siswa))
            this.setState({
                data_siswa: data_siswa
            })
        })
        .catch(error => console.log(error))
    }

    getDataKelas = () => {
        let url = base_url + "/kelas"

        axios.get(url,{
            headers:{ 
                Authorization: "Bearer " + this.state.token
            }
        })
        .then(response => {
            let data_kelas = JSON.parse(JSON.stringify(response.data.kelas))
            this.setState({
                data_kelas: data_kelas
            })
        })
        .catch(error => console.log(error))
    }

    Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location = "/login"
    }

    componentDidMount(){
        this.getUser()
        this.getDataPembayaran()
        this.getDataPetugas()
        this.getDataSiswa()
        this.getDataKelas()
    }
    render(){
        return(
            <div>
                {/* Page title starts */}
                <div className="mt-10 lg:mt-9 container px-6 mx-auto flex flex-col lg:flex-row items-start items-center justify-between pb-4 border-b border-gray-300">
                    <div className="mx-auto">
                        <h4 className="text-2xl font-bold leading-tight text-gray-800 text-center">{this.state.userData.nama_petugas}</h4>
                        <ul className="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
                            <li className="flex items-center mr-3 mt-3 md:mt-0">
                                <span className="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="bevel"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                                </span>
                                <span>Username: {this.state.userData.username}</span>
                            </li>
                            <li className="flex items-center mr-3 mt-3 md:mt-0">
                                <span className="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="bevel"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"/></svg>
                                </span>
                                <span>Role: {this.state.userData.level}</span>
                            </li>
                            <li className="flex items-center mt-3 md:mt-0">
                                <span className="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="bevel"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                                </span>
                                <span>ID: {this.state.userData.id_petugas}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-6">
                        <Link to="/setting">
                            <button className="mx-2 my-2 bg-white transition duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 text-sm">Setting</button>
                        </Link>
                        <button onClick={() => this.Logout()} className="transition duration-150 ease-in-out hover:bg-indigo-600 focus:outline-none border bg-indigo-700 rounded text-white px-8 py-2 text-sm">Logout</button>
                    </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-900 py-10">
                    <div className="container mx-auto px-6 flex items-start justify-center">
                        <div className="w-full">
                            {/* Card code block start */}
                            <div className="flex flex-col lg:flex-row mx-auto w-full bg-white dark:bg-gray-800 shadow rounded">
                                <div className="w-full p-6 border-t border-b lg:border-t-0 lg:border-b-0 sm:border-l sm:border-r border-gray-300">
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                                        <div className="mt-3 text-xl text-center w-full bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">
                                            Jumlah Transaksi: {this.state.data_pembayaran.length}
                                        </div>
                                        <div className="mt-3 text-xl text-center w-full bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">
                                            Jumlah Siswa: {this.state.data_siswa.length}
                                        </div>
                                        <div className="mt-3 text-xl text-center w-full bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">
                                            Jumlah Petugas: {this.state.data_petugas.length}
                                        </div>
                                        <div className="mt-3 text-xl text-center w-full bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3">
                                            Jumlah Kelas: {this.state.data_kelas.length}
                                        </div>
                                    </div>
                                    <div className="mt-6 mb-8 w-full bg-gray-100 dark:bg-gray-700 rounded p-4 relative break-words">
                                        <h4 className="text-2xl font-bold leading-tight text-gray-800 mb-4">Data lengkap {this.state.userData.level}: </h4>
                                        <ul>
                                            <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- ID {this.state.userData.level}: {this.state.userData.id_petugas}</li>
                                            <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- Username: {this.state.userData.username}</li>
                                            <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- Nama: {this.state.userData.nama_petugas}</li>
                                            <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- Role: {this.state.userData.level}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-900 pb-10">
                    <div className="container mx-auto px-6 flex items-start justify-center">
                        <div className="w-full">
                            {/* Tabs 1 */}
                            <h4 className="text-2xl font-bold leading-tight text-gray-800">Admin Tabs</h4>
                            <Tabs color="indigo" title1="Petugas" tab1={(
                                <Petugas/>
                            )}
                            title2="Siswa" tab2={(
                                <Siswa/>
                            )}
                            title3="Tabs3" tab3={(
                                <div className="mt-6 mb-8 w-full bg-gray-100 dark:bg-gray-700 rounded p-4 relative break-words">
                                    <div className="relative p-6 flex-auto">
                                        <div class="mt-10 sm:mt-0">
                                            <div class="px-4 sm:px-0">
                                                <h3 class="text-lg font-medium leading-6 text-gray-900">Lorem Ipsum</h3>
                                                <p class="mt-1 text-sm text-gray-600 text-justify">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos 
                                                sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                                recusandae alias error harum maxime adipisci amet laborum. Perspiciatis 
                                                minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit 
                                                quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur 
                                                fugiat, temporibus enim commodi iusto libero magni deleniti quod quam 
                                                consequuntur! Commodi minima excepturi repudiandae velit hic maxime
                                                doloremque. Quaerat provident commodi consectetur veniam similique ad 
                                                earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo 
                                                fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore 
                                                suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantium
                                                modi minima sunt esse temporibus sint culpa, recusandae aliquam numquam 
                                                totam ratione voluptas quod exercitationem fuga. Possimus quis earum veniam 
                                                quasi aliquam eligendi, placeat qui corporis!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            />

                            {/* Tabs 2 */}
                            <h4 className="text-2xl font-bold leading-tight text-gray-800">Siswa Tabs</h4>
                            <Tabs color="indigo" title1="Riwayat Pembayaran" tab1={(
                                <RIWAYAT_PEMBAYARAN/>
                            )} 
                            
                            title2="Kelas" tab2={(
                                <Kelas/>
                            )}  
                            
                            title3="SPP" tab3={
                                <Spp/>
                            }/>
                             <div className="text-center mt-4">
                                <button type="button" className="text-gray-800 text-sm" onClick={() => this.Logout()}>Kembali ke halaman login</button>
                                <p className="text-gray-500 text-sm">Hello World! | <a href="https://github.com/wisnusat" target="_blank" rel="noreferrer">It's me Wisnu</a></p>
                                <p className="text-gray-500 text-sm">&copy;2021</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;