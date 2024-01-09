import { Gear, List, Moon, Sun } from "@phosphor-icons/react";
import React, { useState } from "react";
import { isDark } from "../utils/darkOrLight";

interface Props {
  themeSwitchCleanup: () => void;
  setShowContent: React.Dispatch<React.SetStateAction<boolean>>;
  showNav: boolean;
}

const ReaderNav: React.FC<Props> = ({
  themeSwitchCleanup,
  setShowContent,
  showNav,
}) => {
  const [isThemeDark, setIsThemeDark] = useState(isDark());

  const switchNightDark = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsThemeDark(isDark());
    themeSwitchCleanup();
  };
  return (
    <>
      <div
        style={{ backdropFilter: "blur(5px)" }}
        className={`lg:hidden ${
          showNav ? "reader-nav-active" : ""
        } reader-nav fixed bottom-0 w-full h-[60px] dark:bg-[rgba(11,14,32,0.46)] bg-[rgba(255,222,203,0.63)]`}
      >
        <div
          className={`  text-[40px] flex justify-around items-center h-full`}
        >
          {!isThemeDark ? (
            <Moon onClick={switchNightDark} className="cursor-pointer" />
          ) : (
            <Sun onClick={switchNightDark} className="cursor-pointer" />
          )}
          <List onClick={() => setShowContent(true)} />
          <Gear />
        </div>
      </div>
      <div
        style={{ backdropFilter: "blur(5px)" }}
        className={`hidden lg:inline fixed top-0 w-[60px] h-[100vh] dark:bg-[rgba(11,14,32,0.46)] bg-[rgba(255,222,203,0.63)]`}
      >
        <div
          className={`  text-[30px] flex flex-col gap-10 justify-center items-center h-full`}
        >
          {!isThemeDark ? (
            <Moon onClick={switchNightDark} className="cursor-pointer" />
          ) : (
            <Sun onClick={switchNightDark} className="cursor-pointer" />
          )}
          <List onClick={() => setShowContent(true)} />
          <Gear />
        </div>
      </div>
    </>
  );
};

export default ReaderNav;
