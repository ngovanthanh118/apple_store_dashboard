import Panel from "../components/Panel";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Layout() {
    return (
        <div className="flex w-full h-screen pb-12 ">
            <ToastContainer/>
            <Panel />
            <div className="bg-white h-full mt-6 mr-6  w-full rounded-xl ">
                <Outlet />
            </div>
        </div>
    )
}