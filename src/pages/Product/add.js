import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getCookie } from "../../utils";
import ImageInput from "../../components/ImageInput";
import FormControl from "../../components/FormControl";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";
export default function AddProductPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const {
        register,
        setValue,
        handleSubmit
    } = useForm()
    useEffect(() => {
        const loadCategory = async () => {
            await axios.get('/categories')
                .then(res => {
                    setCategories(prev => prev = res.data.data);
                    setValue('category_id', res.data.data[0]._id)
                })
                .catch(err => console.log(err));
        }
        loadCategory();
    }, []);
    const [colors, setColors] = useState([]);
    const [imagesShow, setImagesShow] = useState([]);
    const [images, setImages] = useState();

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
    const onSubmit = (data) => {
        console.log(data);
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        })
        if (images) {
            Object.keys(images).forEach(key => {
                formData.append('images', images[key]);
            })
        }
        axios.post('/products/create', formData, {
            headers: {
                token: getCookie('token'),
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                toast.success("Thêm sản phẩm thành công");
                navigate('/product');
            })
            .catch(err => toast.error("Thêm sản phẩm thất bại"))
    }
    const handleUpdateLabelColor = (index, value) => {
        const newColors = colors.map((val, id) => {
            if (index === id) {
                return { ...val, label: value }
            }
            return val;
        })
        setColors(prev => prev = newColors);
    }
    return (
        <div className="p-4 w-full h-full overflow-y-auto">
            <FormControl onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center gap-2">
                    <Thumbnail
                        title="Sản phẩm"
                        goBack="/product"
                        action="Thêm mới"
                    />
                    <ButtonAction>Lưu</ButtonAction>
                </div>
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 grid grid-cols-1 gap-4">
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24" htmlFor="name">Tên sản phẩm
                                <span className="ml-2 text-sm text-red-600 font-medium">*</span>
                            </label>
                            <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="name" {...register('name')} />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24">Dung lượng</label>
                            {["64GB", "128GB", "256GB", "512GB", "1TB"].map((cap) => (
                                <div key={cap} className="flex items-center gap-2">
                                    <input type="radio" id={cap} value={cap} defaultChecked={cap === "64GB"} name="capacity" {...register('capacity')} />
                                    <label htmlFor={cap} className="text-sm font-medium">{cap}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24" htmlFor="version">Phiên bản</label>
                            <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="version" {...register('version')} />
                        </div>
                        <div className="flex items-start gap-3">
                            <label className="text-sm font-medium w-24" htmlFor="colors">Màu sắc
                                <span className="ml-2 text-sm text-red-600 font-medium">*</span>
                            </label>
                            <div className="flex flex-col gap-2">
                                <input className="w-24" type="color" id="colors" onBlur={(ev) => setColors(prev => prev = [...prev, { color: ev.target.value, label: "" }])} />
                                <div className="flex items-start gap-2">
                                    {colors.length > 0 && colors.map((value, index) => (
                                        <div className="flex flex-col gap-2">
                                            <div key={value} style={{ backgroundColor: value.color }} className='w-14 p-2'></div>
                                            <input type="text" className="w-14 h-6 border border-solid border-gray-200 rounded-md text-xs pl-1 outline-none" spellCheck={false}
                                                onChange={(ev) => handleUpdateLabelColor(index, ev.target.value)}
                                            />
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24" htmlFor="screen_size">Màn hình</label>
                            <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="screen_size" {...register('screen_size')} />
                        </div>
                        <div className="flex gap-4 ">
                            <h1 className="text-sm font-medium w-24">Danh mục
                                <span className="ml-2 text-sm text-red-600 font-medium">*</span>
                            </h1>
                            <select {...register('category_id')}>
                                {categories.map((cate) => (
                                    <option key={cate._id} value={cate._id} >{cate.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24" htmlFor="description">Mô tả</label>
                            <textarea className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" id="description" {...register('description')} />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24" htmlFor="price">Giá gốc
                                <span className="ml-2 text-sm text-red-600 font-medium">*</span>
                            </label>
                            <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="price" {...register('price')} />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24" htmlFor="discount">Giá bán</label>
                            <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="discount" {...register('discount')} />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24" htmlFor="quantity">Số lượng
                                <span className="ml-2 text-sm text-red-600 font-medium">*</span>
                            </label>
                            <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-full" type="text" id="quantity" {...register('quantity')} />
                        </div>
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-medium w-24">Trạng thái</label>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="status"  {...register('status')} defaultChecked />
                                <label htmlFor="status" className="text-xs font-medium">Hiển thị</label>
                            </div>
                        </div>
                        <ImageInput
                            title="Hình ảnh"
                            onChange={handleChangeImageFile}
                        />
                        {/* <div className="flex gap-4 ">
                            <h1 className="text-sm font-medium w-24">Hình ảnh</h1>
                            <label htmlFor="file" className="flex flex-col gap-2 rounded-xl items-center bg-gray-200 p-2">
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
                                onChange={handleChangeImageFile}
                                multiple
                            />
                        </div> */}
                        <div className="flex gap-4">
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
                                    <input type="radio" id={ram} value={ram} name="ram" defaultChecked={ram === "4"} {...register('ram')} />
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
                                    <input type="radio" id={value} value={value} name="refresh_rate" defaultChecked={value === "60"} {...register('refresh_rate')} />
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
    )
}