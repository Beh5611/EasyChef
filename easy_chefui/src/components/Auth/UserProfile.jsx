import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardTitle,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AuthContext from "./AuthContext";
import * as Yup from "yup";
import { Thumb } from "./FormUtils";

function UserProfile() {
  const user = useLoaderData();
  const { updateUser } = useContext(AuthContext);
  const [editable, setEditable] = useState(false);
  const changedVals = (data) => {
    let changed = false;
    let o = Object.fromEntries(
      Object.entries(data).filter(([key, v]) => {
        if (v !== formik.initialValues[key]) {
          changed = true;
          return true;
        }
        return false;
      })
    );
    if (changed) {
      return o;
    }
    return null;
  };
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      avatar: user.avatar,
      username: user?.username || "",
      password: "",
      password2: "",
    },
    onSubmit: async (e) => {
      const changed = changedVals(formik.values);
      console.log(changed);
      if (changed) {
        let response = await updateUser(changed);
        if (response.status === 200) {
          setOldValues(formik.values);
          console.log("initial", oldValues);
          setEditable(false);
        }
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
      avatar: Yup.mixed(),
      username: Yup.string().required("Required"),
      password: Yup.string().min(8, "Must be at least 8 characters"),
      password2: Yup.string().test(
        "passwords-match",
        "Passwords must match",
        function (value) {
          return this.parent.password === value;
        }
      ),
    }),
  });
  const [oldValues, setOldValues] = useState(formik.initialValues);

  useEffect(() => {
    Array.from(document.getElementsByClassName("invalid-feedback")).forEach(
      (e) => {
        e.parentNode.getElementsByTagName("input")[0].setCustomValidity("true");
      }
    );
    Array.from(document.getElementsByClassName("valid-feedback")).forEach(
      (e) => {
        e.parentNode.getElementsByTagName("input")[0].setCustomValidity("");
      }
    );
    console.log("custom validliy changed");
  }, [formik.errors]);

  useLayoutEffect(() => {
    // set initial image value
    formik.setFieldValue("avatar", formik.values.avatar);
  }, [formik.values]);

  return (
    <MDBContainer className="d-flex align-items-center min-vh-100 min-vw-100">
      <MDBContainer
        className="d-flex square border rounded justify-content-center align-items-center"
        style={{ width: "500px" }}
      >
        <MDBValidation
          onSubmit={formik.handleSubmit}
          className="row g-3 p-4"
          isValidated
          encType="multipart/form-data"
        >
          <h1 className="text-center my-3"> User Profile </h1>
          <MDBValidationItem
            className="col-6"
            feedback={formik.errors.first_name}
            invalid={formik.touched.first_name && formik.errors.first_name}
          >
            <MDBInput
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="first_name"
              label="First Name"
              type="text"
              readOnly={!editable}
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-6"
            feedback={formik.errors.last_name}
            invalid={formik.touched.last_name && formik.errors.last_name}
          >
            <MDBInput
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="last_name"
              label="Last Name"
              type="text"
              readOnly={!editable}
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-12"
            feedback={formik.errors.email}
            invalid={formik.touched.email && formik.errors.email}
          >
            <MDBInput
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              label="Email"
              type="text"
              readOnly={!editable}
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-12"
            feedback={formik.errors.phone_number}
            invalid={formik.touched.phone_number && formik.errors.phone_number}
          >
            <MDBInput
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="phone_number"
              label="Phone Number"
              type="text"
              readOnly={!editable}
              required
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-12"
            feedback={formik.errors.avatar}
            invalid={formik.touched.avatar && formik.errors.avatar}
          >
            <label htmlFor="avatar" className="form-label">
              Avatar
            </label>
            <MDBInput
              onChange={(event) => {
                console.log(event.currentTarget.files[0]);
                formik.setFieldValue("avatar", event.currentTarget.files[0]);
              }}
              onBlur={formik.handleBlur}
              id="avatar"
              type="file"
              readOnly={!editable}
            />
            {formik.values.avatar && <Thumb file={formik.values.avatar} />}
          </MDBValidationItem>
          <MDBValidationItem
            className="col-12"
            feedback={formik.errors.username}
            invalid={formik.touched.username && formik.errors.username}
          >
            <MDBInput
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="username"
              label="Username"
              type="text"
              readOnly={!editable}
              required
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-12"
            feedback={formik.errors.password}
            invalid={formik.touched.password && formik.errors.password}
          >
            <MDBInput
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              label="Password"
              type="password"
              readOnly={!editable}
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-12"
            feedback={formik.errors.password2}
            invalid={formik.touched.password2 && formik.errors.password2}
          >
            <MDBInput
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password2}
              id="password2"
              label="Repeat Password"
              type="password"
              readOnly={!editable}
            />
          </MDBValidationItem>
          <MDBBtn
            type="button"
            onClick={async () => {
              setEditable(true);
              const validationErrors = await formik.validateForm();
              const allValues = Object.entries(formik.values).reduce(
                (acc, [key, value]) => {
                  return { ...acc, [key]: true };
                },
                {}
              );
              formik.setTouched(allValues, true);
            }}
            block
            hidden={editable}
          >
            Edit
          </MDBBtn>
          <MDBBtn
            type="button"
            color="danger"
            className="mt-3"
            onClick={() => {
              setEditable(false);
            }}
            block
            hidden={!editable}
          >
            Cancel
          </MDBBtn>
          <MDBBtn type="submit" block hidden={!editable}>
            Submit
          </MDBBtn>
        </MDBValidation>
      </MDBContainer>
    </MDBContainer>
  );
}

export default UserProfile;
