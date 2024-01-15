import { useRef, useState } from "react";
import InputCust from "../components/shared/Input";
import ProtectedRoutes from "../components/shared/ProtectedRoutes";
import { Input } from "@/components/ui/input";

import axiosInstance from "../axiosInstant";
import Button from "../components/shared/Button";
import { Plus } from "@phosphor-icons/react";
import { ResponseType } from "@/types/global";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookPdf, setBookPdf] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const imgUploaderRef = useRef<HTMLInputElement>(null);
  const epubUploaderRef = useRef<HTMLInputElement>(null);
  const [epubName, setEpubName] = useState<string | null>(null);
  const nav = useNavigate();

  const [error, setError] = useState({
    display: false,
    message: "",
  });

  const handlelSubmit = async () => {
    if (!bookPdf || !cover || bookName.trim() === "" || author.trim() === "") {
      return setError({
        display: true,
        message: "empty fields",
      });
    }

    if (bookPdf.type !== "application/epub+zip") {
      return setError({
        display: true,
        message: "please make sure book is in epub formate",
      });
    }

    if (cover.type.split("/")[0] !== "image") {
      return setError({
        display: true,
        message: "unsupported formate for cover image",
      });
    }

    const formData = new FormData();
    formData.append("book", bookPdf);
    formData.append("bookName", bookName);
    formData.append("author", author);
    formData.append("cover", cover);
    formData.append("totalPages", "322");

    try {
      setLoading(true);
      const response = await axiosInstance.post<ResponseType>(
        "/book/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      if (response.data.status === "ok") {
        toast(response.data.message, {
          position: "top-center",
          style: { color: "green" },
        });
        nav("/");
      } else {
        setError({
          display: true,
          message: response.data.message,
        });
      }
    } catch (error) {
      setLoading(false);

      setError({
        display: true,
        message: "server error while uploading file",
      });
    }
  };

  const handleImageUpload = () => {
    imgUploaderRef.current?.click();
  };

  return (
    <ProtectedRoutes>
      <div className="h-[100vh] md:flex justify-center">
        <div className="w-full p-10 md:flex flex-row-reverse justify-around items-center lg:justify-center lg:gap-16">
          <div className="w-full md:w-fit flex justify-center  mb-10 md:mb-0 md:justify-start">
            <div
              onClick={handleImageUpload}
              className="cursor-pointer w-[150px] h-[200px] md:w-[200px] md:h-[300px] 
                        flex justify-center items-center bg-theme-light-prm-light dark:bg-[rgba(11,14,32,0.46)] rounded-sm overflow-hidden"
            >
              {!cover && <Plus />}
              {cover && (
                <img
                  src={URL.createObjectURL(cover)}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
          </div>
          <div className=" flex flex-col gap-10 md:w-2/4 ">
            {error.display && (
              <div className=" py-5 text-theme-default-error font-semibold text-xl">
                {error.message}
              </div>
            )}
            <InputCust
              label="Book name"
              value={bookName}
              setValue={setBookName}
            />
            <InputCust label="Author" value={author} setValue={setAuthor} />
            <input
              className="hidden "
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setBookPdf(e.target.files[0]);
                  setEpubName(e.target.files[0].name);
                }
              }}
              ref={epubUploaderRef}
            />
            <div
              className="cursor-pointer px-5 py-2 dark:border-theme-dark-prm border border-theme-light-prm "
              onClick={() => epubUploaderRef.current?.click()}
            >
              {!epubName ? "Upload an Epub file" : epubName}
            </div>
            <input
              type="file"
              className="hidden"
              ref={imgUploaderRef}
              onChange={(e) => {
                if (e.target.files) {
                  setCover(e.target.files[0]);
                  console.log(e.target.files[0].type.split("/")[0]);
                }
              }}
            />
            <Button onClick={handlelSubmit} label="Submit" disabled={loading} />
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default Add;
