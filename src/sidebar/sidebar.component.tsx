import { NavLink, Outlet } from "react-router-dom";
import SidebarItem from "./sidebar-item.component";

const Sidebar = () => {
    return (
        <div className="h-full flex flex-col justify-between bg-white shadow-lg rounded-lg items-center pt-5">
            <div className="flex flex-col justify-start text-left w-full ">
                <SidebarItem to="/" text="My Policies" />
                <SidebarItem to="publish" text="Buy a Policy" />
            </div>
        </div>
    );
};

export default Sidebar;
