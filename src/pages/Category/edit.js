import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import FormControl from "../../components/FormControl";
import TextInput from "../../components/TextInput";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";
import BoxImage from "../../components/BoxImage";
import ImageInput from "../../components/ImageInput";
export default function EditCategoryPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [imageShow, setImageShow] = useState('');
    const loadCategory = () => {
        axios.get('/categories/edit/' + id, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                const category = res.data.data;
                setCategory(category);
                setName(prev => prev = category.name)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setLoading(true);
        loadCategory();
    }, [id])
    const handleUpdateCategory = (ev) => {
        setLoading(true);
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        if (image) {
            formData.append('image', image);
        }
        axios.put('/categories/' + id, formData, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                loadCategory();
                toast.success('Cập nhật danh mục thành công');

            })
            .catch(err => toast.error("Cập nhật danh mục thất bại"))
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
                    <FormControl onSubmit={handleUpdateCategory}>
                        <Thumbnail
                            title="Danh mục"
                            goBack="/category"
                            action={`Chỉnh sửa ${category.name}`}
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
                                setImageShow(url)
                            }}
                        />
                        {!!!imageShow && <BoxImage
                            title=""
                            image={category.image}
                        />}
                        {!!imageShow && <img src={imageShow} alt="ảnh" className="w-16 h-16" />}
                        <ButtonAction>Lưu thay đổi</ButtonAction>
                    </FormControl>
                </div>
            }
        </div>
    )
}