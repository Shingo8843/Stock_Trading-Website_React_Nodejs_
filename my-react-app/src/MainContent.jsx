import { React } from "react";
import { Container } from "react-bootstrap";
import Search from "./Search/Search";
import Watchlist from "./Watchlist/Watchlist";
import Portfolio from "./Portfolio/Portfolio";
function MainContent() {
  return (
    <Container className="main-content">
      <Search />
      <Watchlist />
      <Portfolio />
    </Container>
  );
}
export default MainContent;
