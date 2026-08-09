"use client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import "./styles/search.css";
import { useRouter } from "next/navigation";

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useRouter();
  const searchHandler = () => {
    navigate.push(`/college/${searchValue}`);
    setShowSearch(!showSearch);
  };
  const EnterHandler = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };
  const inputHandler = (e) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    showSearch && document.body.classList.add("active-search");
    !showSearch && document.body.classList.remove("active-search");
  }, [showSearch]);
  return (
    <div className="searchBar">
      <div className="icon">
        <FaSearch onClick={() => setShowSearch(!showSearch)} />
      </div>
      {showSearch && (
        <div className="fullScreen">
          <div className="full-screen-search">
            <input
              type="text"
              placeholder="Search here..."
              onChange={inputHandler}
              value={searchValue}
              onKeyUp={EnterHandler}
            />
            <div className="flex">
              <IoIosCloseCircle onClick={() => setShowSearch(!showSearch)} />
              <button onClick={searchHandler}>Search</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
