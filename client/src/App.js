import './App.css';
import NavBarComponents from "./components/NavBarComponents"
import axios from 'axios'
import { useEffect, useState } from 'react';
import swal from 'sweetalert2'
import renderHTML from 'react-render-html'
import { getUser } from './service/auth';
import { getToken } from './service/auth';

function App() {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    document.title = `หน้าแรก`;
    // eslint-disable-next-line
  }, []);

  const fetchData = () => {
    axios.get(
      `${process.env.REACT_APP_API}/blogs`
    ).then(response => {
      setBlogs(response.data)
    }).catch(err => alert(err));
  }

  useEffect(() => {
    fetchData()
  }, [])

  const confirmdelete = (slug, title) => {
    swal.fire({
      title: "ต้องการลบบทความ",
      text: `คุณต้องการลบบทความ ${title} ใช่หรือไม่ `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteblog(slug, title)
      }
    });
  }

  const deleteblog = (slug, title) => {
    axios.delete(
      `${process.env.REACT_APP_API}/blog/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    ).then(response => {
      swal.fire({
        title: "ลบบทความเรียบร้อยแล้ว",
        text: `บทความ ${title} ได้ถูกลบเรียบร้อยแล้ว`,
        icon: "success"
      });
      fetchData()
    }).catch(err => console.log(err))

  }

  return (
    <div>
      <header>
        <NavBarComponents />
      </header>

      {blogs.map((blog, index) => (
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index}>
          <div id="defaultTabContent">
            <div class="p-4 bg-white rounded-lg md:p-8 white:bg-gray-800" id="about" role="tabpanel" aria-labelledby="about-tab">
              <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-dark-900 white:text-white">{blog.title}</h2>
              <p class="mb-3 text-gray-500 dark:text-gray-400">{renderHTML(blog.content.substring(0, 200))}</p>
              <a href={`/blog/${blog.slug}`} class="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700">
                อ่านต่อ
                <svg class=" w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                </svg>
              </a>
              {getUser() && (<div className="px-3 flex justify-end">
                <a href={`/blog/edit/${blog.slug}`} className="btn-edit">แก้ไขบทความ</a>
                <button type="button" onClick={() => confirmdelete(blog.slug, blog.title)} class="btn-delete">ลบบทความ</button>
              </div>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
