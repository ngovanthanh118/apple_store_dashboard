import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import MyLineChart from "../../components/MyLineChart";
import MyPieChart from "../../components/MyPieChart";
export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({})
    const [categories, setCategories] = useState([]);
    const [orderCate, setOrderCate] = useState([]);
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        const fetchDataAnalysis = async () => {
            await axios.get('/analysis/process')
                .then(res => {
                    setData(prev => prev = res.data.data)
                    const categories = res.data.data.categories.map((cate) => cate.name);

                    res.data.data.categories.forEach(cate => {
                        const filterByIdCate = res.data.data.product_ordered.filter(proc => {
                            return proc.category_id === cate._id;
                        })
                        setOrderCate(prev => [...prev, filterByIdCate.length])

                    });
                    setCategories(prev => prev = categories);
                    setOrderList(prev => prev = res.data.data.orders);
                })
                .catch(err => console.log(err));
        }
        fetchDataAnalysis()
    }, [])
    console.log(orderCate);
    return (
        <div className="relative flex justify-center items-center h-full overflow-y-auto py-4">
            {
                loading ?
                    <BarLoader
                        color={"#075985"}
                        loading={loading}
                        size={50}
                    /> :
                    <div className="flex-1 absolute top-0 left-0 w-full ">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between gap-4 p-6">
                                <div className="border bg-white p-6 border-gray-300 flex-1 border-solid rounded-md flex flex-col gap-2">
                                    <h1 className="text-base font-medium py-2 ">Thống kê sản phẩm</h1>
                                    <div>{data.product} sản phẩm</div>
                                </div>
                                <div className="border bg-white p-6 border-gray-300 flex-1 border-solid rounded-md flex flex-col gap-2">
                                    <h1 className="text-base font-medium py-2 ">Thống kê tài khoản</h1>
                                    <div>{data.user} tài khoản</div>
                                </div>
                                <div className="border bg-white p-6 border-gray-300 flex-1 border-solid rounded-md flex flex-col gap-2">
                                    <h1 className="text-base font-medium py-2 ">Thống kê đơn hàng</h1>
                                    <div>{data.order} đơn hàng</div>
                                </div>
                            </div>
                            <div className="flex p-6 justify-between">
                                <div className="w-1/2" >
                                    <MyLineChart labels={categories} info={orderCate} />
                                </div>
                                <div className="w-1/2 " >
                                    <MyPieChart labels={categories} info={orderCate} />
                                </div>
                            </div>
                            <div className="grid grid-cols-5 gap-2 px-4 py-2 bg-gray-400 mx-2 rounded-md">
                                <h1 className="text-base font-medium">Tên</h1>
                                <h1 className="text-base font-medium">Địa chỉ</h1>
                                <h1 className="text-base font-medium">Số điện thoại</h1>
                                <h1 className="text-base font-medium">Trạng thái</h1>
                                <h1 className="text-base font-medium text-right">Hành động</h1>
                            </div>
                            {orderList.length > 0 && orderList.map((order, index) => (
                                <div className={index % 2 !== 0 ? "grid grid-cols-5 gap-2 px-4 py-2 border-t border-gray-200" : "grid grid-cols-5 gap-2 px-4 py-2"}>
                                    <h1>{order.name}</h1>
                                    <h1>{order.address}</h1>
                                    <h1>{order.phone}</h1>
                                    <h1>{order.status}</h1>
                                    <div className="flex justify-end items-center">
                                        <Link className="bg-gray-200 text-sky-900 p-1 rounded-xl outline outline-2" to={"/order/" + order._id}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="-3.5 0 32 32"
                                                fill="#000000"
                                            >
                                                <path d="M12.406 13.844c1.188 0 2.156.969 2.156 2.156s-.969 2.125-2.156 2.125-2.125-.938-2.125-2.125.938-2.156 2.125-2.156zm0-5.313c7.063 0 12.156 6.625 12.156 6.625.344.438.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625S.25 16.812.25 16.812c-.344-.438-.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zm0 12.813c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344S7.062 13.062 7.062 16s2.406 5.344 5.344 5.344z"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
            }
        </div>
    )
}