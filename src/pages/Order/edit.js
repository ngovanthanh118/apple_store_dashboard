import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { BarLoader } from "react-spinners";
import Thumbnail from "../../components/Thumbnail";
import { getCookie } from "../../utils";
import { toast } from "react-toastify";
import PDFFile from "../../components/PDFFile";
import { PDFDownloadLink } from "@react-pdf/renderer";
export default function OrderEdit() {
    const { id } = useParams();
    const [status, setStatus] = useState();
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(false);
    const loadOrder = () => {
        setLoading(true);
        axios.get('/orders/' + id + '/detail')
            .then(res => {
                console.log(res);
                setLoading(false);
                const order = res.data.data;
                setStatus(prev => prev = order.status)
                setOrder(prev => prev = order)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        loadOrder();
    }, [id])
    const handleUpdateStatusOrder = () => {
        axios.put('/orders/' + id, { status: status }, {
            headers: {
                token: getCookie('token')
            }
        })
            .then(res => {
                toast.success('Cập nhật trạng thái thành công')
            })
            .catch(err => toast.error('Cập nhật trạng thái thất bại'))
    }
    return (
        <div className="flex justify-center items-center h-full relative">
            {loading ?
                <BarLoader
                    color="#075985"
                    loading={loading}
                    size={50}
                /> :
                <div className="p-8 absolute top-0 left-0 flex flex-col gap-4">
                    <Thumbnail
                        title="Đơn hàng"
                        goBack="/order"
                        action={`Chi tiết ${id}`}
                    />
                    <div className="flex gap-10">
                        <div>
                            <h1 className="text-base font-medium">Thông tin người đặt</h1>
                            <p>Họ và tên: {order.customer?.name}</p>
                            <p>Email: {order.customer?.email}</p>
                            <p>Số điện thoại: {order.customer?.phone}</p>
                        </div>
                        <div>
                            <h1 className="text-base font-medium">Thông tin người nhận</h1>
                            <p>Họ và tên: {order?.name}</p>
                            <p>Số điện thoại: {order?.phone}</p>
                            <p>Địa chỉ: {order?.address}</p>

                        </div>
                    </div>
                    <div>
                        <h1 className="text-base font-medium">Thông tin đơn hàng</h1>
                        {order.products?.length > 0 && order.products.map((product => (
                            <div key={product._id} className="flex items-center gap-4 py-2">
                                <img src={`${process.env.REACT_APP_API_URL}/images/${product.image}`} alt="Ảnh" className="w-16 h-16" />
                                <h1>{product.name} {product.capacity} x {product.quantity}</h1>
                                <p>{product.price?.toLocaleString()}đ</p>
                            </div>
                        )))}
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2" >
                                <h1 className="font-medium">Tổng tiền:</h1>
                                <p className="text-red-600">{order.total_pay?.toLocaleString()}đ</p>
                            </div>

                            <h1> <span className="font-medium">Phương thức thanh toán: </span>{order.payment_method}</h1>
                            <h1><span className="font-medium">Ghi chú:</span> {order.note}</h1>
                            <h1> <span className="font-medium">Ngày tạo:</span> {order.createdAt}</h1>
                            <div className="flex gap-2">
                                <h1 className="font-medium">Trạng thái đơn hàng:</h1>
                                <select className="bg-gray-300 rounded-xl p-2 w-1/3" onChange={(ev) => setStatus(prev => prev = ev.target.value)}>
                                    {['Chờ xử lý', 'Đang xử lý', 'Đang vận chuyển', 'Hoàn thành', 'Đã hủy'].map(value => (
                                        <option key={value} value={value} selected={value === order.status}>{value}</option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-sky-800 text-white px-4 py-2 rounded-2xl max-w-fit" onClick={handleUpdateStatusOrder}>Lưu thay đổi</button>

                        <PDFDownloadLink document={<PDFFile infor={order} />} filename="FORM">
                            <button className="bg-sky-800 text-white px-4 py-2 rounded-2xl max-w-fit" >Xuất hóa đơn</button>
                        </PDFDownloadLink>
                    </div>
                </div>
            }
        </div>
    )
}