import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import TextInput from "../../components/TextInput";
import ImageInput from "../../components/ImageInput";
import ButtonAction from "../../components/ButtonAction";
import AccountImage from "../../components/AccountImage";
import FormControl from "../../components/FormControl";
import Thumbnail from "../../components/Thumbnail";
import CheckboxInput from "../../components/CheckboxInput";
import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [account, setAccount] = useState('')
    const { register, reset } = useForm();
    const loadAccount = () => {
        axios.get('/users/' + id, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                const account = res.data.data;
                setAccount(prev => prev = account);
                reset(account);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setLoading(true);
        loadAccount();
    }, [id])
    const handleUpdateAccount = (ev) => {
        setLoading(true);
        ev.preventDefault();
        axios.put('/users/' + id + '/permission', {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                loadAccount();
                toast.success('Cập nhật tài khoản thành công');
                navigate('/account')
            })
            .catch(err => toast.error("Cập nhật tài khoản thất bại"))
    }
    return (
        <div className="flex justify-center items-center h-full relative">
            {
                loading ?
                    <BarLoader
                        color="#075985"
                        loading={loading}
                        size={50}
                    /> :
                    <div className="p-4 absolute top-0 left-0 w-full h-full">
                        <FormControl onSubmit={handleUpdateAccount}>
                            <Thumbnail
                                title="Tài khoản"
                                goBack="/account"
                                action={`Chỉnh sửa ${account.name}`}
                            />
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium w-24" htmlFor="name">Tên</label>
                                <input disabled className="bg-gray-100 cursor-not-allowed text-sm rounded-xl px-2 py-1 w-1/3" type="text" id="name" {...register('name')} />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium w-24" htmlFor="email">Email</label>
                                <input disabled className="bg-gray-100 cursor-not-allowed text-sm rounded-xl px-2 py-1 w-1/3" type="text" id="email" {...register('email')} />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium w-24" htmlFor="phone">Số điện thoại</label>
                                <input disabled className="bg-gray-100 cursor-not-allowed text-sm rounded-xl px-2 py-1 w-1/3" type="text" id="phone" {...register('phone')} />
                            </div>
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium w-24" htmlFor="address">Địa chỉ</label>
                                <input disabled className="bg-gray-100 cursor-not-allowed text-sm rounded-xl px-2 py-1 w-1/3" type="text" id="address" {...register('address')} />
                            </div>
                            <AccountImage
                                title="Avatar"
                                image={account.image}
                            />
                            <div className="flex items-center gap-3">
                                <label className="text-sm font-medium w-24" htmlFor="admin">Admin</label>
                                <input className="bg-gray-200 text-sm rounded-xl px-2 py-1 cursor-pointer" type="checkbox" id="admin" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                            </div>
                            <ButtonAction>Lưu thay đổi</ButtonAction>
                        </FormControl>
                    </div>
            }
        </div>
    )
}