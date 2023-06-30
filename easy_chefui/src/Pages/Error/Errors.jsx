import { MDBContainer } from "mdb-react-ui-kit";
import { useRouteError } from "react-router-dom";

function ErrorPage(props) {
  const error = useRouteError();
  console.error(error);

  return (
    <MDBContainer className="d-flex align-items-center min-vh-100 min-vw-100 text-center">
      <MDBContainer id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{props.message || error?.statusText || error?.message}</i>
        </p>
      </MDBContainer>
    </MDBContainer>
  );
}

export { ErrorPage };
