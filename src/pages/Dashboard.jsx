import { Outlet } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center justify-center p-8">
        <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
          {user.user.name}
        </p>
        <p className="text-[#8e9acc] text-base font-normal leading-normal text-center">
          {user.user.email}
        </p>
        <p className="text-[#8e9acc] text-base font-normal leading-normal text-center">
          {user.user._id}
        </p>
      </div>
      <Outlet />
    </Layout>
  );
};

export { Dashboard };
