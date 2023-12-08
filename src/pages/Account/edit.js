import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify";

export default function EditProductPage() {
    const { id } = useParams();
    const [account, setAccount] = useState({})
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [image, setImage] = useState('');
    const [admin, setAdmin] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const loadAccount = () => {
        axios.get('/users/' + id, {
            withCredentials: true
        })
            .then(res => {
                const account = res.data.data;
                setAccount(account);
                setName(account.name);
                setEmail(account.email);
                setPassword(account.password);
                setPhone(account.phone);
                setAddress(account.address);
                setAdmin(account.admin);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        loadAccount();
    }, [id])
    const handleUpdateAccount = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', newPassword);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('admin', admin);
        if (image) {
            formData.append('image', image);
        }
        axios.put('/users/' + id, formData, {
            withCredentials: true
        })
            .then(res => {
                loadAccount();
                toast.success(res.data.msg);
                setNewPassword('');
            })
            .catch(err => toast.error("Update account failured!"))
    }
    return (
        <div className="p-4 ">
            <form className="flex flex-col gap-2" onSubmit={handleUpdateAccount}>
                <div className="flex items-center gap-2 text-sky-800 text-xl font-semibold mb-2">
                    <Link to="/account">
                        Account
                    </Link>
                    <span>/</span>
                    <div>
                        Edit {account.name}</div>
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Name</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="text"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Email</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Phone</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="text"
                        value={phone}
                        onChange={(ev) => setPhone(ev.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Address</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="text"
                        value={address}
                        onChange={(ev) => setAddress(ev.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Password</h1>
                    <input
                        className=" opacity-80 px-2 py-1 w-1/4"
                        type="password"
                        value={password}
                        disabled
                    />
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">New Password</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="password"
                        value={newPassword}
                        onChange={(ev) => setNewPassword(ev.target.value)}
                    />
                </div>
                <div className="flex gap-4 ">
                    <h1 className="text-sm font-medium w-24">Update avatar</h1>
                    <label for="file" className="flex flex-col gap-2 rounded-xl items-center bg-gray-200 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                        </svg>
                        <span>
                            Choose an image
                        </span>
                    </label>
                    <input
                        className="hidden"
                        type="file"
                        id="file"
                        onChange={(ev) => setImage(ev.target.files[0])}
                    />
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Avatar</h1>
                    {account.image === "null"
                        ? <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <p>No image</p>
                        </div>
                        :
                        <img src={"http://localhost:4000/api/v1/images/" + account.image} alt="avatar" width="120px" height="120px" />}
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Admin</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1"
                        type="checkbox"
                        checked={admin}
                        onChange={() => setAdmin(!admin)}
                    />
                </div>
                <div>
                    <button className="bg-sky-800 text-white px-4 py-2 rounded-2xl">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}