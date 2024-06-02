import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { getCookie } from "../../utils";
import FormControl from "../../components/FormControl";
import TextInput from "../../components/TextInput";
import Thumbnail from "../../components/Thumbnail";
import ButtonAction from "../../components/ButtonAction";
export default function NotificationAddPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const handleAddNotification = (ev) => {
        ev.preventDefault();
        axios.post('/notifications', {
            title: title,
            content: content
        }, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                toast.success("Thêm thông báo thành công")
                navigate('/notification');
            })
            .catch(err => toast.error("Thêm thông báo thất bại"))
    }
    return (
        <div className="p-4">
            <FormControl onSubmit={handleAddNotification}>
                <Thumbnail
                    title="Thông báo"
                    goBack="/notification"
                    action="Thêm thông báo"
                />
                <TextInput
                    title="Tiêu đề"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
                <div className="flex gap-4">
                    <h1 className="text-sm font-medium w-24">Nội dung</h1>
                    <textarea
                        value={content}
                        onChange={ev => setContent(ev.target.value)}
                        className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/3"
                    />
                </div>
                {/* <textarea
                    value={content}
                    onChange={ev => setContent(ev.target.value)}
                    className="bg-gray-200 text-sm rounded-xl px-2 py-1 w-1/3"
                /> */}
                {/* <TextInput
                    title="Nội dung"
                    value={content}
                    onChange={ev => setContent(ev.target.value)}
                /> */}
                <ButtonAction>Lưu</ButtonAction>
            </FormControl>
        </div>
    )
}