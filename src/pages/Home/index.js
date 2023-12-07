import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils";

export default function HomePage() {
    const [admin, setAdmin] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/users/admin', {
            withCredentials: true
        })
            .then(res => setAdmin(res.data.data))
            .catch(err => console.log(err))
    }, [])
    const handleLogout = () => {
        removeCookie("token");
        navigate('/');
    }
    return (
        <div className="relative">
            <h1 className="text-2xl font-semibold p-4">Welcome {admin.name} ! </h1>
            <div>
                <button onClick={handleLogout} className="flex items-center gap-3 font-semibold bg-sky-800 p-4 rounded-3xl text-white absolute top-2 right-2 " to="/">
                    <span>Log out</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </button>
            </div>
        </div>
    )
}