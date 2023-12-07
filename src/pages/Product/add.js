import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify";
export default function AddProductPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [storage, setStorage] = useState('128GB');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('Old');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const handleAddProduct = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('storage', storage);
        formData.append('color', color);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        axios.post('/products/', formData, {
            withCredentials: true
        })
            .then(res => {
                toast.success(res.data.msg)
                navigate('/product');
            })
            .catch(err => "Add product failured!")
    }
    console.log(type)
    return (
        <div className="p-4 ">
            <form className="flex flex-col gap-2" onSubmit={handleAddProduct}>
                <div className="flex items-center gap-2 text-sky-800 text-xl font-semibold mb-2">
                    <Link to="/product">
                        Product
                    </Link>
                    <span>/</span>
                    <h1 className="text-sky-800 text-xl font-semibold">Add product</h1>
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
                <div className="flex gap-4 ">
                    <h1 className="text-sm font-medium w-24">Storage</h1>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <input
                                className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                                type="radio" name="storage" value="128GB" checked={storage === "128GB"}
                                onChange={ev => setStorage(ev.target.value)}
                            />
                            <h1>128GB</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                                type="radio" name="storage" value="256GB" checked={storage === "256GB"}
                                onChange={ev => setStorage(ev.target.value)}
                            />
                            <h1>256GB</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                                type="radio" name="storage" value="512GB" checked={storage === "512GB"}
                                onChange={ev => setStorage(ev.target.value)}
                            />
                            <h1>512GB</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                                type="radio" name="storage" value="1TB" checked={storage === "1TB"}
                                onChange={ev => setStorage(ev.target.value)}
                            />
                            <h1>1TB</h1>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 ">
                    <h1 className="text-sm font-medium w-24">Color</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="text"
                        value={color}
                        onChange={(ev) => setColor(ev.target.value)}
                    />
                </div>
                <div className="flex gap-4 ">
                    <h1 className="text-sm font-medium w-24">Type</h1>
                    <select onChange={(ev => setType(ev.target.value))}>
                        <option value="mobile">iPhone</option>
                        <option value="ipad">iPad</option>
                        <option value="mac">Mac</option>
                    </select>
                </div>
                <div className="flex gap-4 ">
                    <h1 className="text-sm font-medium w-24">Status</h1>
                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <input
                                className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                                type="radio" name="status" value="Old" checked={status === "Old"}
                                onChange={ev => setStatus(ev.target.value)}
                            />
                            <h1>Old</h1>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                                type="radio" name="status" value="New" checked={status === "New"}
                                onChange={ev => setStatus(ev.target.value)}
                            />
                            <h1>New</h1>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Description</h1>
                    <textarea
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        id="description"
                        name="description"
                        rows="4"
                        cols="50"
                        onChange={(ev) => setDescription(ev.target.value)}
                        value={description}
                    >
                    </textarea>
                </div>
                <div className="flex gap-4 ">
                    <h1 className="text-sm font-medium w-24">Price</h1>
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="text"
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
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
                <div>
                    <button className="bg-sky-800 text-white px-4 py-2 rounded-2xl">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    )
}