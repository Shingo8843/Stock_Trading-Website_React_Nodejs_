import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search/Search";
import Watchlist from "./Watchlist/Watchlist";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <Watchlist />
      <Footer />
    </div>
  );
}

export default App;
