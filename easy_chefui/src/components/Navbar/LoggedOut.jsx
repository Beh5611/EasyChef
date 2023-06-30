import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBBtn
} from 'mdb-react-ui-kit';
import './style_out.css';

function LoggedOut() {
    const [url, setUrl] = useState("None");
    
    
    const { hostname, port } = window.location;


    
    useEffect(() =>{
        setUrl(`http://${hostname}:${port}`);
    }, [url])
    return (
        <>
            <MDBNavbar light bgColor='white'>
                <MDBContainer className=''>
                    <a class="navbar-brand mt-2 mt-lg-0 my-0 py-0 " href={`${url}/`}>
                        <img
                        class= "rounded-7"
                        src={`${url}/assets/easychef.png`}
                        height="45"
                        alt="EasyChef"
                        loading="lazy"
                        />
                    </a>
                    
                    <div className=' end-0 ml-5 pl-5'>
                        
                        <MDBBtn tag='a' href={`${url}/register/`} className='position-relative ms-5 ps-5' color='tertiary' rippleColor='light' style={{color: '#4f4f4f'}}>
                            <span className='signup'>Sign up for free</span>
                        </MDBBtn> 
                        <MDBBtn tag='a' href={`${url}/login/`}  className='ms-3' color='warning'>
                            <div className='pl-5 ml-5'>
                                LOGIN
                            </div>
                        </MDBBtn>
                    </div>
                    
                </MDBContainer>
            </MDBNavbar>

        </>


    );
}

export default LoggedOut;