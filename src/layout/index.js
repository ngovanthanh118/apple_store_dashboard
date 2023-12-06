import Panel from "../components/Panel";
import { Outlet } from "react-router-dom";
export default function Layout() {
    return (
        <div>
            <div className="flex w-full h-screen pb-12 ">
                <Panel />
                <div className="bg-white h-full mt-6 mr-6  w-full rounded-xl ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}