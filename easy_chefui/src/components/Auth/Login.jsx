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
} from "mdb-react-ui-kit";
import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const loader = async () => {
  return redirect("/login");
  return null;
};

function Login() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
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

  const handleError = (errors) => {};

  const options = {
    username: { required: "Username is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    <MDBContainer className="d-flex align-items-center min-vh-100 min-vw-100">
      <MDBContainer
        className="d-flex square border rounded justify-content-center align-items-center"
        style={{ width: "500px" }}
      >
        <form
          onSubmit={handleSubmit(onSubmit, handleError)}
          className="w-75 m-3"
        >
          <h1 className="text-center m-5"> Login </h1>
          <MDBInput
            className="mb-4"
            type="text"
            id="username"
            label="Username"
            {...register("username", options.username)}
          />
          {errors?.username && (
            <p className="form-error">{errors.username.message.toString()}</p>
          )}

          <MDBInput
            className="mb-4"
            type="password"
            id="password"
            label="Password"
            {...register("password", options.password)}
          />
          {errors?.password && (
            <p className="form-error">{errors.password.message.toString()}</p>
          )}

          <MDBRow className="mb-4">
            <MDBCol className="d-flex justify-content-center">
              <Controller
                control={control}
                name={"remember_me"}
                defaultValue={true}
                render={({ field: { onChange, value } }) => (
                  <MDBCheckbox
                    type="checkbox"
                    id="remember_me"
                    label="Remember me"
                    checked={value}
                    onChange={onChange}
                  />
                )}
              ></Controller>
            </MDBCol>
          </MDBRow>

          {error && <p className="form-error">{error.response.data.error}</p>}

          <MDBBtn type="submit" className="mb-4" block>
            Sign in
          </MDBBtn>

          <div className="text-center">
            <p>
              Not a member? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </MDBContainer>
    </MDBContainer>
  );
}

export default Login;
