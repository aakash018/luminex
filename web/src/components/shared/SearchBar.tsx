import axiosInstance from "@/axiosInstant";
import { Book, ResponseType } from "@/types/global";
import { MagnifyingGlass } from "@phosphor-icons/react";

import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Props {
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<Props> = ({ setBooks, setIsEmpty }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // State to store the timeout ID
  const [typingTimeout, setTypingTimeout] = useState<any>(null);

  useEffect(() => {
    // Clear the timeout whenever the user types
    clearTimeout(typingTimeout);

    const newTimeout = setTimeout(async () => {
      if (searchTerm.trim() === "") {
        setIsEmpty(false);
        setBooks([]);
        return;
      }
      try {
        const res = await axiosInstance.get<ResponseType & { books: Book[] }>(
          "/book/search",
          {
            params: {
              searchTerm,
            },
          }
        );

        if (res.data.status === "ok") {
          if (res.data.books.length === 0) {
            setBooks([]);
            setIsEmpty(true);
          } else {
            setIsEmpty(false);
            setBooks(res.data.books);
          }
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
    }, 1000);

    setTypingTimeout(newTimeout);

    return () => {
      clearTimeout(newTimeout);
    };
  }, [searchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  return (
    <div className="lg:w-[550px] w-full ">
      <div className="lg:h-[43px] h-[35px] flex items-center gap-5 border py-1 px-3 rounded-full dark:border-gray-600 border-black">
        <MagnifyingGlass />
        <input
          type="text"
          className="bg-transparent outline-none text-sm h-full lg:text-base"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
