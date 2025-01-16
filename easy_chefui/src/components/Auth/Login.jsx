import axios from "axios";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

function Login() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [error, setError] = useState(null);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setError(null);
    console.log(data);
    loginUser(
      data,
      (r) => {
        console.log(r);
        navigate("/");
      },
      setError
    );
  };

  const options = {
    username: { required: "Username is required" },
    password: {
      required: "Password is required",
      minLength: { value: 8, message: "Password must have at least 8 characters" },
    },
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium">
              Username
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="username"
              {...register("username", options.username)}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              {...register("password", options.password)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <Controller
              control={control}
              name="remember_me"
              defaultValue={true}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="remember_me"
                  className="mr-2"
                  {...field}
                />
              )}
            />
            <label htmlFor="remember_me" className="text-gray-700">
              Remember me
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm">{error.response?.data?.error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Sign in
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 mt-4">
          Not a member?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
