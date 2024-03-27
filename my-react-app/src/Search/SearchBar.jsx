import { React, useState, useEffect } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

function SearchBar({
  searchValue,
  setSearchValue,
  handleSearch,
  handleClear,
  fetchsuggestions,
}) {
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        if (!searchValue.trim()) return;
        handleSearch();
        setSuggest([]);
      }
    };
    addEventListener("keydown", handleKeyDown);
    return () => {
      removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      fetchsuggestions(searchValue).then((data) => {
        setSuggest(data);
        setLoading(false);
        console.log(data);
      });
    } else {
      setSuggest([]);
    }
  }, [searchValue]);
  function onSearch() {
    setSuggest([]);
    handleSearch();
  }

  return (
    <div className="stock-search my-3 ">
      <InputGroup>
        <FormControl
          placeholder="Search for a stock..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button onClick={onSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <Button onClick={handleClear}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </InputGroup>
      {loading | !suggest ? (
        <p>Loading</p>
      ) : (
        <ListGroup className="suggestions">
          {suggest.map((s) => (
            <ListGroup.Item>
              <div
                key={s.symbol}
                className="suggestion"
                onClick={() => setSearchValue(s.symbol)}
              >
                <span>
                  {s.symbol} | {s.description}
                </span>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default SearchBar;
