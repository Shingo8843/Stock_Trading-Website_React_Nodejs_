import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import Header from "../Header";
import { Container } from "react-bootstrap";
function Search() {
  return (
    <Container>
      <Header />
      <Container className="main-content">
        <div className="search my-3">
          <h1 className="searchtitle">Stock Search</h1>
          <SearchBar />
          <SearchResult />
        </div>
      </Container>
    </Container>
  );
}
export default Search;
