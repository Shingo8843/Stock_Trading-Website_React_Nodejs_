import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ searchValue, setSearchValue, handleSearch, handleClear }) {
  return (
    <div className="stock-search my-3 ">
      <InputGroup>
        <FormControl
          placeholder="Search for a stock..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <Button onClick={handleClear}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
