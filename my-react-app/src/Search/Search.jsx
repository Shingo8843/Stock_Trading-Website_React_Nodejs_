import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
function Search() {
  return (
    <div className="search my-3">
      <h1 className="searchtitle">Stock Search</h1>
      <SearchBar />
      <SearchResult />
    </div>
  );
}
export default Search;
