import Button from "../components/shared/Button";
import axiosInstance from "../axiosInstant";
import axios from "axios";
import { useEffect, useState } from "react";
import { setAccessToken } from "../accessToken";
import { ResponseType } from "../types/global";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await axios.get<ResponseType & { accessToken?: string }>(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/auth/refresh-token`,
        {
          withCredentials: true,
        }
      );
      if (res.data.status === "ok" && res.data.accessToken) {
        setAccessToken(res.data.accessToken);
        setLoading(false);
      } else {
        navigate("/login");
      }
    })();
  }, []);

  const handleReq = async () => {
    const res = await axiosInstance.get("/", { withCredentials: true });

    console.log(res.data);
  };

  if (loading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div>Dash</div>
      <Button label="test" onClick={handleReq} />
    </div>
  );
};

export default Dash;
