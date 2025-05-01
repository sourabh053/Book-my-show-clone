import { message, Button } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetShowById } from "../../apicalls/theatres.js";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice.js";
import { BookShowTickets, CreateOrder, MakePayment, VerifyOrder } from "../../apicalls/bookings.js";

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;


function BookShow() {
  const { user } = useSelector((state) => state.users);
  const [show, setShow] = React.useState(null);
  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetShowById({
        showId: params.id,
      });
      if (response.success) {
        setShow(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const getSeats = () => {
    const columns = 12;
    const totalSeats = show.totalSeats;
    const rows = Math.ceil(totalSeats / columns);

    return (
      <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        {/* Screen */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="w-full h-1 sm:h-2 bg-gradient-to-b from-gray-400 to-gray-200 rounded-t-lg mx-auto max-w-2xl"></div>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Screen This Side</p>
        </div>

        {/* Seats Grid */}
        <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6 overflow-x-auto">
          <div className="grid grid-cols-12 gap-1 sm:gap-2 min-w-max">
            {Array.from(Array(rows).keys()).map((seat, index) => (
              <div key={index} className="col-span-12 flex justify-center gap-1 sm:gap-2">
                {Array.from(Array(columns).keys()).map((column, index) => {
                  const seatNumber = seat * columns + column + 1;
                  if (seatNumber > totalSeats) return null;

                  const isSelected = selectedSeats.includes(seatNumber);
                  const isBooked = show.bookedSeats.includes(seatNumber);

                  return (
                    <div
                      key={seatNumber}
                      className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-md cursor-pointer transition-all ${
                        isBooked
                          ? "bg-gray-300 cursor-not-allowed"
                          : isSelected
                          ? "bg-[#FF4E6E] text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        if (isBooked) return;
                        if (isSelected) {
                          setSelectedSeats(selectedSeats.filter(item => item !== seatNumber));
                        } else {
                          setSelectedSeats([...selectedSeats, seatNumber]);
                        }
                      }}
                    >
                      <span className="text-[10px] sm:text-xs font-medium">{seatNumber}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-100 rounded-md"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-[#FF4E6E] rounded-md"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded-md"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    );
  };

  const book = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await BookShowTickets({
        show: params.id,
        seats: selectedSeats,
        transactionId,
        user: user._id,
      });
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const handleInSiteCheckout = async () => {
    try {
      const amount = selectedSeats.length * show.ticketPrice;
      const orderData = await CreateOrder({ amount : amount * 100 });
      
      if (!orderData.id) {
        throw new Error("Failed to generate order ID");
      }
  
      const options = {
        key: razorpayKey, // Replace with your Razorpay key_id
        amount: amount * 100, // in paise
        currency: "INR",
        name: "Book my show clone",
        description: "Ticket Booking",
        //image: "/logo.png", // optional
        order_id: orderData.id, // From server
  
        handler: async function (response) {
          // Send this response to your server to verify
          const verifyRes = await VerifyOrder(response);       
          if (verifyRes.isOk) {            
            // Proceed to next steps like ticket confirmation
            book(response?.razorpay_order_id);
          } else {
            alert("Payment verification failed. Contact support.");
          }
        },
  
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "9999999999"
        },
  
        notes: {
          movie: show.name,
          seats: selectedSeats.join(", ")
        },
  
        theme: {
          color: "#3399cc"
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error in in-site checkout:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  


  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    show && (
      <div className="min-h-screen bg-gray-50">
        {/* Show Information Header */}
        <div className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col gap-2 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {show.movie.title} <span className="text-gray-600">({show.movie.language})</span>
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">{show.theatre.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">{show.theatre.address}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <div className="text-base sm:text-lg font-medium text-gray-900">
                  {moment(show.date).format("MMM Do yyyy")}
                </div>
                <div className="text-base sm:text-lg font-medium text-gray-900">
                  {moment(show.time, "HH:mm").format("hh:mm A")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seats Selection */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
          {getSeats()}
        </div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 sm:p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm text-gray-600">Selected Seats:</span>
                    <span className="text-xs sm:text-sm font-medium">{selectedSeats.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm text-gray-600">Total Price:</span>
                    <span className="text-xs sm:text-sm font-medium">₹ {Math.ceil((selectedSeats.length * show.ticketPrice))}</span>
                  </div>
                </div>
                <Button 
                  className="bg-[#FF4E6E] hover:bg-[#ff3557] text-white font-bold py-2 md:h-9 sm:py-3 px-4 sm:px-8 rounded-lg transition-colors w-full sm:w-auto text-sm sm:text-base self-center"
                  onClick={handleInSiteCheckout}
                >Pay to Book</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default BookShow;