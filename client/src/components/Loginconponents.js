import React, { useEffect } from 'react'
import NavBarComponents from './NavBarComponents'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { auth, getUser } from '../service/auth'
import { withRouter } from 'react-router-dom'
function Loginconponents(props) {

    const [state, setState] = useState({
        username: "",
        password: ""
    })

    const { username, password } = state

    useEffect(() => {
        document.title = `เข้าสู่ระบบ`;
        // eslint-disable-next-line
    }, []);

    //set ค่าให้ state 
    const inputValue = name => e => {
        setState({ ...state, [name]: e.target.value })
    }

    //ส่งข้อมูลไปยัง API
    const submitData = (e) => {
        e.preventDefault();
        console.log("API URL", process.env.REACT_APP_API);
        console.table(state);
        // //ยิง req ไปยัง API
        axios.post(
            `${process.env.REACT_APP_API}/login`, { username, password }
        ).then(response => {
            auth(response, () => props.history.push("/create"));
            // console.log(response);
        }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response.data.error,
                showConfirmButton: false,
                timer: 3000
            })
        })
    }

    useEffect(() => {
        getUser() && props.history.push("/")
    }, [])

    return (
        <div>
            <div>
                <NavBarComponents />
                <div class="flex justify-center items-center h-screen">
                    <div class="max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8 white:bg-gray-800 dark:border-gray-700 flex justify-center items-center vh-100 w-auto">
                        <form class="space-y-6" onSubmit={submitData}>
                            <h5 class="text-xl text-gray-900 white:text-white text-center font-bold">ลงชื่อเข้าใช้งาน</h5>
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 white:text-white">กรอกชื่อผู้ใช้</label>
                                <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 white:text-white" placeholder="ชื่อผู้ใช้" required
                                    value={username}
                                    onChange={inputValue("username")}
                                />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 white:text-white">กรอกรหัสผ่าน</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 white:text-white" required
                                    value={password}
                                    onChange={inputValue("password")}
                                />
                            </div>
                            <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">เข้าสู่ระบบ</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Loginconponents)