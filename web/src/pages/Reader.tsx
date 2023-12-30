import { useEffect, useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const options = {
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
};

const MAX_PDF_SIZE = 1000;

function Reader() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth <= MAX_PDF_SIZE ? window.innerWidth : MAX_PDF_SIZE
  );

  const [pdfFile, setPDFFile] = useState<File | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const handleResizePDF = () => {
    if (window.innerWidth <= MAX_PDF_SIZE) {
      setWindowWidth(window.innerWidth);
    } else {
      setWindowWidth(MAX_PDF_SIZE);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizePDF);

    return () => {
      window.removeEventListener("resize", handleResizePDF);
    };
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full flex-col">
      <div className="bg-slate-500">sadasdad</div>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            setPDFFile(e.target.files[0]);
          }
        }}
      />
      {pdfFile && (
        <div className="w-full flex items-center justify-center overflow-hidden">
          {" "}
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
            className={"text!"}
          >
            <Page
              pageNumber={pageNumber}
              className={"page"}
              width={windowWidth}
              //   canvasBackground="black"
            />
          </Document>
          {/* <p>
            Page {pageNumber} of {numPages}
          </p>{" "} */}
        </div>
      )}

      <button onClick={() => setPageNumber((prev) => prev + 1)}>+</button>
      <button onClick={() => setPageNumber((prev) => prev - 1)}>-</button>
    </div>
  );
}

export default Reader;
