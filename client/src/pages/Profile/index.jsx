import React from "react";
import { Tabs } from "antd";
// import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TheatresList from "./TheatresList";
 import Bookings from "./Bookings";
function Profile() {
  const items = [
    {
      key: "1",
      label: "Bookings",
      children: <Bookings />,
    },
    {
      key: "2",
      label: "Apply for Theatre",
      children: <TheatresList />,
    },
  ];
  return (
    <div>
      <PageTitle title="Profile" />
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Profile;