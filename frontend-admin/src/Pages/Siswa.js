import React from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import { base_url } from "../Config.js";

// components
import Alert from '../Components/Alert'

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            nisn: "",
            data_siswa: "",
            data_spp: "",
            data_pembayaran: [],
            data_kelas: "",
            message: "",
            found: ""
        }
    }

    getData = () => {
        let nisn = '/' + this.props.match.params.nisn
        let url = base_url + "/siswa" + nisn;

        axios.get(url)
        .then(response => {
            this.setState({
                found: response.data.found
            })

            if(this.state.found){
                let siswa = response.data.data_siswa
                let kelas = siswa.kelas
                let spp = siswa.spp
                let pembayaran = siswa.pembayaran
                
                this.setState({
                    data_siswa: siswa,
                    data_spp: spp,
                    data_pembayaran: pembayaran,
                    data_kelas: kelas,
                    nisn: siswa.nisn,
                    message: response.data.message
                })
            } else {
                this.setState({
                    message: response.data.message
                })
            }
        })
        .catch(error => console.log(error))
    }

    componentDidMount(){
        if(!this.props.match.params.nisn){
            window.location = '/login'
        }
        this.getData()
    }

    render(){
        return(
            <>
                {/* Page title starts */}
                { this.state.found ? (
                <>
                    <div className="mt-6 lg:mt-9 container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between pb-4 border-b border-gray-300">
                        <div className="mx-auto">
                            <h4 className="text-2xl font-bold leading-tight text-gray-800 text-center">{this.state.data_siswa.nama}</h4>
                            <ul className="flex flex-col md:flex-row items-start md:items-center text-gray-600 text-sm mt-3">
                                <li className="flex items-center mr-3 mt-3 md:mt-0">
                                    <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="bevel"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                                    </span>
                                    <span>{this.state.data_kelas.nama_kelas}</span>
                                </li>
                                <li className="flex items-center mr-3 mt-3 md:mt-0">
                                    <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="bevel"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"/></svg>
                                    </span>
                                    <span>{this.state.data_kelas.kompetensi_keahlian}</span>
                                </li>
                                <li className="flex items-center mt-3 md:mt-0">
                                    <span className="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="bevel"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
                                    </span>
                                    <span>NISN: {this.state.nisn}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-900 py-10">
                        <div className="container mx-auto px-6 flex items-start justify-center">
                            <div className="w-full">
                                {/* Card is full width. Use in 12 col grid for best view. */}
                                {/* Card code block start */}
                                <div className="flex flex-col lg:flex-row mx-auto w-full bg-white dark:bg-gray-800 shadow rounded">
                                    <div className="w-full p-6 border-t border-b lg:border-t-0 lg:border-b-0 sm:border-l sm:border-r border-gray-300">
                                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                                            <div className="text-xl text-center w-full bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">
                                                SPP Tahun {this.state.data_spp.tahun} || Rp {this.state.data_spp.nominal}
                                                </div>
                                            <div className="mt-4 text-center w-full lg:mt-0 text-xl bg-red-200 text-red-500 rounded font-medium p-3">
                                                Sisa Saldo || Rp{ this.state.sisa }
                                                </div>
                                        </div>
                                        <div className="mt-6 mb-8 w-full bg-gray-100 dark:bg-gray-700 rounded p-4 relative">
                                            <h4 className="text-2xl font-bold leading-tight text-gray-800 mb-4">Data Lengkap Siswa: </h4>
                                            <ul>
                                                <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- NISN: {this.state.nisn}</li>
                                                <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- NIS: {this.state.data_siswa.nis}</li>
                                                <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- Nama: {this.state.data_siswa.nama}</li>
                                                <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- Nomor Telepon: {this.state.data_siswa.no_telp}</li>
                                                <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- Alamat: {this.state.data_siswa.alamat}</li>
                                                <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- Nama Kelas: {this.state.data_kelas.nama_kelas}</li>
                                                <li className="text-md text-gray-600 dark:text-gray-400 font-normal tracking-normal my-2">- Jurusan: {this.state.data_kelas.kompetensi_keahlian}</li>
                                            </ul>
                                        </div>
                                        
                                        {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
                                        {this.state.data_pembayaran.length ? (
                                            <>
                                                <h4 className="text-2xl font-bold leading-tight text-gray-800 text-center mb-8">Riwayat Pembayaran</h4>
                                                <div class="flex flex-col">
                                                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                                <table class="min-w-full divide-y divide-gray-200">
                                                                    <thead class="bg-gray-50">
                                                                        <tr>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Tanggal
                                                                        </th>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Jumlah Bayar
                                                                        </th>
                                                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                            Auditor
                                                                        </th>
                                                                        <th scope="col" class="relative px-6 py-3">
                                                                            <span class="sr-only">Sign</span>
                                                                        </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody class="bg-white divide-y divide-gray-200">
                                                                        { this.state.data_pembayaran.map( item => (
                                                                            <tr>
                                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                                <div class="text-sm text-gray-900">
                                                                                    {item.tgl_bayar}
                                                                                    </div>
                                                                            </td>
                                                                            <td class="px-6 py-4 whitespace-nowrap">
                                                                                { item.jumlah_bayar >= item.spp.nominal ? (
                                                                                <>
                                                                                    { item.jumlah_bayar === item.spp.nominal ? (
                                                                                        <div class="text-sm text-gray-900">
                                                                                            Rp{ item.jumlah_bayar }
                                                                                        </div>
                                                                                    ) :
                                                                                    <>
                                                                                        <div class="text-sm text-gray-900">
                                                                                            Rp{ item.jumlah_bayar} - Rp{item.spp.nominal}
                                                                                        </div>
                                                                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                                        Sisa: Rp{item.jumlah_bayar - item.spp.nominal}
                                                                                        </span>
                                                                                    </>
                                                                                    }
                                                                                </>
                                                                                ) :
                                                                                <> 
                                                                                    <div class="text-sm text-gray-900">
                                                                                        Rp{ item.jumlah_bayar} - Rp{item.spp.nominal}
                                                                                    </div>
                                                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                                        Kurang: Rp{item.spp.nominal - item.jumlah_bayar}
                                                                                    </span>
                                                                                </>
                                                                                }
                                                                                
                                                                            </td>
                                                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                                {item.petugas.nama_petugas}
                                                                            </td>
                                                                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                                { item.jumlah_bayar < item.spp.nominal ? (
                                                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                                        Belum Lunas
                                                                                    </span>
                                                                                ) : 
                                                                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                                    Lunas
                                                                                </span>
                                                                                }
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
                                        ) :
                                            <h4 className="text-2xl font-bold leading-tight text-gray-800 text-center mb-8">Tidak Ada Riwayat Pembayaran</h4>
                                        }
                                        <div className="text-center mt-4">
                                            <Link className="text-gray-600 text-sm" to="/login">Kembali ke halaman login</Link>
                                        </div>
                                    </div>
                                </div>
                                <Alert color="green" rounded="rounded-b-lg">
                                    {this.state.message}
                                </Alert>
                            </div>
                        </div>
                    </div>
                </>
                ) : 
                <div className="w-full bg-gray-200 dark:bg-gray-900 py-10">
                        <div className="container mx-auto px-6 flex items-start justify-center">
                            <div className="w-full">
                                {/* Card is full width. Use in 12 col grid for best view. */}
                                {/* Card code block start */}
                                <div className="flex flex-col lg:flex-row mx-auto w-full bg-white dark:bg-gray-800 shadow rounded">
                                    <div className="w-full p-6 border-t border-b lg:border-t-0 lg:border-b-0 sm:border-l sm:border-r border-gray-300">
                                        <div className="mt-6 mb-8 w-full rounded p-4 relative text-center">
                                            <h4 className="text-2xl font-bold leading-tight text-dark-800">
                                                Data Tidak di Temukan!
                                            </h4>
                                            <Link className="text-gray-600 text-sm" to="/login">Kembali ke halaman login</Link>
                                        </div>
                                    </div>
                                </div>
                                <Alert color="red" rounded="rounded-b-lg">
                                    {this.state.message}
                                </Alert>
                                {/* Card code block end */}
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default Dashboard;