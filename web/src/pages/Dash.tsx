import axiosInstance from "../axiosInstant";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";
import SearchBar from "../components/shared/SearchBar";

const Dash = () => {
  const handleReq = async () => {
    const res = await axiosInstance.get("/", { withCredentials: true });

    console.log(res.data);
  };

  return (
    <ProtectedRoutes>
      <div className="p-5 flex gap-5 items-center">
        <h1 className="font-sacramento text-2xl">luminex</h1>
        <SearchBar />
      </div>
      <div className="p-5">
        <div>Continue Reading</div>
      </div>
    </ProtectedRoutes>
  );
};

export default Dash;
