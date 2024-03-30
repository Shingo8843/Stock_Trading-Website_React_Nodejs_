import { useState, useEffect } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Spinner } from "react-bootstrap";
function SearchBar({ handleClear, fetchsuggestions }) {
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
  function useDebouce(val, delay) {
    const [debounceValue, setDebounceValue] = useState(val);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebounceValue(val);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [val, delay]);
    return debounceValue;
  }
  function onSearchClick() {
    if (!searchValue.trim()) {
      return;
    }
    function handlesearch() {
      console.log("searchValue", searchValue);
      navigate(`/search/${searchValue}`, { state: { search: searchValue } });
      setSuggest([]);
      setShowSuggestions(false);
    }
    if (debouncedSearchValue === searchValue) {
      handlesearch();
    }
  }
  const debouncedSearchValue = useDebouce(searchValue, 500);
  return (
    <Container className="stock-search my-3">
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
        {showSuggestions ? (
          loading || !suggest.length ? (
            <ListGroup className="suggestions-list">
              <ListGroup.Item key={"loading"} className="suggestion-item">
                <Spinner animation="border" />
              </ListGroup.Item>
            </ListGroup>
          ) : (
            <ListGroup className="suggestions-list">
              {suggest.map((s, index) => (
                <ListGroup.Item key={index} className="suggestion-item">
                  <div
                    className="suggestion"
                    onClick={() => {
                      setSearchValue(s.symbol);
                      onSearchClick();
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
      </InputGroup>
    </Container>
  );
}

export default SearchBar;
