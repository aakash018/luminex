import { Plus } from "@phosphor-icons/react";
import BookHolder from "../components/shared/BookHolder";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";
import SearchBar from "../components/shared/SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstant";
import { Book, ResponseType } from "../types/global";

import socket from "../socket";

const Dash = () => {
  const nav = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get<ResponseType & { books?: Book[] }>(
          "/book/get-1",
          {
            withCredentials: true,
          }
        );

        if (res.data.status === "ok" && res.data.books) {
          setBooks(res.data.books);
        }
      } catch {
        console.log("ERROR");
      }
    })();
  }, []);

  useEffect(() => {
    console.log("first");
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);

  return (
    <ProtectedRoutes>
      <div className="lg:px-[150px] p-5 flex gap-5 items-center">
        <h1 className="font-sacramento lg:text-3xl text-2xl">luminex</h1>
        <div className="lg:m-auto">
          <SearchBar />
        </div>
      </div>
      <div className="lg:px-[150px] p-5 flex flex-col gap-10 lg:mt-5">
        <div>
          <div className="text-md mb-2 font-semibold lg:mb-3">
            Continue Reading
          </div>
          <div className="flex gap-5 lg:gap-10 overflow-x-auto no-scrollbar">
            {books.map((book) => (
              <BookHolder
                key={book.id}
                id={book.id}
                author={book.author}
                cover={book.coverURL}
                name={book.name}
                progress={book.progress}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-md mb-2 font-semibold">Favourite</div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar"></div>
        </div>
        <div>
          <div className="text-md mb-2 font-semibold">All Book</div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar"></div>
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
