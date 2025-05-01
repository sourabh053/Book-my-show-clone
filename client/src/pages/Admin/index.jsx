import React from "react";
import { Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
 import MoviesList from "./MoviesList";
 import TheatresList from "./TheatresList";
//  import UpcomingList from './UpcomingList'

function Admin() {
  const items = [
    {
      key: "1",
      label: "Movies",
      children: <MoviesList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatresList />,
    },
  ];
  return (
    <div>
      <PageTitle title="Admin" />     
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Admin;