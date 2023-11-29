import React from 'react'
import NavBarComponents from './NavBarComponents'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getToken } from '../service/auth'

function Editblogcomponents(props) {

    const [state, setState] = useState({
        title: "",
        author: "",
        slug: "",
    })

    const { title, author, slug } = state

    const [ content , setContent ] = useState("")
    const submitContent = (e) =>  {
        setContent(e)
    }

    

    //ดึงข้อมูลบทความที่ต้องการแก้ไข
    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_API}/blog/${props.match.params.slug}`
        ).then(response => {
            const { title, content, author, slug } = response.data
            setState({ ...state, title, author, slug })
            setContent(content)
        }).catch(err => alert(err))
        // eslint-disable-next-line
    }, [])

    //set ค่าให้ state 
    const inputValue = name => e => {
        setState({ ...state, [name]: e.target.value })
    }

    //ส่งข้อมูลไปยัง API
    const submitData = (e) => {
        e.preventDefault();
        console.log("API URL", process.env.REACT_APP_API);

        //ยิง req ไปยัง API
        axios.put(
            `${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author } ,
            {
                headers : {
                    Authorization : `Bearer ${getToken()}`
                }
            }
        ).then(response => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'แก้ไขบทความเรียบร้อยแล้ว',
                showConfirmButton: false,
                timer: 3000
            })
            const { title, content, author, slug } = response.data
            setState({ ...state, title, author, slug})
            setContent(content)
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
        
        document.title = `แก้ไขบทความ`;
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <NavBarComponents />
            <div className="grid py-3 w-full px-20">
            <div className='py-3'>
                    <lable className="text-4xl font-bold">แก้ไขบทความ</lable>
                </div>
                <form onSubmit={submitData} className="w-full">
                <div className="mb-6">
                        <label className="block mb-2 text-sm font-bold text-gray-900 white:text-white">
                            แก้ไขชื่อบทความ
                        </label>
                        <input type="text" placeholder="กรอกชื่อบทความ" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focs:ring-blue-500u focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 white:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={title}
                            onChange={inputValue("title")}
                        />
                    </div>
                    <div  className='py-3'>
                        <label className="label">
                            <span className="text-bold">แก้ไขข้อมูลบทความ</span>
                        </label>
                        <ReactQuill
                            value={content}
                            theme='snow'
                            onChange={submitContent}
                            placeholder='เขียนรายละเอียดบทความ'>
                        </ReactQuill>

                    </div>
                    <div className="mb-6">
                    <label>
                            <span>แก้ไขชื่อผู้แต่ง</span>
                        </label>
                        <input type="text" placeholder="กรอกชื่อบทความ" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focs:ring-blue-500u focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 white:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={author}
                            onChange={inputValue("author")}
                        />
                    </div>
                    <div className="py-5">
                        <button class="btn btn-active btn-primary">แก้ไขบทความ</button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default Editblogcomponents