import { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function SearchBar({
  handleSearch, // This now navigates to `/search` with state
  handleClear,
  fetchsuggestions,
}) {
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      setShowSuggestions(true);
      fetchsuggestions(searchValue).then((data) => {
        setSuggest(data);
        setLoading(false);
      });
    } else {
      setSuggest([]);
    }
  }, [searchValue]);

  function onSearchClick() {
    if (!searchValue.trim()) {
      return;
    }
    console.log("searchValue", searchValue);
    navigate(`/search/${searchValue}`, { state: { search: searchValue } });
    setSuggest([]);
  }

  return (
    <div className="stock-search my-3">
      <InputGroup className="search-input-group">
        <FormControl
          placeholder="Enter stock ticker symbol"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
        />

        <Button
          variant="outline-secondary"
          onClick={onSearchClick}
          className="search-btn"
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={handleClear}
          className="clear-btn"
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </InputGroup>
      {showSuggestions ? (
        loading || !suggest.length ? (
          <p>Loading...</p>
        ) : (
          <ListGroup className="suggestions-list">
            {suggest.map((s, index) => (
              <ListGroup.Item key={index} className="suggestion-item">
                <div
                  className="suggestion"
                  onClick={() => {
                    setSearchValue(s.symbol);
                    navigate("/search", { state: { search: s.symbol } });
                  }}
                >
                  <span>
                    {s.symbol} | {s.description}
                  </span>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )
      ) : null}
    </div>
  );
}

export default SearchBar;
