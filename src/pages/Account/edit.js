import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [account, setAccount] = useState({})
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        axios.get('/users/' + id)
            .then(res => {
                const account = res.data.data;
                setAccount(account);
                setName(account.name);
                setEmail(account.email);
                setPassword(account.password);
                setAdmin(account.admin);
            })
            .catch(err => console.log(err))
    }, [id])
    const handleUpdateAccount = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('admin', admin);
        if (image) {
            formData.append('image', image);
        }
        axios.put('/users/' + id, formData, {
            withCredentials: true
        })
            .then(res => navigate('/account'))
            .catch(err => console.log(err))
    }
    return (
        <div className="p-4 ">
            <form className="flex flex-col gap-2" onSubmit={handleUpdateAccount}>
                <h1 className="text-sky-800 text-xl font-semibold mb-2">Edit {account.name}</h1>
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
                        type="text"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Password</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="text"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                </div>
                <div className="flex gap-4 ">
                    <h1 className="text-sm font-medium w-24">Image</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="file"
                        onChange={(ev) => setImage(ev.target.files[0])}
                    />
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
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}