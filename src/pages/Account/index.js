import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function AccountPage() {
    const [accounts, setAccounts] = useState([]);
    const [total, setTotal] = useState('');
    const [pageSize, setPageSize] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const getPage = (page) => {
        if (page < 1 || page > countPage().length) {
            page = 1;
        }
        axios.get('/users?page=' + page, {
            withCredentials: true
        })
            .then(res => {
                setAccounts(res.data.data);
                setTotal(res.data.totalDoc);
                setPageSize(res.data.pageSize);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getPage(currentPage);
    }, [currentPage])
    const countPage = () => {
        const count = Math.ceil(total / pageSize);
        const result = [];
        for (let i = 1; i <= count; i++) {
            result.push(i);
        }
        return result;
    }

    const handleDeleteAccount = (id) => {
        const isConfirm = window.confirm("Do you want to delete this account?");
        if (isConfirm) {
            axios.delete('/users/' + id, {
                withCredentials: true,
            })
                .then(res => {
                    if (accounts.length < 2) {
                        setCurrentPage(currentPage - 1);
                    }
                    else {
                        getPage(currentPage);
                    }
                    toast.success(res.data.msg)
                })
                .catch(err => toast.error("Update account failured!"));
        }
    }
    return (
        <div className="p-4 h-full relative">
            <h1 className="text-2xl font-semibold text-sky-700 my-4">Accounts</h1>
            {!accounts.length && (
                <h1 className="px-2 py-1">Don't have account</h1>
            )}
            {accounts.length > 0 && (
                <div className="flex justify-between px-6 bg-gray-400 text-black font-semibold rounded-sm">
                    <h1>Name</h1>
                    <h1>Email</h1>
                    <h1>Phone</h1>
                    <h1>Address</h1>
                    <h1>Action</h1>
                </div>
            )}
            {accounts.length > 0 && accounts.map(acc => (
                <div className="flex items-center justify-between p-4 border-b-2" key={acc._id}>
                    <p>{acc.name}</p>
                    <p>{acc.email}</p>
                    <p>{acc.phone}</p>
                    <p>{acc.address}</p>
                    <div className="flex gap-4">
                        <Link className="bg-gray-200 text-sky-900 p-1 rounded-xl outline outline-2" to={"/account/edit/" + acc._id}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </Link>
                        <button className="bg-gray-200 text-red-600 p-1 rounded-xl outline outline-2" onClick={() => handleDeleteAccount(acc._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
            {accounts.length > 0 && (
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
            )}
        </div>
    )
}