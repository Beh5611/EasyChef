import "./style.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/AuthContext";
function LoggedIn() {
  const { user, logoutUser, authRedirect, unauthRedirect } =
    useContext(AuthContext);

  const [avt, setAvt] = useState();
  const [url, setUrl] = useState("None");

  const [isOpen, setIsOpen] = useState(false)
  const { hostname, port } = window.location;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    if (user) {
      setAvt(`http://127.0.0.1:8000${user.avatar}`);
    }
    setUrl(`http://${hostname}:${port}`);
  }, [user, url]);
  return (
    <>
      <nav className="bg-white w-full border border-gray-100">
        <div className="flex flex-row justify-between px-4">
          <div
            className="flex justify-between"
            id="navbarSupportedContent"
          >
            <a
              className=" flex items-center"
              href={`${url}/`}
            >
            
            <div className='flex relative w-12 h-12'>
                <img
                    className="rounded-md "
                    src={`${url}/assets/easychef.png`}
                    alt="EasyChef"
                    loading="lazy"
                    />

            </div>
            </a>
            <ul className="flex flex-row space-x-4  px-4 items-center">
              <li className="">
                <a className="" href={`${url}/create/`}>
                  <span className="">Create Recipe</span>
                </a>
              </li>
              <li className="">
                <a className="" href={`${url}/profile/myrecipes`}>
                  <span className="">My Recipe</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center ">
            <a className="text-gray-800 mr-6" href={`${url}/shopping-cart/`}>
              <i className="fas fa-shopping-cart"></i>
            </a>

            <div className="relative mr-5 pr-5">
              <a
                className="flex items-center cursor-pointer"
                href="#"
                onClick={toggleDropdown}
                id="navbarDropdownMenuAvatar"
                role="button"
              >
                <img
                  src={avt}
                  className="rounded-full"
                  height="30"
                  width="30"
                  alt="avatar"
                  loading="lazy"
                />
              </a>
              
              {isOpen && (
                <div className="absolute bg-white shadow-md rounded-md mt-2 w-48 z-20 right-7">
                  <a href={`${url}/profile/`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <span className="ps-2 ms-1">Edit Profile</span>
                  </a>
                  <a href={`${url}/logout/`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <span className="ps-3 ms-1">Log Out</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LoggedIn;
