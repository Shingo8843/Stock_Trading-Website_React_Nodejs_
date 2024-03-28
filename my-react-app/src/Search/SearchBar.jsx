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
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
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
    navigate(`/search/${searchValue}`, { state: { search: searchValue } });
    setSuggest([]);
  }

  return (
    <div className="stock-search my-3">
      <InputGroup>
        <FormControl
          placeholder="Search for a stock..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button onClick={onSearchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <Button onClick={handleClear}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </InputGroup>
      {loading || !suggest.length ? (
        <p>Loading...</p>
      ) : (
        <ListGroup className="suggestions">
          {suggest.map((s, index) => (
            <ListGroup.Item key={index}>
              <div
                className="suggestion"
                onClick={() => {
                  setSearchValue(s.symbol);
                  navigate("/search", { state: { search: s.symbol } }); // Navigate with state when suggestion is clicked
                }}
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
