import React, { useState } from "react";
import { 
  Col, 
  Form, 
  message, 
  Modal, 
  Row, 
  Button, 
  Input, 
  Select, 
  DatePicker, 
  InputNumber,
  Card,
  Space,
  Avatar
} from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddMovie, UpdateMovie } from "../../apicalls/movies";
import moment from "moment";
import PageTitle from "../../components/PageTitle";
import { 
  PlaySquareOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  FileTextOutlined, 
  GlobalOutlined,
  TagOutlined,
  LinkOutlined,
  UserOutlined,
  PlusOutlined,
  DeleteOutlined
} from "@ant-design/icons";

function MovieForm({
  showMovieFormModal,
  setShowMovieFormModal,
  selectedMovie,
  setSelectedMovie,
  getData,
  formType,
}) {
  const dispatch = useDispatch();
  const { Option } = Select;
  const [cast, setCast] = useState(selectedMovie?.cast || []);
  const [crew, setCrew] = useState(selectedMovie?.crew || []);
  
  // Convert date string to moment object for DatePicker
  const initialValues = selectedMovie ? {
    ...selectedMovie,
    releaseDate: selectedMovie.releaseDate ? moment(selectedMovie.releaseDate) : null,
    genre: selectedMovie.genre || [],
    cast: undefined,
    crew: undefined
  } : null;

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      
      const movieData = {
        ...values,
        releaseDate: values.releaseDate.format("YYYY-MM-DD"),
        cast,
        crew
      };

      if (formType === "add") {
        response = await AddMovie(movieData);
      } else {
        response = await UpdateMovie({
          ...movieData,
          movieId: selectedMovie._id,
        });
      }

      if (response.success) {
        getData();
        message.success(response.message);
        setShowMovieFormModal(false);
        setCast([]);
        setCrew([]);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const addCastMember = () => {
    setCast([...cast, { name: '', role: '', image: '' }]);
  };

  const addCrewMember = () => {
    setCrew([...crew, { name: '', role: '', image: '' }]);
  };

  const removeCastMember = (index) => {
    const newCast = [...cast];
    newCast.splice(index, 1);
    setCast(newCast);
  };

  const removeCrewMember = (index) => {
    const newCrew = [...crew];
    newCrew.splice(index, 1);
    setCrew(newCrew);
  };

  const updateCastMember = (index, field, value) => {
    const newCast = [...cast];
    newCast[index][field] = value;
    setCast(newCast);
  };

  const updateCrewMember = (index, field, value) => {
    const newCrew = [...crew];
    newCrew[index][field] = value;
    setCrew(newCrew);
  };

  return (
    <Modal
      open={showMovieFormModal}
      onCancel={() => {
        setShowMovieFormModal(false);
        setSelectedMovie(null);
        setCast([]);
        setCrew([]);
      }}
      width={1000}
      footer={null}
      centered
      maskClosable={false}
      title={
        <div className="text-lg font-semibold">
          <PageTitle title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"} />
        </div>
      }
      styles={{body: {padding: "24px"}}}
    >
      <hr className="my-4" />
      <Form 
        layout="vertical" 
        initialValues={initialValues} 
        onFinish={onFinish}
        className="mt-4"
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item 
              label="Movie Name" 
              name="title"
              rules={[{ required: true, message: "Please input movie name!" }]}
            >
              <Input 
                prefix={<PlaySquareOutlined className="site-form-item-icon" />}
                placeholder="Enter movie name"
                size="large"
                style={{ height: '40px', alignItems: "center" }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item 
              label="Movie Description" 
              name="description"
              rules={[{ required: true, message: "Please input movie description!" }]}
            >
              <Input.TextArea 
                prefix={<FileTextOutlined className="site-form-item-icon" />}
                placeholder="Enter movie description"
                size="large"
                rows={4}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item 
              label="Movie Duration (Min)" 
              name="duration"
              rules={[
                { required: true, message: "Please input movie duration!" },
                { type: "number", min: 1, message: "Duration must be at least 1 minute!" }
              ]}
            >
              <InputNumber
                prefix={<ClockCircleOutlined className="site-form-item-icon" />}
                placeholder="Enter duration"
                size="large"
                style={{ width: "100%" }}
                min={1}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item 
              label="Language" 
              name="language"
              rules={[{ required: true, message: "Please select language!" }]}
            >
              <Select
                placeholder="Select Language"
                size="large"
                suffixIcon={<GlobalOutlined />}
              >
                <Option value="Telugu">Telugu</Option>
                <Option value="English">English</Option>
                <Option value="Hindi">Hindi</Option>
                <Option value="Tamil">Tamil</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item 
              label="Movie Release Date" 
              name="releaseDate"
              rules={[{ required: true, message: "Please select release date!" }]}
            >
              <DatePicker 
                size="large"
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                placeholder="Select date"
                suffixIcon={<CalendarOutlined />}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item 
              label="Genre" 
              name="genre"
              rules={[{ required: true, message: "Please select at least one genre!" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select Genres"
                size="large"
                suffixIcon={<TagOutlined />}
              >
                <Option value="Action">Action</Option>
                <Option value="Comedy">Comedy</Option>
                <Option value="Drama">Drama</Option>
                <Option value="Romance">Romance</Option>
                <Option value="Thriller">Thriller</Option>
                <Option value="Horror">Horror</Option>
                <Option value="Sci-Fi">Sci-Fi</Option>
                <Option value="Fantasy">Fantasy</Option>
                <Option value="Animation">Animation</Option>
                <Option value="Documentary">Documentary</Option>
                <Option value="Historical">Historical</Option>
                <Option value="Adventure">Adventure</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item 
              label="Poster URL" 
              name="poster"
              rules={[{ required: true, message: "Please enter poster URL!" }]}
            >
              <Input 
                prefix={<LinkOutlined className="site-form-item-icon" />}
                placeholder="Enter poster URL"
                size="large"
                style={{ height: '40px', alignItems: "center" }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item 
              label="Background Photo URL" 
              name="backPhoto"
              rules={[{ required: true, message: "Please enter background photo URL!" }]}
            >
              <Input 
                prefix={<LinkOutlined className="site-form-item-icon" />}
                placeholder="Enter background photo URL"
                size="large"
                style={{ height: '40px', alignItems: "center" }}
              />
            </Form.Item>
          </Col>

          {/* Cast Section */}
          <Col span={24}>
            <Card title="Cast" styles={{body: {padding: "0px"}}} extra={<Button type="primary" icon={<PlusOutlined />} onClick={addCastMember}>Add Cast</Button>}>
              {cast.map((member, index) => (
                <Card key={index} className="mb-4">
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item label="Name">
                        <Input
                          value={member.name}
                          onChange={(e) => updateCastMember(index, 'name', e.target.value)}
                          placeholder="Enter name"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item label="Role">
                        <Input
                          value={member.role}
                          onChange={(e) => updateCastMember(index, 'role', e.target.value)}
                          placeholder="Enter role"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item label="Image URL">
                        <Input
                          value={member.image}
                          onChange={(e) => updateCastMember(index, 'image', e.target.value)}
                          placeholder="Enter image URL"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={2} className="flex items-end justify-center sm:justify-end pb-3">
                      <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => removeCastMember(index)}
                        size="large"
                        className="w-full sm:w-auto"
                      />
                    </Col>
                  </Row>
                  {member.image && (
                    <div className="mt-2 flex justify-center">
                      <Avatar size={64} src={member.image} icon={<UserOutlined />} />
                    </div>
                  )}
                </Card>
              ))}
            </Card>
          </Col>

          {/* Crew Section */}
          <Col span={24}>
            <Card title="Crew" styles={{body: {padding: "0px"}}} extra={<Button type="primary" icon={<PlusOutlined />} onClick={addCrewMember}>Add Crew</Button>}>
              {crew.map((member, index) => (
                <Card key={index} className="mb-4">
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item label="Name">
                        <Input
                          value={member.name}
                          onChange={(e) => updateCrewMember(index, 'name', e.target.value)}
                          placeholder="Enter name"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                      <Form.Item label="Role">
                        <Input
                          value={member.role}
                          onChange={(e) => updateCrewMember(index, 'role', e.target.value)}
                          placeholder="Enter role"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                      <Form.Item label="Image URL">
                        <Input
                          value={member.image}
                          onChange={(e) => updateCrewMember(index, 'image', e.target.value)}
                          placeholder="Enter image URL"
                          size="large"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={2} className="flex items-end justify-center sm:justify-end pb-3">
                      <Button 
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => removeCrewMember(index)}
                        size="large"
                        className="w-full sm:w-auto"
                      />
                    </Col>
                  </Row>
                  {member.image && (
                    <div className="mt-2 flex justify-center">
                      <Avatar size={64} src={member.image} icon={<UserOutlined />} />
                    </div>
                  )}
                </Card>
              ))}
            </Card>
          </Col>
        </Row>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            size="large"
            onClick={() => {
              setShowMovieFormModal(false);
              setSelectedMovie(null);
              setCast([]);
              setCrew([]);
            }}
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
          >
            {formType === "add" ? "Add Movie" : "Update Movie"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default MovieForm;