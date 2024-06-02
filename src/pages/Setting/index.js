import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextInput from "../../components/TextInput";
import ImageInput from "../../components/ImageInput";
import ButtonAction from "../../components/ButtonAction";
import AccountImage from "../../components/AccountImage";
import FormControl from "../../components/FormControl";
import { BarLoader } from "react-spinners";
import { getCookie } from "../../utils/index";
export default function SettingPage() {
    const [admin, setAdmin] = useState({});
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [imageShow, setImageShow] = useState();
    const [address, setAddress] = useState('');
    const loadAdmin = () => {
        axios.get('/users', {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                const admin = res.data.admin;
                setLoading(false);
                setAdmin(admin);
                setName(admin.name);
                setEmail(admin.email);
                setPhone(admin.phone);
                setAddress(admin.address);
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        setLoading(true);
        loadAdmin();
    }, [])
    const handleUpdateAdmin = (ev) => {
        setLoading(true);
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', newPassword);
        formData.append('phone', phone);
        formData.append('address', address);
        if (image) {
            formData.append('image', image);
        }
        axios.put('/users/' + admin._id, formData, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                loadAdmin();
                toast.success("Cập nhật thành công");
                setNewPassword('');
            })
            .catch(err => toast.error("Cập nhật thất bại"))
    }
    const handleLogout = () => {
        navigate('/');
    }
    return (
        <div className="relative flex justify-center items-center h-full">
            {
                loading ?
                    <BarLoader
                        color="#075985"
                        loading={loading}
                        size={50}
                    /> :
                    <div className="p-4 absolute top-0 left-0 w-full">
                        <h1 className="text-2xl font-semibold text-sky-700 my-4">Cài đặt </h1>
                        <h1 className="text-sky-800 text-xl font-semibold mb-4">Thông tin tài khoản quản trị</h1>
                        <div>
                            <button onClick={handleLogout} className="flex items-center gap-3 font-semibold bg-sky-800 p-4 rounded-3xl text-white absolute top-2 right-2 " to="/">
                                <span>Đăng xuất</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                            </button>
                        </div>
                        <FormControl onSubmit={handleUpdateAdmin}>
                            <TextInput
                                title="Tên"
                                value={name}
                                onChange={ev => setName(ev.target.value)}
                            />
                            <TextInput
                                title="Email"
                                type="email"
                                value={email}
                                onChange={ev => setEmail(ev.target.value)}
                            />
                            <TextInput
                                title="Số điện thoại"
                                value={phone}
                                onChange={ev => setPhone(ev.target.value)}
                            />
                            <TextInput
                                title="Địa chỉ"
                                value={address}
                                onChange={ev => setAddress(ev.target.value)}
                            />
                            <TextInput
                                title="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(ev) => setNewPassword(ev.target.value)}
                            />
                            <ImageInput
                                title="Cập nhật hình ảnh"
                                onChange={ev => {
                                    const url = URL.createObjectURL(ev.target.files[0]);
                                    setImage(ev.target.files[0])
                                    setImageShow(url)
                                }}
                            />
                            <AccountImage
                                title="Avatar"
                                image={admin.image}
                            />
                            {!!imageShow && <img src={imageShow} alt="ảnh" className="w-16 h-16" />}
                            <ButtonAction>Lưu thay đổi</ButtonAction>
                        </FormControl>
                    </div>
            }
        </div>
    )
}