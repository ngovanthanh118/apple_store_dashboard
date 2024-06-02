import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "../../utils";
import FormControl from "../../components/FormControl";
import TextInput from "../../components/TextInput";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";
import ImageInput from "../../components/ImageInput";
export default function AddCategoryPage() {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [imageShow, setImageShow] = useState('');
    const navigate = useNavigate();
    const handleAddCategory = (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);

        axios.post('/categories/', formData, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                toast.success('Thêm danh mục thành công')
                navigate('/category');
            })
            .catch(err => toast.error("Thêm danh mục thất bại"))
    }
    return (
        <div className="p-4">
            <FormControl onSubmit={handleAddCategory}>
                <Thumbnail
                    title="Danh mục"
                    goBack="/category"
                    action="Thêm danh mục"
                />
                <TextInput
                    title="Tên"
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                />
                <ImageInput
                    title="Hình ảnh"
                    onChange={ev => {
                        setImage(ev.target.files[0]);
                        const url = URL.createObjectURL(ev.target.files[0]);
                        setImageShow(prev => prev = url);
                    }}
                />
                {!!imageShow && <img src={imageShow} className="w-16 h-16" alt="Anh" />}
                <ButtonAction>Lưu</ButtonAction>
            </FormControl>
        </div>
    )
}