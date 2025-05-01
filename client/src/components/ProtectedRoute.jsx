import { message } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// API
import { GetCurrentUser } from "../apicalls/users";

// Actions
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import { IoLogOutOutline } from "react-icons/io5";
// import Logo from "../assets/Logo.png";

function ProtectedRoute({ searchTerm, setSearchTerm, children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const getpresentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getpresentUser(); // Get User Info from server
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    user && (
      <div className="layout">
        <header className="bg-gray-800 sticky top-0 z-10">
          <div className="container mx-auto px-4">
            {/* Removed flex-col and kept only flex-row */}
            <div className="flex items-center h-16 justify-between">
              {/* Logo */}
              <div className="flex items-center">

              <div className="flex-shrink-0">
                <h1
                  className="text-lg lg:text-2xl text-white cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Book My Show {user.isAdmin ? "(Admin)" : ""}
                </h1>
                {/* <img src={Logo} alt="BookMyShow" className="h-8" /> */}
              </div>

              {/* Search Bar - Only show on home path */}
              {location.pathname === "/" && (
                <div className="hidden lg:block flex-grow mx-4 max-w-2xl">
                  <input
                    type="text"
                    placeholder="Search for Movies"
                    className="w-full h-10 px-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              )}
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4 text-white flex-shrink-0">
                <h1
                  className="text-sm hover:underline capitalize cursor-pointer"
                  onClick={() => {
                    if (user.isAdmin) {
                      navigate("/admin");
                    } else {
                      navigate("/profile");
                    }
                  }}
                >
                  {user.name}
                </h1>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="bg-[#FF4E6E] text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>        
        <div className="container mx-auto px-4 py-6">{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;
