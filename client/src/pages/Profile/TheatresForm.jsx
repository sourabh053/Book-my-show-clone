import React from "react";
import { Form, message, Modal, Button, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { PhoneOutlined, MailOutlined, HomeOutlined, ShopOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }

      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
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

  return (
    <Modal
      title={
        <div className="text-lg font-semibold">
          {formType === "add" ? "Add New Theatre" : "Edit Theatre"}
        </div>
      }
      open={showTheatreFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
      width={500}
      centered
      maskClosable={false}
      styles={{body:{padding: "24px"}}}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
        className="theatre-form"
      >
        <Form.Item
          label="Theatre Name"
          name="name"
          rules={[{ required: true, message: "Please input theatre name!" }]}
        >
          <Input 
            prefix={<ShopOutlined className="site-form-item-icon" />} 
            placeholder="Enter theatre name"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input theatre address!" }]}
        >
          <TextArea 
            prefix={<HomeOutlined className="site-form-item-icon" />}
            placeholder="Enter complete address"
            rows={3}
            size="large"   
            style={{ resize: 'none' }}         
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please input theatre phone number!" },
            { pattern: /^[0-9-+\s()]*$/, message: "Please enter a valid phone number!" }
          ]}
        >
          <Input 
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Enter phone number"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input theatre email!" },
            { type: "email", message: "Please enter a valid email address!" }
          ]}
        >
          <Input 
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Enter email address"
            size="large"
          />
        </Form.Item>

        <div className="flex justify-end gap-3 mt-4">
          <Button
            size="large"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
          >
            {formType === "add" ? "Add Theatre" : "Update Theatre"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default TheatreForm;