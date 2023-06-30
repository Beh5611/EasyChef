import "./style.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/AuthContext";
function LoggedIn() {
  const { user, logoutUser, authRedirect, unauthRedirect } =
    useContext(AuthContext);

  const [avt, setAvt] = useState();
  const [url, setUrl] = useState("None");

  const { hostname, port } = window.location;

  useEffect(() => {
    if (user) {
      setAvt(`http://127.0.0.1:8000${user.avatar}`);
    }

    setUrl(`http://${hostname}:${port}`);
  }, [user, url]);
  return (
    <>
      <nav className="navbar navbar-expand-lg .bg-white">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse ms-5 ps-5"
            id="navbarSupportedContent"
          >
            <a
              className="navbar-brand mt-2 mt-lg-0 my-0 py-0 "
              href={`${url}/`}
            >
              <img
                className="rounded-7"
                src={`${url}/assets/easychef.png`}
                height="45"
                alt="EasyChef"
                loading="lazy"
              />
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href={`${url}/create/`}>
                  <span className="navitems">Create Recipe</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`${url}/profile/myrecipes`}>
                  <span className="navitems">My Recipe</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <a className="text-reset me-3" href={`${url}/shopping-cart/`}>
              <i className="fas fa-shopping-cart"></i>
            </a>

            <div className="dropdown me-5 pe-5">
              <a
                className="dropdown-toggle d-flex align-items-center hidden-arrow"
                href="#"
                id="navbarDropdownMenuAvatar"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={avt}
                  className="rounded-circle"
                  height="30"
                  width="30"
                  alt="avatar"
                  loading="lazy"
                />
              </a>
              <div className="dropdown-content">
                <a href={`${url}/profile/`}>
                  <span className="drops ps-2 ms-1">Edit Profile</span>
                </a>
                <a href={`${url}/logout/`}>
                  <span className="drops ps-3 ms-1">Log Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LoggedIn;
