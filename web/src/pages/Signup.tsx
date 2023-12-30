import HomeTheme from "../components/HomeTheme";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    if (cpassword !== password) {
      return alert("CP no match");
    }

    const payload = {
      username,
      fullname,
      password,
      email,
    };

    const res = await axios.post("http://localhost:5000/auth/signup", payload);

    console.log(res.data);
  };

  return (
    <HomeTheme>
      <div>
        <h1 className="text-2xl text-center">Signup</h1>
        <div className="flex flex-col gap-5 mt-10">
          <Input label="Full Name" setValue={setFullname} value={fullname} />
          <Input label="Username" setValue={setUsername} value={username} />
          <Input label="Email" setValue={setEmail} value={email} />
          <Input
            label="Password"
            setValue={setPassword}
            value={password}
            type="password"
          />
          <Input
            label="Confirm Password"
            setValue={setCpassword}
            value={cpassword}
            type="password"
          />
          <Button label="SIGNUP" onClick={handleSubmit} />
          <h2 className="text-center">
            Already have an account? <Link to={"/"}>Login</Link>
          </h2>
        </div>
      </div>
    </HomeTheme>
  );
};

export default Signup;
