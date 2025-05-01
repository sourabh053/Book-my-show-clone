import React, { useEffect, useState } from "react";
import { Col, Form, Modal, Row, message, Button, Input, Select, DatePicker, TimePicker, InputNumber } from "antd";
import moment from "moment";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import {
  AddShow,
  DeleteShow,
  GetAllShowsByTheatre,
} from "../../apicalls/theatres";
import { GetAllMovies } from "../../apicalls/movies";
import { useDispatch } from "react-redux";
import ShowsTable from "../../components/ShowsTable";
import PageTitle from "../../components/PageTitle";
import { 
  PlaySquareOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  DollarOutlined, 
  TeamOutlined,
  PlusOutlined 
} from "@ant-design/icons";

function Shows({ setOpenShowsModal, theatre, setSelectedTheatre }) {
  const dispatch = useDispatch();
  const [view, setView] = useState("table");
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const { Option } = Select;

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const moviesResponse = await GetAllMovies();
      if (moviesResponse.success) {
        setMovies(moviesResponse.data);
      } else {
        message.error(moviesResponse.message);
      }

      const showsResponse = await GetAllShowsByTheatre({
        theatreId: theatre._id,
      });
      if (showsResponse.success) {
        setShows(showsResponse.data);
      } else {
        message.error(showsResponse.message);
      }
      dispatch(HideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(HideLoading());
    }
  };

  const handleAddShow = async (values) => {
    try {
      dispatch(ShowLoading());
      const showData = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
        theatre: theatre._id,
      };
      
      const response = await AddShow(showData);

      if (response.success) {
        message.success(response.message);
        getData();
        setView("table");
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteShow(id);

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      open
      onCancel={() => {
        setSelectedTheatre(null);
        setOpenShowsModal(false)
      }}
      width={1400}
      footer={null}
      centered
      maskClosable={false}
      title={
        <div className="text-lg font-semibold">
          <PageTitle title={`Theatre: ${theatre.name}`} />
        </div>
      }
      styles={{body: {padding: "24px"}}}
    >
      <hr className="my-4" />
      <div className="flex justify-between mt-4 mb-4 items-center">
        <h2 className="text-2xl font-bold text-gray-800 uppercase">
          {view === "table" ? "Shows" : "Add Show"}
        </h2>
        {view === "table" && (
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => {
              setView("form");
            }}
          >
            Add Show
          </Button>
        )}
      </div>

      {view === "table" && (
        <div className="container mx-auto">
          <ShowsTable shows={shows} onDelete={handleDelete} />
        </div>
      )}

      {view === "form" && (
        <Form layout="vertical" onFinish={handleAddShow} className="mt-4">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Show Name"
                name="name"
                rules={[{ required: true, message: "Please input show name!" }]}
              >
                <Input 
                  prefix={<PlaySquareOutlined className="site-form-item-icon" />}
                  placeholder="Enter show name"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please input show date!" }]}
              >
                <DatePicker 
                  size="large"
                  format="YYYY-MM-DD"
                  disabledDate={(current) => current && current < moment().startOf('day')}
                  style={{ width: '100%' }}
                  placeholder="Select date"
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Time"
                name="time"
                rules={[{ required: true, message: "Please input show time!" }]}
              >
                <TimePicker 
                  size="large"
                  format="HH:mm"
                  style={{ width: '100%' }}
                  placeholder="Select time"
                  suffixIcon={<ClockCircleOutlined />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Movie"
                name="movie"
                rules={[{ required: true, message: "Please select movie!" }]}
              >
                <Select
                  placeholder="Select Movie"
                  size="large"
                  showSearch
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {movies.map((movie) => (
                    <Option key={movie._id} value={movie._id}>
                      {movie.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Ticket Price"
                name="ticketPrice"
                rules={[
                  { required: true, message: "Please input ticket price!" },
                  { type: "number", min: 0, message: "Price cannot be negative!" }
                ]}
              >
                <InputNumber 
                  type="number"
                  prefix={<DollarOutlined className="site-form-item-icon" />}
                  placeholder="Enter ticket price"
                  size="large"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Form.Item
                label="Total Seats"
                name="totalSeats"
                rules={[
                  { required: true, message: "Please input total seats!" },
                  { type: "number", min: 40, message: "Seats must be at least 40!" }
                ]}
              >
                <InputNumber 
                  type="number"
                  prefix={<TeamOutlined className="site-form-item-icon" />}
                  placeholder="Enter total seats"
                  size="large"
                  style={{ width: "100%" }}
                  min={1}
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-3 mt-4">
            <Button
              size="large"
              onClick={() => {
                setView("table");
              }}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
            >
              Add Show
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default Shows;