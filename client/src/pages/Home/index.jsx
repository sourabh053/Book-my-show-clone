import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";

import { GetAllMovies } from "../../apicalls/movies";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import { MovieCard } from "../../components/MovieCard";

const Home = ({searchTerm}) => {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const filteredMovies = movies.filter(movie => {
    if (searchTerm === "") return true;
    
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = movie?.title?.toLowerCase()?.includes(searchLower);
    const genreMatch = movie?.genre?.some(genre => 
      genre.toLowerCase().includes(searchLower)
    );
    
    return titleMatch || genreMatch;
  });
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Currently showing Movies</h2>
        
        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredMovies?.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
        
        {/* No Results Message */}
        {filteredMovies.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No movies found matching "{searchTerm}"</p>
          </div>
        )}
      </main>    
  );
};

export default Home;
