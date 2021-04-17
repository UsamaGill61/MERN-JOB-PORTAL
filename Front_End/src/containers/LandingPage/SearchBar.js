import React, { useEffect, useState } from "react";

const SearchBar = ({ setQueryWord }) => {
  const [queryWord, setqueryWord] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setQueryWord(queryWord);
  };

  return (
    <div className="input-group">
      <div className="form-outline">
        <input
          style={{ width: "500px" }}
          type="search"
          placeholder="Search For Jobs"
          id="form1"
          className="form-control"
          onChange={(e) => setqueryWord(e.target.value)}
        />
      </div>
      <button
        onClick={handleOnSubmit}
        type="submit"
        className="btn btn-primary px-4"
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
