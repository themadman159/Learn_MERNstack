import React, { useState, useEffect } from 'react'
import NavBarComponents from './NavBarComponents'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { getToken } from '../service/auth'


function Formcomponents() {

    const [state, setState] = useState({
        title: "",
        author: "",
    })

    useEffect(() => {
        document.title = `เขียนบทความ`;
        // eslint-disable-next-line
    }, []);

    const { title, author } = state

    const [ content , setContent ] = useState("")
    const submitContent = (e) =>  {
        setContent(e)
    }

    //set ค่าให้ state 
    const inputValue = name => e => {
        setState({ ...state, [name]: e.target.value })
    }

    //ส่งข้อมูลไปยัง API
    const submitData = (e) => {
        e.preventDefault();
        console.log("API URL" , process.env.REACT_APP_API);

        //ยิง req ไปยัง API
        axios.post(
            `${process.env.REACT_APP_API}/create` , {title , content , author} , 
            {
                headers : {
                    Authorization : `Bearer ${getToken()}`
                }
            }
        ).then(response=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'บันทึกบทความเรียบร้อยแล้ว',
                showConfirmButton: false,
                timer: 3000
            })

            setState({...state, title:"" ,author:"", content: ""})
            setContent("")
        }).catch(err=>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: err.response.data.error,
                showConfirmButton: false,
                timer: 3000
              })
        })
    }

    return (
        <div>
            <NavBarComponents />
            <div className="grid w-full px-20">
                <div className='py-3'>
                    <lable className="text-4xl font-bold">เขียนบทความ</lable>
                </div>
                <form onSubmit={submitData}>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-900 white:text-white">
                            กรอกชื่อบทความ
                        </label>
                        <input type="text" placeholder="กรอกชื่อบทความ" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focs:ring-blue-500u focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 white:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={title}
                            onChange={inputValue("title")}
                        />
                    </div>
                    <div className="mb-6 py-3">
                        <label className="label">
                            <span className="text-bold">กรอกข้อมูลบทความ</span>
                        </label>
                        <ReactQuill
                            value={content}
                            theme='snow'
                            onChange={submitContent}
                            placeholder='เขียนรายละเอียดบทความ'>
                        </ReactQuill>
                    </div>
                    <div className="mb-6">
                        <label className="label">
                            <span>กรอกชื่อผู้แต่ง</span>
                        </label>
                        <input type="text" placeholder="กรอกชื่อบทความ" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focs:ring-blue-500u focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 white:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={author}
                            onChange={inputValue("author")}
                        />
                    </div>
                    <div className="py-5">
                        <button class="btn-primary">เขียนบทความ</button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default Formcomponents