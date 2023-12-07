import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
export default function AddProductPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [storage, setStorage] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
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
            .then(res => navigate('/product'))
            .catch(err => console.log(err))
    }
    return (
        <div className="p-4 ">
            <form className="flex flex-col gap-2" onSubmit={handleAddProduct}>
                <h1 className="text-sky-800 text-xl font-semibold mb-2">Add product</h1>
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
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="text"
                        value={storage}
                        onChange={(ev) => setStorage(ev.target.value)}
                    />
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
                    <input
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/4"
                        type="text"
                        value={type}
                        onChange={(ev) => setType(ev.target.value)}
                    />
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
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}