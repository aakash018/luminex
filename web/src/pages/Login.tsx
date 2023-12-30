import React from "react";

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import HomeTheme from "../components/HomeTheme";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <HomeTheme>
      <div className="relative z-[3] w-full flex flex-col items-center h-fit ">
        <h1 className="text-5xl font-sacramento">luminex</h1>
        {/* <h2 className="text-xl">YOUR READING HUB</h2> */}
        <div className="mt-20 flex flex-col gap-10 w-full">
          <Input label={"Username"} />
          <Input label={"Password"} type="password" />
          <Button label="LOGIN" />
          <h2 className="text-center">
            Don't have an account? <Link to={"/signup"}>SignUp</Link>{" "}
          </h2>
        </div>
      </div>
    </HomeTheme>
  );
};

export default Login;
