import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";

export default function CategoryPage() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [total, setTotal] = useState('');
    const [pageSize, setPageSize] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setLoading(true);
        getPage(currentPage);
    }, [currentPage])
    const handleDeleteProduct = (id) => {
        const isConfirm = window.confirm("Do you want to delete this category?");
        if (isConfirm) {
            axios.delete('/categories/' + id, {
                headers: {
                    token: getCookie('token')
                }
            })
                .then(res => {
                    if (categories.length < 2) {
                        setCurrentPage(currentPage - 1);
                    }
                    else {
                        getPage(currentPage);
                    }
                    toast.success(res.data.msg)
                })
                .catch(err => toast.error("Delete category failured!"))
        }
    }

    const getPage = (page) => {
        if (page < 1 || page > countPage().length) {
            page = 1;
        }
        axios.get('/categories?page=' + page, {
            withCredentials: true
        })
            .then(res => {
                setLoading(false);
                setCategories(res.data.data);
                setTotal(res.data.totalDoc);
                setPageSize(res.data.pageSize);
            })
            .catch(err => console.log(err))
    }
    const countPage = () => {
        const count = Math.ceil(total / pageSize);
        const result = [];
        for (let i = 1; i <= count; i++) {
            result.push(i);
        }
        return result;
    }
    return (
        <div className="relative flex justify-center items-center h-full">
            {
                loading ?
                    <BarLoader
                        color="#075985"
                        loading={loading}
                        size={50}
                    /> :
                    <div className="w-full p-4 h-full absolute top-0 left-0">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-sky-700 my-4">Categories</h1>
                            <Link className="flex gap-2 font-medium text-sky-600 " to="/category/add">
                                <span>Add</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </Link>
                        </div>
                        {!categories.length && (
                            <h1 className="px-2 py-1">Don't have category</h1>
                        )}
                        {categories.length > 0 && (
                            <div className="flex justify-between px-6 bg-gray-400 text-black font-semibold rounded-sm">
                                <h1>Name</h1>
                                <h1>Action</h1>
                            </div>
                        )}
                        {categories.length > 0 && categories.map((category) => (
                            <div className="flex items-center justify-between px-4 border-b-2" key={category._id}>
                                <p>{category.name}</p>
                                <div className="flex gap-4 p-3">
                                    <Link className="bg-gray-200 text-sky-900 p-1 rounded-xl outline outline-2" to={"/category/edit/" + category._id}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                    <button className="bg-gray-200 text-red-600 p-1 rounded-xl outline outline-2" onClick={() => handleDeleteProduct(category._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center items-center gap-4 p-2 text-sky-800 absolute bottom-0 left-0 right-0">
                            <button onClick={() => setCurrentPage(prev => {
                                if (prev <= 1) {
                                    return prev;
                                }
                                else {
                                    return prev - 1;
                                }
                            })}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                                </svg>
                            </button>
                            {countPage().slice(currentPage - 1, currentPage + 2).map(page => (
                                <div key={page} className={currentPage === page ?
                                    "bg-gray-400 p-2 rounded-xl text-black font-semibold text-xl cursor-pointer" :
                                    "font-semibold p-2 text-xl cursor-pointer"}
                                    onClick={() => setCurrentPage(page)}>
                                    {page}
                                </div>
                            ))}
                            <button onClick={() => setCurrentPage(prev => {
                                if (prev >= countPage().length) {
                                    return prev;
                                }
                                else {
                                    return prev + 1;
                                }
                            })}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                </svg>
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}