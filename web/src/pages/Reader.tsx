import { useEffect, useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";
import axiosInstance from "../axiosInstant";
import { useParams } from "react-router-dom";
import { ResponseType } from "../types/global";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

const MAX_PDF_SIZE = 600;

function Reader() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowWidth, setWindowHeight] = useState(
    window.innerWidth <= MAX_PDF_SIZE ? window.innerWidth : MAX_PDF_SIZE
  );

  let { bookId } = useParams();

  const [bookURL, setBookURL] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleResizePDF = () => {
    if (window.innerWidth <= MAX_PDF_SIZE) {
      setWindowHeight(window.innerWidth);
    } else {
      setWindowHeight(MAX_PDF_SIZE);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizePDF);

    return () => {
      window.removeEventListener("resize", handleResizePDF);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get<ResponseType & { bookURL?: string }>(
        "/book/getBookUrl",
        {
          withCredentials: true,
          params: {
            bookId,
          },
        }
      );

      if (res.data.status === "ok" && res.data.bookURL) {
        setBookURL(res.data.bookURL);
      } else {
        console.error(res.data.message);
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-[100vh]  flex-col bg-white dark:bg-theme-dark-bg ">
      {bookURL && (
        <div className="w-full flex items-center justify-center overflow-hidden lg:overflow-auto">
          {" "}
          <Document
            file={bookURL}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            <Page
              pageNumber={pageNumber}
              className={"page"}
              width={windowWidth}
              // height={windowHeight}
              canvasBackground={`${
                document.documentElement.classList.contains("dark")
                  ? "#000a12"
                  : "white"
              }`}
              // canvasBackground="#000a12"
            />
          </Document>
          <p>{/* Page {pageNumber} of {numPages} */}</p>{" "}
          <button onClick={() => setPageNumber((prev) => prev + 1)}>+</button>
          <button onClick={() => setPageNumber((prev) => prev - 1)}>-</button>
        </div>
      )}
    </div>
  );
}

export default Reader;
