import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../../accessToken";
import { useNavigate } from "react-router-dom";
import { ResponseType } from "../../types/global";
import { isTokenExpired } from "../../axiosInstant";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenExpired(getAccessToken())) {
      console.log(getAccessToken());
      return setLoading(false);
    }

    (async () => {
      console.log("RAN");
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

  if (loading) {
    return (
      <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
