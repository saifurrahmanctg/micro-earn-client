import useRole from "../../hooks/useRole";
import WorkerHome from "./Worker/WorkerHome";
import BuyerHome from "./Buyer/BuyerHome";
import AdminHome from "./Admin/AdminHome";

const DashboardHome = () => {
    const [role] = useRole();

    return (
        <div>
            {role === 'worker' && <WorkerHome />}
            {role === 'buyer' && <BuyerHome />}
            {role === 'admin' && <AdminHome />}
        </div>
    );
};

export default DashboardHome;
