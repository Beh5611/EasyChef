import { MDBContainer } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <MDBContainer className="d-flex flex-column align-items-center justify-content-center min-vh-100 min-vw-100">
      <h1> You have successfully logged out! </h1>
      <p>
        click <Link to="/">here</Link> to return to home
      </p>
    </MDBContainer>
  );
}

export default Logout;
