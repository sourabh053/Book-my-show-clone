import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice.js";
import { message } from "antd";
import { GetBookingsOfUser } from "../../apicalls/bookings.js";
import moment from "moment";

function Bookings() {
  const [bookings = [], setBookings] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookingsOfUser();
      if (response.success) {
        setBookings(response.data);
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Bookings</h1>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bookings found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Movie Poster */}
                    <div className="w-full sm:w-32 h-48 sm:h-40 flex-shrink-0">
                      <img
                        src={booking.show.movie?.poster}
                        alt={booking.show.movie?.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {booking.show.movie?.title}
                        <span className="text-gray-600 text-base sm:text-lg ml-2">
                          ({booking?.show.movie?.language})
                        </span>
                      </h2>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Theatre:</span>
                          <span className="font-medium">
                            {booking.show.theatre.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">
                            {booking.show.theatre.address}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Date & Time:</span>
                          <span className="font-medium">
                            {moment(booking.show.date).format("MMM Do YYYY")} -{" "}
                            {moment(booking.show.time, "HH:mm").format("hh:mm A")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Seats:</span>
                          <span className="font-medium">
                            {booking.seats.join(", ")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium text-[#FF4E6E]">
                            ₹{booking.show.ticketPrice * booking.seats.length}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Booking ID:</span>
                          <span className="font-medium text-sm">
                            {booking._id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Booking Status</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Confirmed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookings;