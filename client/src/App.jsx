import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

//stylesheets
import "./stylesheets/custom.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/theme.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import BookShow from "./pages/BookShow";
import TheatresForMovie from "./pages/TheatresForMovie";
import MovieDetails from "./pages/MovieDetails";
import MainImage1 from "../src/assets/movie.avif"; // You'll need to ensure these images exist
import MainImage2 from "../src/assets/movie2.avif";
import MainImage3 from "../src/assets/movie3.avif";
import MainImage4 from "../src/assets/movie4.avif";
import MainImage5 from "../src/assets/movie5.avif";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  const images = [MainImage1, MainImage2, MainImage3, MainImage4, MainImage5];
  const [currentImageIndex, setCurrentImageIndex] = useState(
    Math.floor(Math.random() * images.length)
  );

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);
  return (
    <div>
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              >
                <Home searchTerm={searchTerm} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movie/book/:id"
            element={
              <ProtectedRoute>
                <TheatresForMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <Login currentImageIndex={currentImageIndex} images={images} />
            }
          />
          <Route
            path="/register"
            element={
              <Register currentImageIndex={currentImageIndex} images={images} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
