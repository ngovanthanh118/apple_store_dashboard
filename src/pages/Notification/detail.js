import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Thumbnail from "../../components/Thumbnail";
import { toast } from "react-toastify";
export default function NotificationDetailPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [notification, setnotification] = useState({});
    const navigate = useNavigate();
    const loadNotification = () => {
        axios.get('/notifications/' + id, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                const notification = res.data.data;
                setnotification(notification);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setLoading(true);
        loadNotification();
    }, [id])
    const handleDeleteNotification = () => {
        const isConfirm = window.confirm("Bạn muốn xóa thông báo này?");
        if (isConfirm) {
            axios.delete('/notifications/' + id, {
                headers: {
                    token: getCookie('token')
                }
            })
                .then(res => {
                    navigate('/notification');
                    toast.success('Xóa thông báo thành công')
                })
                .catch(err => toast.success('Xóa thông báo thất bại'))
        }
    }
    return (
        <div className="flex justify-center items-center h-full relative">
            {loading ?
                <BarLoader
                    color="#075985"
                    loading={loading}
                    size={50}
                /> :
                <div className="p-4 absolute top-0 left-0 flex flex-col gap-4">
                    <Thumbnail
                        title="Thông báo"
                        goBack="/notification"
                        action={`Chi tiết ${id}`}
                    />
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="font-medium">Tiêu đề:</h1>
                            <p>{notification.title}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <h1 className="font-medium">Nội dung:</h1>
                            <p>{notification.content}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <h1 className="font-medium">Ngày tạo:</h1>
                            <p>{notification.createdAt}</p>
                        </div>
                    </div>

                    <button className="bg-sky-800 text-white px-4 py-2 rounded-2xl max-w-fit" onClick={handleDeleteNotification}>Xóa</button>
                </div>
            }
        </div>
    )
}