import { Plus, User, WarningCircle } from "@phosphor-icons/react";
import BookHolder from "../components/shared/BookHolder";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";
import SearchBar from "../components/shared/SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../axiosInstant";
import { Book, ResponseType } from "../types/global";
import { toast } from "sonner";

import socket from "../socket";
import { clearReadingLocation, getReadingLocations } from "../readingLocation";
import { setAccessToken } from "@/accessToken";
import axios from "axios";

export const isDark = () => {
  return document.documentElement.classList.contains("dark");
};

const Dash = () => {
  const nav = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [favBooks, setFavBooks] = useState<Book[]>([]);
  const [contBooks, setContBooks] = useState<Book[]>([]);

  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

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

  const handleLightDarkSwitch = () => {
    const payload = {
      theme: "",
    };
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setTheme("Light");
      payload.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      setTheme("Dark");
      payload.theme = "dark";
    }
    axiosInstance.get("/user/setTheme", {
      withCredentials: true,
      params: payload,
    });
    setShowMenu(false);
  };

  const initialized = useRef(false);
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
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
            toast(res.data.message, {
              style: { color: "green" },
              position: "top-right",
            });
          } else {
            toast(res.data.message, {
              style: { color: "red" },
              position: "top-right",
            });
          }
        } catch (e) {
          toast("error saving last progress", {
            style: { color: "red" },
            position: "top-right",
          });
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
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState<"Dark" | "Light">(
    isDark() ? "Dark" : "Light"
  );

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.get<ResponseType>("/auth/logout", {
        withCredentials: true,
      });

      if (res.data.status === "ok") {
        setAccessToken("");
        nav("/login");
      } else {
        toast("failed to logout", { position: "top-right" });
      }
    } catch {
      toast("failed to connect to servers", {
        position: "top-right",
        style: { color: "red " },
      });
    }
  };

  return (
    <ProtectedRoutes>
      {/* <Settings show={show} /> */}
      <div className="lg:px-[150px] px-5">
        <div className=" py-5 flex gap-5 items-center justify-between relative">
          <h1 className="font-sacramento lg:text-3xl text-2xl">luminex</h1>
          <div className="lg:m-auto">
            <SearchBar
              setBooks={setSearchedBooks}
              setIsEmpty={setIsSearchEmpty}
            />
          </div>
          <div>
            <User
              className="text-xl lg:text-2xl cursor-pointer "
              onClick={() => setShowMenu((prev) => !prev)}
            />
            <div
              className={`profile-setting ${
                showMenu ? "profile-setting-active" : ""
              } absolute z-[3] right-0 dark:bg-[#0b1720] bg-theme-light-prm rounded-sm mt-2`}
            >
              <ul>
                <li className="px-10 py-3 text-center cursor-pointer">
                  Profile
                </li>
                <li
                  className="px-10 py-3 cursor-pointer"
                  onClick={handleLightDarkSwitch}
                >
                  Theme: {theme}
                </li>
                <li
                  className="px-10 py-3 cursor-pointer text-center text-theme-default-error"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>

        {searchedBooks.length !== 0 && !isSearchEmpty && (
          <div className="mt-10">
            <div className="text-md mb-5 font-semibold lg:mb-3">
              Searched Books
            </div>
            <div className="flex gap-5 lg:gap-10 flex-wrap no-scrollbar justify-center lg:justify-start">
              {searchedBooks.map((book) => (
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
        )}

        {searchedBooks.length === 0 && isSearchEmpty && (
          <div className="mt-10">
            <div className="text-md mb-5 font-semibold lg:mb-3">
              Searched Books
            </div>
            <div className="w-full h-[200px] flex justify-center items-center">
              <div className="flex flex-col items-center gap-3">
                <WarningCircle size={32} />
                <div>No results found</div>
              </div>
            </div>
          </div>
        )}

        {searchedBooks.length === 0 && !isSearchEmpty && (
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
              <div className="flex justify-center w-full md:justify-start  ">
                <div className="w-[330px] md:w-full flex flex-wrap gap-5 lg:gap-10 overflow-x-auto no-scrollbar ">
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
        )}
      </div>
    </ProtectedRoutes>
  );
};

export default Dash;
