import React, { useEffect, useState } from "react";
import { GetAllTheatres, UpdateTheatre } from "../../apicalls/theatres";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message } from "antd";
import TheatreTable from "../../components/TheatreTable";

function TheatresList() {
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => { 
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatres();
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

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
      });
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

  useEffect(() => {
    getData();
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>      
      <TheatreTable
        theatres={theatres}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default TheatresList;