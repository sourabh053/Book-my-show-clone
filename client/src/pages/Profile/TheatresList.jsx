import React, { useEffect, useState } from "react";
import TheatreForm from "./TheatresForm";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Button } from "antd";
import { DeleteTheatre, GetAllTheatresByOwner } from "../../apicalls/theatres";
import Shows from "./Shows";
import TheatreApplyTable from "../../components/TheatreApplyTable";

function TheatresList() {
  const { user } = useSelector((state) => state.users);
  const [showTheatreFormModal = false, setShowTheatreFormModal] =
    useState(false);
  const [selectedTheatre = null, setSelectedTheatre] = useState(null);
  const [formType = "add", setFormType] = useState("add");
  const [theatres, setTheatres] = useState([]);
  const [openShowsModal, setOpenShowsModal] = useState(false);

  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllTheatresByOwner({
        owner: user._id,
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

  const handleDelete = async (theatreId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteTheatre(theatreId);
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

  const handleEdit = (theatre) => {
    // console.log('Edit theatre:', theatre);
    setFormType("edit");
    setSelectedTheatre(theatre);
    setShowTheatreFormModal(true);
  };
  const handleShowsClick = (theatre) => {
    // console.log('View shows for theatre:', theatre);
    setSelectedTheatre(theatre);
    setOpenShowsModal(true);
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
            setFormType("add");
            setShowTheatreFormModal(true);
          }}
          type="primary"
        >Add Theatre</Button>
      </div>
      <TheatreApplyTable
        theatres={theatres}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onShowsClick={handleShowsClick}
      />

      {showTheatreFormModal && (
        <TheatreForm
          showTheatreFormModal={showTheatreFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}         
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}

      {openShowsModal && (
        <Shows
          setOpenShowsModal={setOpenShowsModal}
          theatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
        />
      )}
    </div>
  );
}

export default TheatresList;
