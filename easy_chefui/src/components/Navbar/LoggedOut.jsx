import React, { useEffect, useState } from 'react';

function LoggedOut() {
  const [url, setUrl] = useState("None");
  const { hostname, port } = window.location;

  useEffect(() => {
    setUrl(`http://${hostname}:${port}`);
  }, [url]);

  return (
    <>
      <nav className="bg-white border border-gray-100">
        <div className="max-w-screen-xl mx-auto px-6 py-2 flex justify-between items-center">
          <a href={`${url}/`} className="flex items-center">
            <div className='flex relative w-12 h-12'>
                <img
                    className="rounded-md "
                    src={`${url}/assets/easychef.png`}
                    alt="EasyChef"
                    loading="lazy"
                    />


            </div>
            
          </a>

          <div className="flex items-center space-x-4">
            <a href={`${url}/register/`} className="text-gray-700 hover:text-gray-900 text-md">
              <button className="bg-transparent  rounded-lg px-6 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
                Sign up for free
              </button>
            </a>
            <a href={`${url}/login/`} className="text-white bg-yellow-500 hover:bg-yellow-400 rounded-lg px-6 py-2 text-lg font-semibold transition duration-200">
              Login
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LoggedOut;
