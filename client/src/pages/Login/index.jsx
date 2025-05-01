import React, { useEffect } from "react";
import { Form, Input, message } from "antd";

// Components
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";

function Login({currentImageIndex,images}) {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
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
          <p className="text-lg">Book Your Favorite Movies Or Start your Theatre Chain</p>
          <p className="text-sm opacity-80"></p>
          </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-10">
        <div className="max-w-md w-full text-white">
          <p className="">Login Your Acount</p>
          <h2 className="text-3xl font-semibold mb-2">Welcome Back!</h2>
          <p className="text-gray-400 mb-6">Enter your email and password</p>

          <Form className="space-y-4" onFinish={onFinish}>
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
              <Link to="/register" className="hover:underline">
                {" "}
                New here? Register Now!
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold"
            >
              Sign in
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;

{
  /* <div className="flex justify-center h-screen items-center">
        <div className="card p-3 w-400">
          <h1 className="text-xl mb-1">
            Welcome back to Scaler Shows! Please Login{" "}
          </h1>
          <hr />
          <Form layout="vertical" className="mt-1" onFinish={onFinish}>
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <input type="password" />
            </Form.Item>

            <div className="flex flex-col mt-2 gap-1">
              <Button fullWidth title="Login" type="submit" />
              <Link to="/register" className="text-primary">
                {" "}
                New to Scaler Movies? Register!
              </Link>
            </div>
          </Form>
        </div>
      </div> */
}
