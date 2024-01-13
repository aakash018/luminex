import { Plus, X } from "@phosphor-icons/react";
import BookHolder from "../components/shared/BookHolder";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";
import SearchBar from "../components/shared/SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstant";
import { Book, ResponseType } from "../types/global";

import socket from "../socket";
import { clearReadingLocation, getReadingLocations } from "../readingLocation";
import Settings from "../components/Settings";

const Dash = () => {
  const nav = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [favBooks, setFavBooks] = useState<Book[]>([]);
  const [contBooks, setContBooks] = useState<Book[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get<ResponseType & { books?: Book[] }>(
          "/book/getBooksByUser",
          {
            withCredentials: true,
          }
        );

        if (res.data.status === "ok" && res.data.books) {
          setBooks(res.data.books);

          const favBook = res.data.books.filter((book) => book.isFavourited);
          const contBook = res.data.books.filter((book) => book.progress > 0);
          setContBooks(contBook);
          setFavBooks(favBook);
        }
      } catch {
        console.log("ERROR");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const readingLoc = getReadingLocations();

      if (readingLoc.bookId.trim() !== "" || readingLoc.loc.trim() !== "") {
        if (readingLoc.loc.split("/").length - 1 <= 4) return;

        try {
          const res = await axiosInstance.post<ResponseType>(
            "/book/updateProgress",
            {
              bookId: readingLoc.bookId,
              location: readingLoc.loc,
              progress: readingLoc.progress,
            }
          );
          clearReadingLocation();

          if (res.data.status === "ok") {
            console.log(res.data.message);
          } else {
            console.log(res.data.message);
          }
        } catch (e) {
          console.log(e);
        }
      }
    })();
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }, []);
  const [show, setShow] = useState(false);

  return (
    <ProtectedRoutes>
      <Settings show={show} />
      <div className="lg:px-[150px] px-5">
        <div className=" py-5 flex gap-5 items-center justify-between">
          <h1 className="font-sacramento lg:text-3xl text-2xl">luminex</h1>
          <div className="lg:m-auto">
            <SearchBar />
          </div>
          <div
            onClick={() => setShow((prev) => !prev)}
            className="flex justify-center items-center relative lg:w-[50px] lg:h-[50px] w-[30px] h-[30px] rounded-full bg-slate-900 z-[100] cursor-pointer"
          >
            <X />
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:mt-5">
          <div>
            <div className="text-md mb-2 font-semibold lg:mb-3">
              Continue Reading
            </div>
            <div className="flex gap-5 lg:gap-10 overflow-x-auto no-scrollbar">
              {contBooks.map((book) => (
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
            <div className="flex gap-5 lg:gap-10 overflow-x-auto no-scrollbar">
              {favBooks.map((book) => (
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
          <div className="pb-5">
            <div className="text-md mb-2 font-semibold">All Book</div>
            <div className="flex flex-wrap gap-5 lg:gap-10 overflow-x-auto no-scrollbar">
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
          <div
            onClick={() => {
              nav("/add");
            }}
            className="fixed bottom-5 right-5 dark:bg-theme-dark-prm bg-theme-light-pop w-[70px] h-[70px] rounded-full flex justify-center items-center"
          >
            <Plus size={25} />
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default Dash;
