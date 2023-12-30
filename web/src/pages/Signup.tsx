import HomeTheme from "../components/HomeTheme";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <HomeTheme>
      <div>
        <h1 className="text-2xl text-center">Signup</h1>
        <div className="flex flex-col gap-5 mt-10">
          <Input label="Full Name" />
          <Input label="Username" />
          <Input label="Email" />
          <Input label="Password" />
          <Input label="Confirm Password" />
          <Button label="SIGNUP" />
          <h2 className="text-center">
            Already have an account? <Link to={"/"}>Login</Link>
          </h2>
        </div>
      </div>
    </HomeTheme>
  );
};

export default Signup;
