import { useEffect, useRef, useState } from "react";

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

// import { socket } from "./Dash";

function Reader() {
  const [pageData, setPageData] = useState<any>();
  const { user } = useUser();

  let { bookId } = useParams();

  const [book, setBook] = useState<Book | null>(null);
  const [bookURL, setBookURL] = useState<string | null>(null);
  const viewerRef = useRef<ViewerRef>(null);

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
      } else {
        console.error(res.data.message);
      }
    })();
  }, []);

  useEffect(() => {
    const checkForElement = () => {
      const targetElement = document.querySelectorAll("iframe");

      if (targetElement.length !== 0) {
        if (viewerRef.current && book?.location && book.location !== "") {
          console.log(book.location);
          viewerRef.current.setLocation(book?.location);
        }
      } else {
        // If the element isn't found, set a timeout and keep checking
        setTimeout(checkForElement, 1500); // Adjust the timeout as needed
      }
    };

    checkForElement(); // Start the checking process initially

    // Clean up the useEffect
  }, [book]);

  return (
    <ProtectedRoutes>
      <div className="flex items-center justify-center w-[100%] h-[100vh]  flex-col bg-white dark:bg-theme-dark-bg ">
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
                <ReactEpubViewer
                  url={bookURL}
                  viewerOption={{
                    flow: "scrolled-doc",
                    resizeOnOrientationChange: true,
                    spread: "none",
                  }}
                  onPageChange={(e) => {
                    // setPageData(e);
                    const iframes = document.querySelectorAll("iframe");

                    // Loop through each iframe
                    iframes.forEach((iframe) => {
                      // Access the contentDocument of the iframe
                      const iframeDoc = iframe.contentDocument;

                      // Check if the iframe has the srcdoc attribute
                      if (iframe.getAttribute("srcdoc") && iframeDoc) {
                        // Select all div elements inside the iframe
                        const divsInsideIframe =
                          iframeDoc.querySelectorAll("html");
                        // const pTags = iframeDoc.querySelectorAll("p");

                        // Change the font color of all selected divs to white
                        divsInsideIframe.forEach((div) => {
                          div.style.color = "white";
                        });
                      }
                    });

                    socket.emit("cfiPosition", {
                      userId: user?.id,
                      loc: viewerRef.current?.getCurrentCfi(),
                      bookId,
                      progress: (e.currentPage / e.totalPage) * 100,
                    });
                  }}
                  ref={viewerRef as any}
                />
              </div>
            )}
            {/* {console.log(viewerRef.current)} */}
            <p>{/* Page {pageNumber} of {numPages} */}</p>{" "}
          </div>
        )}
      </div>
    </ProtectedRoutes>
  );
}

export default Reader;
