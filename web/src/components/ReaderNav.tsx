import { Gear, Heart, List, Moon, Sun } from "@phosphor-icons/react";
import React, { useState } from "react";
import { isDark } from "../utils/darkOrLight";
import axiosInstance from "../axiosInstant";
import { useParams } from "react-router-dom";
import { ResponseType } from "../types/global";
import { toast } from "sonner";

interface Props {
  themeSwitchCleanup: () => void;
  setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
  showNav: boolean;
  isFav: boolean;
  setIsFav: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReaderNav: React.FC<Props> = ({
  themeSwitchCleanup,
  setShowContent,
  showNav,
  isFav,
  setIsFav,
}) => {
  const [isThemeDark, setIsThemeDark] = useState(isDark());
  const { bookId } = useParams();
  const switchNightDark = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsThemeDark(isDark());
    themeSwitchCleanup();
  };

  const handleFavouriteBook = async () => {
    try {
      const res = await axiosInstance.post<ResponseType>("/book/addFavourite", {
        bookId,
      });
      if (res.data.status === "ok") {
        toast(res.data.message, { position: "top-right" });
        setIsFav(true);
      } else {
        toast(res.data.message, {
          position: "top-right",
          style: { color: "red" },
        });
      }
    } catch {
      toast("failed to connect to server", {
        position: "top-right",
        style: { color: "red" },
      });
    }
  };

  const handleRemoveFavouriteBook = async () => {
    try {
      const res = await axiosInstance.post<ResponseType>(
        "/book/removeFavourite",
        {
          bookId,
        }
      );
      if (res.data.status === "ok") {
        toast(res.data.message, { position: "top-right" });
        setIsFav(false);
      } else {
        toast(res.data.message, {
          position: "top-right",
          style: { color: "red" },
        });
      }
    } catch {
      toast("failed to connect to server", {
        position: "top-right",
        style: { color: "red" },
      });
    }
  };

  return (
    <>
      <div
        style={{ backdropFilter: "blur(5px)" }}
        className={`lg:hidden ${
          showNav ? "reader-nav-active" : ""
        } reader-nav fixed bottom-0 w-full h-[60px] dark:bg-[rgba(11,14,32,0.46)] bg-[rgba(255,222,203,0.63)]`}
      >
        <div className={`text-[25px] flex justify-around items-center h-full`}>
          <Heart
            onClick={isFav ? handleRemoveFavouriteBook : handleFavouriteBook}
            weight={isFav ? "fill" : "regular"}
            className="cursor-pointer"
          />
          {!isThemeDark ? (
            <Moon onClick={switchNightDark} className="cursor-pointer" />
          ) : (
            <Sun onClick={switchNightDark} className="cursor-pointer" />
          )}
          <List
            onClick={() => setShowContent((prev) => !prev)}
            className="cursor-pointer"
          />
          <Gear />
        </div>
      </div>
      <div
        style={{ backdropFilter: "blur(5px)" }}
        className={`hidden lg:inline fixed top-0 w-[60px] h-[100vh] dark:bg-[rgba(11,14,32,0.46)] bg-[rgba(255,222,203,0.63)]`}
      >
        <div
          className={`text-[30px] flex flex-col gap-10 justify-center items-center h-full`}
        >
          <Heart
            onClick={isFav ? handleRemoveFavouriteBook : handleFavouriteBook}
            weight={isFav ? "fill" : "regular"}
            className="cursor-pointer"
          />
          {!isThemeDark ? (
            <Moon onClick={switchNightDark} className="cursor-pointer" />
          ) : (
            <Sun onClick={switchNightDark} className="cursor-pointer" />
          )}
          <List
            onClick={() => setShowContent((prev) => !prev)}
            className="cursor-pointer"
          />
          <Gear className="cursor-pointer" />
        </div>
      </div>
    </>
  );
};

export default ReaderNav;
