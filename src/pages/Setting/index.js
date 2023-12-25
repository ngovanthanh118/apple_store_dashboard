import axios from "axios"
import { useEffect, useState } from "react"
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
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
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
                setPassword(admin.password);
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
                toast.success(res.data.msg);
                setNewPassword('');
            })
            .catch(err => toast.error("Update admin failured!"))
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
                        <h1 className="text-2xl font-semibold text-sky-700 my-4">Setting </h1>
                        <h1 className="text-sky-800 text-xl font-semibold mb-4">Information admin</h1>
                        <FormControl onSubmit={handleUpdateAdmin}>
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
                                image={admin.image}
                            />
                            <ButtonAction>Save Changes</ButtonAction>
                        </FormControl>
                    </div>
            }
        </div>
    )
}