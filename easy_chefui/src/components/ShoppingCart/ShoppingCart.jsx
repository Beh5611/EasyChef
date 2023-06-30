import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import CartList from "./CartList";
import "./style.css";
import Total from "./Total";
import LoggedIn from "../Navbar/LoggedIn";

function ShoppingCart() {
  const [listerner, setListener] = useState(0);
  const [childLoaded, setChildLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      handleChildLoaded(true);
    }, 500);
  }, [handleChildLoaded]);

  function handleChildLoaded(bool) {
    console.log("loaded");
    setChildLoaded(bool);
  }
  const update = () => {
    handleChildLoaded(false);
    setListener(listerner + 1);
    console.log("update listener");
  };

  return (
    <>
      <MDBContainer className="d-flex justify-content-center pt-5 mt-5">
        <h2>
          My <span className="text-warning">Shopping</span> List
        </h2>
      </MDBContainer>
      <CartList update={update} />
      <MDBContainer className="d-flex justify-content-center text-center">
        <MDBRow className="m-0 p-0">{childLoaded && <Total />}</MDBRow>
      </MDBContainer>
    </>
  );
}

export default ShoppingCart;
