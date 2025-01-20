import { useContext, useEffect, useState } from "react";
import AuthContext from "../Auth/AuthContext";

function LoggedIn() {
  const { user, logoutUser } = useContext(AuthContext);
  const [avt, setAvt] = useState();
  const [url, setUrl] = useState("https://anologia.pythonanywhere.com");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (user) {
      setAvt(`${process.env.REACT_APP_PRODUCTION_BACKEND_URL || "https://anologia.pythonanywhere.com"}${user.avatar}`);
    }

    // Dynamically set URL based on window location
    const currentUrl = window.location.hostname && window.location.port
      ? `${window.location.hostname}:${window.location.port}`
      : "https://easychefdemo.netlify.app/";
    setUrl(currentUrl);
  }, [user]);

  const handleLogout = () => {
    logoutUser();
    window.location.href = `${url}/login`; // Redirect after logout
  };

  return (
    <nav className="bg-white w-full border border-gray-100">
      <div className="flex flex-row justify-between px-4">
        <div className="flex justify-between" id="navbarSupportedContent">
          <a className="flex items-center" href={`${url}/`}>
            <div className="flex relative w-12 h-12">
              <img className="rounded-md" src={`/assets/easychef.png`} alt="EasyChef" loading="lazy" />
            </div>
          </a>
          <ul className="flex flex-row space-x-4 px-4 items-center">
            <li>
              <a href={`${url}/create/`}>Create Recipe</a>
            </li>
            <li>
              <a href={`${url}/profile/myrecipes`}>My Recipe</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <a className="text-gray-800 mr-6" href={`${url}/shopping-cart/`}>
            <i className="fas fa-shopping-cart"></i>
          </a>
          <div className="relative mr-5 pr-5">
            <a className="flex items-center cursor-pointer" onClick={toggleDropdown}>
              <img src={avt} className="rounded-full" height="30" width="30" alt="avatar" loading="lazy" />
            </a>
            {isOpen && (
              <div className="absolute bg-white shadow-md rounded-md mt-2 w-48 z-20 right-7">
                <a href={`${url}/profile/`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Edit Profile
                </a>
                <a onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LoggedIn;
