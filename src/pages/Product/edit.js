import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [name, setName] = useState('');
    const [storage, setStorage] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    useEffect(() => {
        axios.get('/products/' + id, {
            withCredentials: true,
        })
            .then(res => {
                const product = res.data.data;
                setProduct(product);
                setName(product.name);
                setStorage(product.storage);
                setColor(product.color);
                setType(product.type);
                setDescription(product.description);
                setPrice(product.price);
            })
            .catch(err => console.log(err))
    }, [id])
    const handleUpdateProduct = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('storage', storage);
        formData.append('color', color);
        formData.append('type', type);
        formData.append('description', description);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }
        axios.put('/products/' + id, formData, {
            withCredentials: true
        })
            .then(res => navigate('/product'))
            .catch(err => console.log(err))
    }
    return (
        <div className="p-4 ">
            <form className="flex flex-col gap-2" onSubmit={handleUpdateProduct}>
                <h1 className="text-sky-800 text-xl font-semibold mb-2">Edit {product.name}</h1>
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
                    <img src={image.name || "http://localhost:4000/api/v1/images/" + product.image} alt="" width="200px" />
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