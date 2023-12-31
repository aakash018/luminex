import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchBar = () => {
  return (
    <div>
      <div className="flex items-center gap-5 border py-1 px-3 rounded-full dark:border-gray-600 border-black">
        <MagnifyingGlass />
        <input
          type="text"
          className="bg-transparent outline-none text-sm"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
