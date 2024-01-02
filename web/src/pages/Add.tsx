import Input from "../components/shared/Input";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";
import { useUser } from "../context/User";

const Add = () => {
  const { user } = useUser();

  return (
    <ProtectedRoutes>
      <div className="h-[100vh]">
        <div className="w-[80%]">
          <Input label="Book name" />
          <Input label="Author" />
          <Input label="Book location" type="file" />
          <Input label="cover" type="file" />
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default Add;
