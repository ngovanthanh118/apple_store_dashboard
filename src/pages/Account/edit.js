import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
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
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState({})
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [image, setImage] = useState('');
    const [admin, setAdmin] = useState(false);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const loadAccount = () => {
        axios.get('/users/' + id, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                const account = res.data.data;
                setAccount(account);
                setName(account.name);
                setEmail(account.email);
                setPassword(account.password);
                setPhone(account.phone);
                setAddress(account.address);
                setAdmin(account.admin);
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
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', newPassword);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('admin', admin);
        if (image) {
            formData.append('image', image);
        }
        axios.put('/users/' + id, formData, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                loadAccount();
                toast.success(res.data.msg);
                setNewPassword('');
            })
            .catch(err => toast.error("Update account failured!"))
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
                                title="Account"
                                goBack="/account"
                                action={`Edit ${account.name}`}
                            />
                            <TextInput
                                title="Name"
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
                                title="Phone"
                                value={phone}
                                onChange={ev => setPhone(ev.target.value)}
                            />
                            <TextInput
                                title="Address"
                                value={address}
                                onChange={ev => setAddress(ev.target.value)}
                            />
                            <TextInput
                                title="Password"
                                type="password"
                                value={password}
                                disabled />
                            <TextInput
                                title="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(ev) => setNewPassword(ev.target.value)}
                            />
                            <ImageInput
                                title="Update avatar"
                                onChange={ev => setImage(ev.target.files[0])}
                            />
                            <AccountImage
                                title="Avatar"
                                image={account.image}
                            />
                            <CheckboxInput
                                title="Admin"
                                checked={admin}
                                onChange={() => setAdmin(!admin)}
                            />
                            <ButtonAction>Save Changes</ButtonAction>
                        </FormControl>
                    </div>
            }
        </div>
    )
}