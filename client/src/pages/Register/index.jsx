import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

// Components
import { RegisterUser } from "../../apicalls/users";

function Register({currentImageIndex,images}) {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
        console.log(response.message);
      } else {
        message.error(response.message);
        console.log(response.message);
      }
    } catch (err) {
      message.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-t from-[#13348D] to-[#010101]">
      {/* Left Side - Image Section */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('${images[currentImageIndex]}')`,
        }}
      >
        <div className="flex flex-col justify-end items-center p-10 text-white bg-gradient-to-t from-black/80 to-transparent h-full w-full">
          <h1 className="text-3xl font-semibold">Book My Show</h1>
          <p className="text-lg">
            Book Your Favorite Movies Or Start your Theatre Chain
          </p>
          <p className="text-sm opacity-80"></p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-10">
        <div className="max-w-md w-full text-white">
          <p className="">Register Your Account</p>
          <h2 className="text-3xl font-semibold mb-2">Welcome!</h2>
          {/* <p className="text-gray-400 mb-6">Please Register</p> */}

          <Form className="space-y-4" onFinish={onFinish}>
            <div>
              <label className="block text-sm text-gray-400">Name</label>
              <div className="relative mt-1">
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                   <Input
                    placeholder="Jhon Doe"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 
                    focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 
                    placeholder-gray-400 data-[filled=true]:bg-white data-[filled=true]:text-black shadow-[0px_0px_30px_#2F70D3]"
                    type="text"
                    onFocus={(e) => e.target.setAttribute('data-filled', 'true')}
                    onBlur={(e) => e.target.setAttribute('data-filled', e.target.value ? 'true' : 'false')}
                  />
                </Form.Item>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400">
                Email address
              </label>
              <div className="relative mt-1">
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                   <Input
                    placeholder="Hello@yourdomain.com"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 
                    focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 
                    placeholder-gray-400 data-[filled=true]:bg-white data-[filled=true]:text-black shadow-[0px_0px_30px_#2F70D3]"
                    type="email"
                    onFocus={(e) => e.target.setAttribute('data-filled', 'true')}
                    onBlur={(e) => e.target.setAttribute('data-filled', e.target.value ? 'true' : 'false')}
                  />
                </Form.Item>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400">Password</label>
              <div className="relative mt-1">
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                 <Input.Password
                    className="w-full h-10 py-0 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 
                    focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 
                    placeholder-col data-[filled=true]:bg-white data-[filled=true]:text-black shadow-[0px_0px_30px_#2F70D3]"
                    placeholder="Enter your password"
                    type="password"
                    onFocus={(e) => e.target.parentNode.setAttribute('data-filled', 'true')}
                    onBlur={(e) => e.target.parentNode.setAttribute('data-filled', e.target.value ? 'true' : 'false')}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="flex justify-between text-sm text-blue-400">
              <Link to="/login" className="hover:underline">
                Already have an account? Login
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
            >
              Sign up
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;

{
  /* <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">
          Welcome to Scaler Shows! Please Register{" "}
        </h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <input type="password" />
          </Form.Item>

          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="REGISTER" type="submit" />
            <Link to="/login" className="text-primary">
              {" "}
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div> */
}
