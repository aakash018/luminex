import React, { useEffect, useState } from "react";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import HomeTheme from "../components/HomeTheme";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ResponseType, User } from "../types/global";
import { getAccessToken, setAccessToken } from "../accessToken";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken("");
    console.log(getAccessToken());
  }, []);

  const handleSubmit = async () => {
    const payload = {
      username,
      password,
    };

    if (username.trim() === "" || password.trim() === "")
      return alert("empty fields");
    try {
      const res = await axios.post<
        ResponseType & { user?: User; accessToken: string }
      >(`${import.meta.env.VITE_SERVER_ENDPOINT}/auth/login`, payload, {
        withCredentials: true,
      });

      if (res.data.status === "fail") {
        return console.log(res.data);
      } else {
        setAccessToken(res.data.accessToken);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      alert("internal server error");
    }
  };

  return (
    <HomeTheme>
      <div className="relative z-[3] w-full flex flex-col items-center h-fit ">
        <h1 className="text-5xl font-sacramento">luminex</h1>
        {/* <h2 className="text-xl">YOUR READING HUB</h2> */}
        <div className="mt-20 flex flex-col gap-10 w-full">
          <Input label={"Username"} setValue={setUsername} value={username} />
          <Input
            label={"Password"}
            type="password"
            setValue={setPassword}
            value={password}
          />
          <Button label="LOGIN" onClick={handleSubmit} />
          <h2 className="text-center">
            Don't have an account? <Link to={"/signup"}>SignUp</Link>{" "}
          </h2>
        </div>
      </div>
    </HomeTheme>
  );
};

export default Login;
