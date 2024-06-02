import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import ImageInput from "../../components/ImageInput";
import FormControl from "../../components/FormControl";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";
import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";
import { useForm } from "react-hook-form";

export default function EditProductPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const loadCategory = () => {
        axios.get('/categories')
            .then(res => setCategories(res.data.data))
            .catch(err => console.log(err));
    }
    const loadProduct = () => {
        axios.get('/products/edit/' + id, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                const product = res.data.data;
                reset(product);
                setValue('colors', JSON.stringify(product.colors));
                setProduct(prev => prev = product);
            })
            .catch(err => console.log(err))
    }
    const [colors, setColors] = useState([]);
    const [imagesShow, setImagesShow] = useState([]);
    const [images, setImages] = useState({});

    useEffect(() => {
        setValue('colors', JSON.stringify(colors));
    }, [colors])

    const handleChangeImageFile = (ev) => {
        const files = ev.target.files;
        const imageUrls = []
        Object.keys(files).forEach(key => {
            const url = URL.createObjectURL(files[key]);
            imageUrls.push(url);
        })
        setImages(prev => prev = files);
        setImagesShow(prev => prev = imageUrls);
    }
    const {
        register,
        setValue,
        handleSubmit,
        reset
    } = useForm()
    useEffect(() => {
        setLoading(true);
        loadProduct();
        loadCategory();
    }, [id])
    const onSubmit = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key !== 'images') {
                formData.append(key, data[key]);
            }
        })
        if (Object.keys(images).length > 0) {
            Object.keys(images).forEach(key => {
                formData.append('images', images[key]);
            })
        }
        axios.put('/products/' + id, formData, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                loadProduct();
                toast.success("Cập nhật sản phẩm thành công");
            })
            .catch(err => toast.error("Cập nhật sản phẩm thất bại"))
    }

    return (
        <div className="flex justify-center items-center h-full relative">
            {loading ?
                <BarLoader
                    color="#075985"
                    loading={loading}
                    size={50}
                /> :
                <div className="p-4 absolute top-0 left-0 w-full h-full overflow-y-auto">
                    <FormControl onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-center gap-2">
                            <Thumbnail
                                title="Sản phẩm"
                                goBack="/product"
                                action={`Chỉnh sửa ${product.name}`}
                            />
                            <ButtonAction>Lưu thay đổi</ButtonAction>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="name">Tên sản phẩm</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="name" {...register('name')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24">Dung lượng</label>
                                    {["64GB", "128GB", "256GB", "512GB", "1TB"].map((cap) => (
                                        <div key={cap} className="flex items-center gap-2">
                                            <input type="radio" id={cap} value={cap} name="capacity" {...register('capacity')} defaultChecked={cap === product.capacity} />
                                            <label htmlFor={cap} className="text-sm font-medium">{cap}</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="version">Phiên bản</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="version" {...register('version')} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="colors">Màu sắc</label>
                                    <div className="flex flex-col gap-2">
                                        <input className="w-24" type="color" id="colors" onBlur={(ev) => setColors(prev => prev = [...prev, ev.target.value])} />
                                        <div className="flex items-start gap-2">
                                            {!!!colors.length && product.colors?.length > 0 && product?.colors.map(color => (
                                                <div key={color} style={{ backgroundColor: color }} className='w-5 p-2'></div>
                                            ))}
                                            {colors.length > 0 && colors.map(color => (
                                                <div key={color} style={{ backgroundColor: color }} className='w-5 p-2'></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="screen_size">Màn hình</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="screen_size" {...register('screen_size')} />
                                </div>
                                <div className="flex gap-4 ">
                                    <h1 className="text-sm font-medium w-24">Danh mục</h1>
                                    <select {...register('category_id')}>
                                        {categories.map((cate) => (
                                            <option key={cate._id} value={cate._id} selected={cate._id === product.category_id}>{cate.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="description">Mô tả</label>
                                    <textarea className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" id="description" {...register('description')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="price">Giá gốc</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="price" {...register('price')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="discount">Giá bán</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="discount" {...register('discount')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="quantity">Số lượng</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="quantity" {...register('quantity')} />
                                </div>

                                <ImageInput
                                    title="Hình ảnh"
                                    onChange={handleChangeImageFile}

                                />

                                <div className="flex gap-4">
                                    {!!!imagesShow.length && product.images?.length > 0 && product.images.map(img => (
                                        <img key={img} src={`${process.env.REACT_APP_API_URL}/images/${img}`} alt="Ảnh" className="w-16 h-16" />
                                    ))}
                                    {imagesShow.length > 0 && imagesShow.map(img => (
                                        <img key={img} src={img} alt="Ảnh" className="w-16 h-16" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="size">Kích thước</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="size" {...register('size')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24">Ram</label>
                                    {['4', '8', '16', '32', '64'].map((ram) => (
                                        <div key={ram} className="flex items-center gap-2">
                                            <input type="radio" id={ram} value={ram} name="ram" defaultChecked={product.ram === +ram} {...register('ram')} />
                                            <label htmlFor={ram} className="text-sm font-medium">{ram} GB</label>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="cpu">Cpu</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="cpu" {...register('cpu')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="gpu">Gpu</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="gpu" {...register('gpu')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="material">Chất liệu</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="material" {...register('material')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="screen_type">Loại màn hình</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="screen_type" {...register('screen_type')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="resolution">Độ phân giải</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="resolution" {...register('resolution')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="battery_life">Dung lượng pin</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="battery_life" {...register('battery_life')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="charger_capacity">Công suất sạc</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="charger_capacity" {...register('charger_capacity')} />
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="ram">Tần số quét</label>
                                    {["60", "90", "120", "144"].map((value) => (
                                        <div key={value} className="flex items-center gap-2">
                                            <input type="radio" id={value} value={value} name="refresh_rate" {...register('refresh_rate')} defaultChecked={product.refresh_rate === +value} />
                                            <label htmlFor={value} className="text-sm font-medium">{value}Hz</label>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium w-24" htmlFor="operating_system">Hệ điều hành</label>
                                    <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="operating_system" {...register('operating_system')} />
                                </div>
                            </div>
                        </div>
                    </FormControl>
                </div>
            }
        </div>
    )
}