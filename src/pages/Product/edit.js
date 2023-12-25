import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import TextInput from "../../components/TextInput";
import RadioInput from "../../components/RadioInput";
import TextAreaInput from "../../components/TextAreaInput";
import SelectInput from "../../components/SelectInput";
import ImageInput from "../../components/ImageInput";
import FormControl from "../../components/FormControl";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";
import BoxImage from "../../components/BoxImage";
import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";


export default function EditProductPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [name, setName] = useState('');
    const [storage, setStorage] = useState('');
    const [color, setColor] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('Old');
    const loadProduct = () => {
        axios.get('/products/edit/' + id, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                const product = res.data.data;
                setProduct(product);
                setName(product.name);
                setStorage(product.storage);
                setColor(product.color);
                setType(product.type);
                setStatus(product.status);
                setDescription(product.description);
                setPrice(product.price);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setLoading(true);
        loadProduct();
    }, [id])
    const handleUpdateProduct = (ev) => {
        setLoading(true);
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('storage', storage);
        formData.append('color', color);
        formData.append('type', type);
        formData.append('status', status);
        formData.append('description', description);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }
        axios.put('/products/' + id, formData, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                loadProduct();
                toast.success(res.data.msg);
            })
            .catch(err => toast.error("Update product failured!"))
    }
    return (
        <div className="flex justify-center items-center h-full relative">
            {loading ?
                <BarLoader
                    color="#075985"
                    loading={loading}
                    size={50}
                /> :
                <div className="p-4 abosulute top-0 left-0 w-full h-full">
                    <FormControl onSubmit={handleUpdateProduct}>
                        <Thumbnail
                            title="Product"
                            goBack="/product"
                            action={`Edit ${product.name}`}
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
                            select={type}
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
                            title="Update image"
                            onChange={ev => setImage(ev.target.files[0])}
                        />
                        <BoxImage
                            title="Image"
                            image={product.image}
                        />
                        <ButtonAction>Save Changes</ButtonAction>
                    </FormControl>
                </div>
            }
        </div>
    )
}