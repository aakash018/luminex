import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchBar = () => {
  return (
    <div className="lg:w-[550px] ">
      <div className="lg:h-[43px] h-[35px] flex items-center gap-5 border py-1 px-3 rounded-full dark:border-gray-600 border-black">
        <MagnifyingGlass />
        <input
          type="text"
          className="bg-transparent outline-none text-sm h-full lg:text-base"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
