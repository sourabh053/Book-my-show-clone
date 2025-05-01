import React, { useEffect } from "react";
import MovieForm from "./MovieForm";
import { message,Button } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
 import { DeleteMovie, GetAllMovies } from "../../apicalls/movies";
import MovieTable from "../../components/MovieTable";

function MoviesList() {
  const [movies, setMovies] = React.useState([]);
  const [showMovieFormModal, setShowMovieFormModal] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [formType, setFormType] = React.useState("add");
  const dispatch = useDispatch();
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

  const handleDelete = async (movieId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteMovie(movieId);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleEdit = (movie) => {
    console.log('Edit movie:', movie);
    setSelectedMovie(movie);
    setFormType("edit");
    setShowMovieFormModal(true);
  };
  useEffect(() => {
    getData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <Button          
          variant="outlined"
          onClick={() => {
            setShowMovieFormModal(true);
            setFormType("add");
          }}
          type="primary"
        >Add Movie</Button>
      </div>
      
      <div className="container mx-auto p-4">
       <MovieTable
        movies={movies}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>

      {showMovieFormModal && (
        <MovieForm
          showMovieFormModal={showMovieFormModal}
          setShowMovieFormModal={setShowMovieFormModal}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          formType={formType}
          getData={getData}
        />
      )}
    </div>
  );
}

export default MoviesList;