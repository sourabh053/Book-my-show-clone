import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetMovieById } from "../../apicalls/movies";
import moment from "moment";
import { GetAllTheatresByMovie } from "../../apicalls/theatres";

function TheatresForMovie() {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [theatres, setTheatres] = useState([]);
  const queryDate = new URLSearchParams(location.search).get("date");
  const [date, setDate] = useState(queryDate || moment().format("YYYY-MM-DD"));
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // Generate dates for the next 7 days
    const datesArray = [];
    for (let i = 0; i < 7; i++) {
      const date = moment().add(i, 'days');
      datesArray.push({
        date: date.format("YYYY-MM-DD"),
        day: date.format("ddd"),
        dateNum: date.format("DD"),
        isActive: i === 0
      });
    }
    setDates(datesArray);
  }, []);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetMovieById(params.id);
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
      navigate("/");
    }
  };

  const getTheatres = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByMovie({
        date,
        movieId: params.id,
      });
      if (response.success) {
        setTheatres(response.data);
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
    if (!movie?._id) {
      getData();
    }
    getTheatres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {movie?._id && (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          {/* Movie Header Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {movie.title} <span className="text-gray-600">({movie.language})</span>
            </h1>
            <div className="flex flex-wrap gap-2 mb-2 sm:mb-4">
              {movie?.genre?.map((genre, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 text-xs sm:text-sm rounded-full px-2 py-1"
              >
                {genre}
              </span>
            ))}
              <span className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm text-gray-700">
                {moment(movie.releaseDate).format("MMM Do yyyy")}
              </span>
            </div>
          </div>

          {/* Calendar Strip */}
          <div className="bg-white rounded-lg shadow-md mb-4 sm:mb-8">
            <div className="flex justify-between max-w-[500px]">
              {dates.map((d, index) => (
                <button
                  key={d.date}
                  onClick={() => {
                    setDate(d.date);
                    navigate(`/movie/book/${params.id}?date=${d.date}`);
                  }}
                  className={`flex flex-col items-center justify-center w-full py-3 transition-all ${
                    date === d.date
                      ? "bg-[#E41E31] text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium">{d.day}</span>
                  <span className="text-base sm:text-xl font-bold">{d.dateNum}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theatres Section */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Available Theatres</h2>
            
            {(theatres || []).length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-base sm:text-lg">No shows available for this date. Please check back later.</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {(theatres || []).map((theatre) => (
                  <div key={theatre._id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{theatre.name}</h3>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">{theatre.address}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Available Shows</h4>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {theatre.shows
                          .sort((a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm"))
                          .map((show) => (
                            <button
                              key={show._id}
                              onClick={() => navigate(`/book-show/${show._id}`)}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00B300] hover:bg-[#009900] text-white rounded-lg transition-colors text-xs sm:text-sm"
                            >
                              {moment(show.time, "HH:mm").format("hh:mm A")}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TheatresForMovie;