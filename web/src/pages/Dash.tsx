import axios from "axios";
import Button from "../components/shared/Button";

const Dash = () => {
  const handleReq = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_ENDPOINT}/auth/refresh-token`,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);
  };

  return (
    <div>
      <div>Dash</div>
      <Button label="test" onClick={handleReq} />
    </div>
  );
};

export default Dash;
