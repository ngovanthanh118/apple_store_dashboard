import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";
export default function CommentPage() {
    const [loading, setLoading] = useState(false);
    const [comments, setcomments] = useState([]);
    const [total, setTotal] = useState('');
    const [pageSize, setPageSize] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        setLoading(true);
        getPage(currentPage);
    }, [currentPage])

    const getPage = (page) => {
        if (page < 1 || page > countPage().length) {
            page = 1;
        }
        axios.get('/comments?page=' + page, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                setcomments(res.data.data);
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
        <div className="flex justify-center items-center h-full overflow-hidden relative">
            {
                loading ?
                    <BarLoader
                        color="#075985"
                        loading={loading}
                        size={50}
                    /> :
                    <div className="w-full p-4 h-full">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-sky-700 my-4">Bình luận</h1>
                        </div>
                        {!comments.length && (
                            <h1 className="px-2 py-1">Không tồn tại bình luận nào</h1>
                        )}
                        {comments.length > 0 && (
                            <div className="h-full overflow-y-auto">
                                <div className="grid grid-cols-3 px-6 bg-gray-400 text-black font-semibold rounded-sm">
                                    <h1>Nội dung</h1>
                                    <h1>Thời gian</h1>
                                    <h1 className="text-right">Hành động</h1>
                                </div>
                                {comments.map((order) => (
                                    <div className="grid grid-cols-3 px-4 border-b-2 py-2" key={order._id}>
                                        <p className="flex items-center">{order.content}</p>
                                        <p className="flex items-center">{order.createdAt}</p>
                                        <div className="flex justify-end items-center gap-4 px-2">
                                            <Link className="bg-gray-200 text-sky-900 p-1 rounded-xl outline outline-2" to={"/comment/" + order._id}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="-3.5 0 32 32"
                                                    fill="#000000"
                                                >
                                                    <path d="M12.406 13.844c1.188 0 2.156.969 2.156 2.156s-.969 2.125-2.156 2.125-2.125-.938-2.125-2.125.938-2.156 2.125-2.156zm0-5.313c7.063 0 12.156 6.625 12.156 6.625.344.438.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625S.25 16.812.25 16.812c-.344-.438-.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zm0 12.813c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344S7.062 13.062 7.062 16s2.406 5.344 5.344 5.344z"></path>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-center items-center gap-4 p-2 text-sky-800 absolute bottom-0 inset-x-0">
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
                                    "bg-gray-300 px-2 rounded-xl text-black font-semibold text-base cursor-pointer" :
                                    "font-semibold px-2 text-base cursor-pointer"}
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