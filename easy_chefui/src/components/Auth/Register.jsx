import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import * as Yup from "yup";
import { Thumb } from "./FormUtils";
import LoggedIn from "../Navbar/LoggedIn";

function Register() {
  const { registerUser, loading, setLoading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      username: "",
      password: "",
      password2: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      let response = await registerUser(values);
      if (response.status === 200) {
        console.log("initial", oldValues);
      }
    
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: Yup.object({
      first_name: Yup.string().max(15, "Must be 15 chars or less"),
      last_name: Yup.string().max(15, "Must be 15 chars or less"),
      email: Yup.string().email("Invalid email address"),
      phone_number: Yup.string()
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
          "Phone number is not valid"
        )
        .required("Required"),
      username: Yup.string().required("Required"),
      password: Yup.string().min(8, "Must be at least 8 characters"),
      password2: Yup.string().test(
        "passwords-match",
        "Passwords must match",
        function (value) {
          return this.parent.password === value;
        }
      ),
      avatar: Yup.mixed(),
    }),
  });

  const [oldValues, setOldValues] = useState(formik.initialValues);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
          Register
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="first_name"
                type="text"
                className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${formik.touched.first_name && formik.errors.first_name ? 'border-red-500' : ''}`}
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <p className="text-sm text-red-500">{formik.errors.first_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="last_name"
                type="text"
                className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${formik.touched.last_name && formik.errors.last_name ? 'border-red-500' : ''}`}
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <p className="text-sm text-red-500">{formik.errors.last_name}</p>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                type="email"
                className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-sm text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="xxx-xxx-xxxx"
                id="phone_number"
                type="text"
                className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${formik.touched.phone_number && formik.errors.phone_number ? 'border-red-500' : ''}`}
                required
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="text-sm text-red-500">{formik.errors.phone_number}</p>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <input
                onChange={(event) => formik.setFieldValue("avatar", event.currentTarget.files[0])}
                onBlur={formik.handleBlur}
                id="avatar"
                type="file"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {formik.values.avatar && <Thumb file={formik.values.avatar} />}
            </div>

            <div className="col-span-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="username"
                type="text"
                className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${formik.touched.username && formik.errors.username ? 'border-red-500' : ''}`}
                required
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-sm text-red-500">{formik.errors.username}</p>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="password"
                type="password"
                className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-red-500">{formik.errors.password}</p>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="password2" className="block text-sm font-medium text-gray-700">
                Repeat Password
              </label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password2}
                id="password2"
                type="password"
                className={`mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${formik.touched.password2 && formik.errors.password2 ? 'border-red-500' : ''}`}
              />
              {formik.touched.password2 && formik.errors.password2 && (
                <p className="text-sm text-red-500">{formik.errors.password2}</p>
              )}
            </div>

            <div className="col-span-2">
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md shadow-sm hover:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
