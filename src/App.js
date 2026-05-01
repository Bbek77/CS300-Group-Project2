import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import WatchlistPage from "./pages/WatchlistPage";
import LoginPage from "./pages/LoginPage";
import MovieDetails from "./pages/MovieDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;