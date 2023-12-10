import Panel from "../components/Panel";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Layout() {
    return (
        <div className="flex w-full h-screen pb-12">
            <ToastContainer/>
            <Panel />
            <div className="mobile-out-let bg-white h-full mr-6 mt-6 w-full rounded-xl">
                <Outlet />
            </div>
        </div>
    )
}