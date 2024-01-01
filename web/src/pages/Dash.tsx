import { Plus } from "@phosphor-icons/react";
import BookHolder from "../components/shared/BookHolder";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";
import SearchBar from "../components/shared/SearchBar";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const nav = useNavigate();

  return (
    <ProtectedRoutes>
      <div className="p-5 flex gap-5 items-center">
        <h1 className="font-sacramento text-3xl">luminex</h1>
        <SearchBar />
      </div>
      <div className="p-5 flex flex-col gap-10">
        <div>
          <div className="text-xl mb-2 font-semibold">Continue Reading</div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar">
            <BookHolder />
            <BookHolder />
            <BookHolder />
          </div>
        </div>
        <div>
          <div className="text-xl mb-2 font-semibold">Favourite</div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar">
            <BookHolder showInfo={false} />
            <BookHolder showInfo={false} />
            <BookHolder showInfo={false} />
          </div>
        </div>
        <div>
          <div className="text-xl mb-2 font-semibold">All Book</div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar">
            <BookHolder showInfo={false} />
            <BookHolder showInfo={false} />
            <BookHolder showInfo={false} />
          </div>
        </div>
        <div
          onClick={() => {
            nav("/add");
          }}
          className="fixed bottom-5 right-5 dark:bg-theme-dark-prm bg-theme-light-pop w-[70px] h-[70px] rounded-full flex justify-center items-center"
        >
          <Plus size={25} />
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default Dash;
