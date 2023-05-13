import { Outlet } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = () => {
    return (
       <div>
            <DefaultHeader />
        <div className="container">
            <Outlet />
            </div>
           </div>
    );
}
export default DefaultLayout;