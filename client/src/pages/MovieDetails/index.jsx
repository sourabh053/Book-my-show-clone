import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetMovieById } from "../../apicalls/movies";
import moment from "moment";

const MovieDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  function formatMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
  const back = "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/black-bag-et00431634-1738307049.jpg";
    const cast = [{
        name:"Cate Blanchett",
        role: "Actor",
        image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/cate-blanchett-394-24-03-2017-12-31-20.jpg",
    },
    {
        name:"Michael Fassbender",
        role: "Actor",
        image: "https://in.bmscdn.com/iedb/artist/images/website/poster/large/michael-fassbender-1454-24-03-2017-13-56-27.jpg",
    },{
        name:"Marisa Abela",
        role: "Actor",
        image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/marisa-abela-2034074-1706891889.jpg",
    },{
        name:"Tom Burke",
        role: "Actor",
        image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tom-burke-37158-1701411681.jpg",
    },{
        name:"Naomie Harris",
        role: "Actor",
        image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/naomie-harris-1549-24-03-2017-13-49-15.jpg",
    }];
    const crew = [{
        name:"Steven Soderbergh",
        role: "Director",
        image: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/steven-soderbergh-2253-1674808690.jpg",
    }];
  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await GetMovieById(params.id);
      console.log(response);

      if (response.success) {
        setMovie(response.data);
      } else {
        message.error("Movie Not Found");
        navigate("/");
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error("Movie Not Found");
      //   navigate("/");
    }
  };
  useEffect(() => {
    if (!movie?._id) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(90deg,
              #1A1A1A 24.97%,
              #1A1A1A 38.3%,                         
              #1A1A1A 100%)`,
        }}
        className="absolute left-0 top-16 w-screen bg-cover bg-center"
      >
        <div className="md:hidden"><img src={movie?.backPhoto} alt="back" />
        </div>
        <div className="hidden md:flex container mx-auto px-4 py-8 gap-8 bg-no-repeat bg-cover"  style={{
          backgroundImage: `linear-gradient(90deg,
              #1A1A1A 24.97%,
              #1A1A1A 38.3%,
              rgba(26, 26, 26, 0.0409746) 97.47%,
              #1A1A1A 100%),
              url(${movie?.backPhoto})`,
        }}>
          <div>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-[300px] h-[450px] rounded-xl shadow-lg"
            />
          </div>          
            {/* Movie Info */}
            <div className="text-white flex flex-col justify-center gap-4">
              <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>

              {/* Meta Information */}
              <div className="flex justify-start gap-2">
              <span className="px-3 py-1 bg-[#e5e5e5] rounded-sm text-black text-sm">
                  2D
                </span>
              <span className="px-3 py-1 bg-[#e5e5e5] rounded-sm text-black text-sm">
                  {movie.language}
                </span>
              </div>
              <div className="flex mb-5">
                <span className="pr-3 py-1 text-base">
                  {formatMinutes(movie.duration)}
                </span>
                <span className="text-base">.</span>
                <div className="flex items-center">
                  {movie?.genre?.map((val, index) => (
                    <React.Fragment key={index}>
                      <span className="px-1 py-1 text-base">{val}</span>
                      {index < movie.genre.length - 1 && <span className="text-base">,</span>}
                    </React.Fragment>
                  ))}
                </div>
                <span className="text-base">.</span>
                <span className="px-3 py-1 text-base">
                  {moment(movie.releaseDate).format("DD MMM YYYY")}
                </span>
              </div>

              {/* Book Button */}
              <button className="bg-[#FF4E6E] hover:bg-[#ff3557] text-white font-bold py-3 px-8 rounded-lg transition-colors"
              onClick={()=> navigate(`/movie/book/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)}>
                Book Tickets
              </button>
            </div>
          
        </div>
      </div>
      {/* mobile view */}
      <div className="md:hidden mb-4 mt-48">
        <h3 className="text-xl font-bold">{movie.title}</h3>
      </div>
      <div className="flex md:hidden justify-start gap-2">
        <span className="px-3 py-1 bg-[#e5e5e5] rounded-sm text-black text-sm">
          2D
        </span>
        <span className="px-3 py-1 bg-[#e5e5e5] rounded-sm text-black text-sm">
          {movie.language}
        </span>
      </div>
      <div className="flex">
        <span className="pr-3 py-1 text-sm">
          {formatMinutes(movie.duration)}
        </span>
        <span className="text-sm">.</span>
        {movie?.genre?.map((val, index) => (
            <React.Fragment key={index}>
              <span className="px-1 py-1 text-base">{val}</span>
              {index < movie.genre.length - 1 && <span className="text-base">,</span>}
            </React.Fragment>
        ))}
        <span className="text-sm">.</span>
        <span className="px-3 py-1 text-sm">
          {moment(movie.releaseDate).format("DD MMM YYYY")}
        </span>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:hidden z-50">
        <button 
          className="bg-[#FF4E6E] hover:bg-[#ff3557] text-white font-bold py-3 px-8 rounded-lg transition-colors w-full"
          onClick={() => navigate(`/movie/book/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)}
        >
          Book Tickets
        </button>
      </div>
      <section className="md:mt-[514px] py-4 md:py-8 border-b border-[#e5e5e5] border-solid">
        <h2 className="text-lg md:text-2xl font-bold">About the movie</h2>
        <p className="text-sm md:text-base mt-2">{movie?.description}</p>
      </section>
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Cast</h2>
        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
          {movie?.cast?.map((actor, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              <div className="w-28 h-28 mx-auto mb-2 overflow-hidden rounded-full">
                <img
                  src={actor?.image}
                  alt={actor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">{actor?.name}</p>
              <p className="text-xs text-gray-500">{actor?.role}</p>
            </div>
          ))}
          {(!movie?.cast || movie?.cast?.length === 0) && (
            <p className="text-gray-500 italic">No cast information available</p>
          )}
        </div>
      </section>
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">Crew</h2>
        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide">
          {movie?.crew?.map((actor, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              <div className="w-28 h-28 mx-auto mb-2 overflow-hidden rounded-full">
                <img
                  src={actor?.image}
                  alt={actor?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">{actor?.name}</p>
              <p className="text-xs text-gray-500">{actor?.role}</p>
            </div>
          ))}
          {(!movie?.crew || movie?.crew?.length === 0) && (
            <p className="text-gray-500 italic">No crew information available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
