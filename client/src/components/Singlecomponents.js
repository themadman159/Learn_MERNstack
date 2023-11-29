import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import NavBarComponents from './NavBarComponents'
import renderHTML from 'react-render-html'

function Singlecomponents(props) {

    const [blog, setBlog] = useState('')

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_API}/blog/${props.match.params.slug}`
        ).then(response => {
            setBlog(response.data)
        }).catch(err => alert(err))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        document.title = `บทความ`;
        // eslint-disable-next-line
    }, []);

    return (

        <div>
            <div>
                <NavBarComponents />
            </div>
            {blog &&
                <div className="px-40">
                    <section className="py-3">
                        <h2 className="font-bold text-4xl">
                            {blog.title}
                        </h2>
                    </section>
                    <article>
                        <div>
                            {renderHTML(blog.content)}
                        </div>
                    </article>
                    <section className="text-right">
                        <span className="text-muted">ผู้แต่ง {blog.author} , </span>
                        <span className="text-muted">เผยแพร่ {new Date(blog.createdAt).toLocaleDateString()}</span>
                    </section>
                </div>}
        </div>

    )
}

export default Singlecomponents