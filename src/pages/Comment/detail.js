import { getCookie } from "../../utils";
import { BarLoader } from "react-spinners";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Thumbnail from "../../components/Thumbnail";
import { toast } from "react-toastify";
export default function CommentDetailPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState({});
    const navigate = useNavigate();
    const loadComment = () => {
        axios.get('/comments/' + id + '/detail', {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                setLoading(false);
                const comment = res.data.data;
                setComment(comment);
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setLoading(true);
        loadComment();
    }, [id])
    const handleDeleteComment = () => {
        const isConfirm = window.confirm("Bạn muốn xóa bình luận này?");
        if (isConfirm) {
            axios.delete('/comments/' + id, {
                headers: {
                    token: getCookie('token')
                }
            })
                .then(res => {
                    navigate('/comment');
                    toast.success("Xóa bình luận thành công")
                })
                .catch(err => toast.success('Xóa bình luận thất bại'))
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
                <div className="px-6 py-4 absolute top-0 left-0 flex flex-col gap-4">
                    <Thumbnail
                        title="Bình luận"
                        goBack="/comment"
                        action={`Chi tiết ${id}`}
                    />
                    <div>
                        <div className="flex items-center gap-4">
                            <h1 className="font-medium text-base">Người bình luận:</h1>
                            <p>{comment.customer_name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <h1 className="font-medium text-base">Nội dung:</h1>
                            <p>{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <h1 className="font-medium text-base">Đánh giá:</h1>
                            <p>{comment.rating}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <h1 className="font-medium text-base">Ngày bình luận:</h1>
                            <p>{comment.createdAt}</p>
                        </div>
                    </div>
                    <div>
                        <h1 className="font-medium text-base">Sản phẩm:</h1>
                        <p>{comment.product?.name} {comment.product?.capacity}</p>
                        <img src={`${process.env.REACT_APP_API_URL}/images/${comment.product?.image}`} alt="Ảnh" className="w-16 h-16" />
                    </div>
                    <button className="bg-sky-800 text-white px-4 py-2 rounded-2xl max-w-fit" onClick={handleDeleteComment}>Xóa</button>
                </div>
            }
        </div>
    )
}