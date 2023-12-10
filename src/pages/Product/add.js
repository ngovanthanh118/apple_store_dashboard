import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import TextInput from "../../components/TextInput";
import RadioInput from "../../components/RadioInput";
import TextAreaInput from "../../components/TextAreaInput";
import SelectInput from "../../components/SelectInput";
import ImageInput from "../../components/ImageInput";
import FormControl from "../../components/FormControl";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";
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
        formData.append('status', status);
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
            <FormControl onSubmit={handleAddProduct}>
                <Thumbnail
                    title="Product"
                    goBack="/product"
                    action="Add product"
                />
                <TextInput
                    title="Name"
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                />
                <RadioInput
                    title="Storage"
                    checked={storage}
                    values={["128GB", "256GB", "512GB", "1TB"]}
                    onChange={ev => setStorage(ev.target.value)}
                />
                <TextInput
                    title="Color"
                    value={color}
                    onChange={ev => setColor(ev.target.value)}
                />
                <SelectInput
                    title="Type"
                    options={["iPhone", "iPad", "Mac"]}
                    values={["mobile", "ipad", "mac"]}
                    onChange={ev => setType(ev.target.value)}
                />
                <RadioInput
                    title="Status"
                    values={["Old", "New"]}
                    checked={status}
                    onChange={ev => setStatus(ev.target.value)}
                />
                <TextAreaInput
                    title="Description"
                    value={description}
                    onChange={ev => setDescription(ev.target.value)}
                />
                <TextInput
                    title="Price"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                />
                <ImageInput
                    title="Image"
                    onChange={ev => setImage(ev.target.files[0])}
                />
                <ButtonAction>Add product</ButtonAction>
            </FormControl>
        </div>
    )
}