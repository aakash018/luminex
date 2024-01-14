import { useEffect, useMemo, useRef, useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import axiosInstance from "../axiosInstant";
import { useParams } from "react-router-dom";
import { Book, ResponseType } from "../types/global";
import "regenerator-runtime/runtime";
// @ts-ignore
// import pub from "../assets/The Vanishing Half -- Bennett, Brit -- 2020 -- Penguin Publishing Group -- 2955133ccf2213bb6a1406036c341952 -- Anna’s Archive.epub";

import { EpubViewer, ReactEpubViewer, ViewerRef } from "react-epub-viewer";
import socket from "../socket";
import { useUser } from "../context/User";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";
import { getReadingLocations, setReadingLocation } from "../readingLocation";
import ReaderNav from "../components/ReaderNav";
import ContentHolder, { Toc } from "../components/ContentHolder";
import { CircleNotch } from "@phosphor-icons/react";

import ReaderSettings from "@/components/ReaderSettings";

// import { socket } from "./Dash";

const fontThemeChange = () => {
  const iframes = document.querySelectorAll("iframe");

  // Loop through each iframe
  iframes.forEach((iframe) => {
    // Access the contentDocument of the iframe
    const iframeDoc = iframe.contentDocument;

    // Check if the iframe has the srcdoc attribute
    if (iframe.getAttribute("srcdoc") && iframeDoc) {
      // Select all div elements inside the iframe
      const divsInsideIframe = iframeDoc.querySelectorAll("html");
      // const pTags = iframeDoc.querySelectorAll("p");

      // Change the font color of all selected divs to white
      divsInsideIframe.forEach((div) => {
        if (document.documentElement.classList.contains("dark")) {
          div.style.color = "white";
        } else {
          div.style.color = "black";
        }
      });
    }
  });
};

function Reader() {
  const { user } = useUser();

  let { bookId } = useParams();
  const [showContentMenu, setShowContentMenu] = useState(false);
  const [book, setBook] = useState<Book | null>(null);
  const [bookURL, setBookURL] = useState<string | null>(null);
  const toc = useRef<Toc[]>([]);
  const viewerRef = useRef<ViewerRef>(null);

  const [bookLoading, setBookLoading] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get<ResponseType & { book?: Book }>(
        "/book/getBook",
        {
          withCredentials: true,
          params: {
            bookId,
          },
        }
      );

      if (res.data.status === "ok" && res.data.book) {
        setBook(res.data.book);
        setBookURL(res.data.book.bookURL);
        setIsFavourite(res.data.book.isFavourited);
      } else {
        console.error(res.data.message);
      }
    })();
  }, []);

  useEffect(() => {
    const checkForElement = () => {
      console.log("HERE");
      const targetElement = document.querySelectorAll("iframe");

      if (targetElement.length !== 0) {
        if (viewerRef.current && book?.location && book.location !== "") {
          viewerRef.current.setLocation(book?.location);
          setReadingLocation(book.location, book.id, book.progress);
          console.log(getReadingLocations());
          setBookLoading(false);
        }
      } else {
        // If the element isn't found, set a timeout and keep checking
        setTimeout(checkForElement, 1500); // Adjust the timeout as needed
      }
    };

    checkForElement(); // Start the checking process initially

    // Clean up the useEffect
  }, [book]);

  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    if (showNav) {
      setTimeout(() => {
        setShowNav(false);
      }, 3000);
    }
  }, [showNav]);

  const reader = useMemo(
    () => (
      <ReactEpubViewer
        url={bookURL as string}
        viewerOption={{
          flow: "scrolled-doc",
          resizeOnOrientationChange: true,
          spread: "none",
        }}
        loadingView={<></>}
        onTocChange={(e) => {
          toc.current = e;
          // setRenderToc((prev) => !prev);
        }}
        onPageChange={(e) => {
          // setPageData(e);
          fontThemeChange();
          const progress = (e.currentPage / e.totalPage) * 100;
          const loc = viewerRef.current?.getCurrentCfi();
          setReadingLocation(
            viewerRef.current!.getCurrentCfi(),
            bookId as string,
            progress
          );

          if (loc !== "") {
            socket.emit("cfiPosition", {
              userId: user?.id,
              loc: loc,
              bookId,
              progress,
            });
          }
        }}
        ref={viewerRef as any}
      />
    ),
    [bookURL]
  );

  return (
    <ProtectedRoutes>
      {bookLoading && (
        <div className="text-white flex justify-center items-center gap-3 absolute top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.69)] z-[10] ">
          <CircleNotch size={32} className="animate-spin" />
          <div className="text-3xl ">Loading</div>
        </div>
      )}
      {false && (
        <div className="flex justify-center items-center gap-3 absolute top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.69)] z-[10]">
          <ReaderSettings />
        </div>
      )}
      <ContentHolder
        toc={toc.current}
        setShow={setShowContentMenu}
        show={showContentMenu}
        viewerRef={viewerRef}
      />
      <div
        className="absolute w-[150px] h-[150px]
       bg-slate-400 z-[100] top-[50%] left-[50%] 
       translate-x-[-50%] translate-y-[-50%] opacity-0"
        onClick={() => setShowNav(true)}
      ></div>
      <div className="flex items-center justify-center w-[100%] h-[100vh]  flex-col bg-white dark:bg-theme-dark-bg transition-colors duration-500">
        {bookURL && (
          <div className="w-full items-center justify-center overflow-hidden lg:overflow-auto">
            {" "}
            {bookURL && (
              <div
                style={{
                  position: "relative",
                  height: "100%",
                }}
              >
                {reader}
              </div>
            )}
          </div>
        )}
      </div>
      <ReaderNav
        themeSwitchCleanup={fontThemeChange}
        setShowContent={setShowContentMenu}
        showNav={showNav}
        isFav={isFavourite}
        setIsFav={setIsFavourite}
      />
    </ProtectedRoutes>
  );
}

export default Reader;
