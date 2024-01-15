import HomeTheme from "../components/HomeTheme";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ResponseType } from "@/types/global";
import { toast } from "sonner";

function isValidEmail(email: string): boolean {
  const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCpassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const [email, setEmail] = useState<string>("");

  const handleSubmit = async () => {
    if (cpassword !== password) {
      return toast("confirm password did not match", {
        position: "top-center",
        style: { color: "red" },
      });
    }

    if (!isValidEmail(email)) {
      return toast("wrong email formate", {
        position: "top-center",
        style: { color: "red" },
      });
    }

    if (
      username.trim() === "" ||
      fullname.trim() === "" ||
      password.trim() === "" ||
      email.trim() === "" ||
      cpassword.trim() === ""
    ) {
      return toast("empty fields", {
        position: "top-center",
        style: { color: "red" },
      });
    }

    const payload = {
      username,
      fullname,
      password,
      email,
    };
    try {
      setLoading(true);
      const res = await axios.post<ResponseType>(
        `${import.meta.env.VITE_SERVER_ENDPOINT}/auth/signup`,
        payload
      );
      setLoading(false);
      if (res.data.status === "ok") {
        toast(res.data.message, {
          position: "top-center",
          style: { color: "green" },
        });
        nav("/login");
      } else {
        toast(res.data.message, {
          position: "top-center",
          style: { color: "red" },
        });
      }
    } catch {
      setLoading(false);

      toast("error connecting to server", {
        position: "top-center",
        style: { color: "red" },
      });
    }
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
          <Button label="SIGNUP" onClick={handleSubmit} disabled={loading} />
          <h2 className="text-center">
            Already have an account? <Link to={"/"}>Login</Link>
          </h2>
        </div>
      </div>
    </HomeTheme>
  );
};

export default Signup;
