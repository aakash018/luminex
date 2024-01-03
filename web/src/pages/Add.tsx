import { useState } from "react";
import Input from "../components/shared/Input";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";

import axiosInstance from "../axiosInstant";
import Button from "../components/shared/Button";
import { Document } from "react-pdf";

const Add = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookPdf, setBookPdf] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const [numPages, setNumPages] = useState<number>();

  const handlelSubmit = async () => {
    if (
      !bookPdf ||
      !cover ||
      bookName.trim() === "" ||
      author.trim() === "" ||
      !numPages
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("book", bookPdf);
    formData.append("bookName", bookName);
    formData.append("author", author);
    formData.append("cover", cover);
    formData.append("totalPages", numPages.toString());

    console.log(formData);

    try {
      const response = await axiosInstance.post("/book/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <ProtectedRoutes>
      {bookPdf && (
        <Document
          file={bookPdf}
          onLoadSuccess={onDocumentLoadSuccess}
        ></Document>
      )}
      <div className="h-[100vh]">
        <div className="w-[80%]">
          <Input label="Book name" value={bookName} setValue={setBookName} />
          <Input label="Author" value={author} setValue={setAuthor} />
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setBookPdf(e.target.files[0]);
              }
            }}
          />
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setCover(e.target.files[0]);
              }
            }}
          />
          <Button onClick={handlelSubmit} label="Submit" />
        </div>
        Pages: {numPages}
      </div>
    </ProtectedRoutes>
  );
};

export default Add;
