import { useNavigate } from "react-router-dom";
import moment from "moment";

export const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movie/${movie._id}`);
    };
  
    return (
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-transform duration-300 hover:-translate-y-1"
        onClick={handleClick}
      >
        <img 
          src={movie?.poster} 
          alt={`${movie?.title} Poster`} 
          className="w-full h-64 object-cover"
        />
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            {/* <div className="font-bold text-red-600">{movie?.rating}/10</div>
            <div className="text-xs text-gray-500">{movie?.votes} votes</div> */}
          </div>
          <h3 className="font-bold text-gray-800 truncate mb-2">{movie?.title}</h3>
          <div className="flex flex-wrap gap-1">
            {movie?.genre?.map((genre, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };