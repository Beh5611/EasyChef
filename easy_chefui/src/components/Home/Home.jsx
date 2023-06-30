import {
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit';
import Slider from "react-slick";
import './style.css';
import LoggedIn from '../Navbar/LoggedIn';
import LoggedOut from '../Navbar/LoggedOut';
function Home() {
  const images = ['assets/fruits.jpg', 'assets/steak.jpg']
  const settings = {
    // infinite: true,
    // dots: true,
    // slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: "linear",
    // centerMode: true,
    // centerPadding: 0,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
      
      <MDBRow className='w-100 d-flex justify-content-center p-0 py-5 m-0'>
        <MDBCol size="5" className="column1 p-5 m-0 ">
          
          <h1 className="heading w-100"><span className='text-warning'>Access & Create</span> Millions of Mouth Watering <span className='text-warning'>Recipes</span></h1>
        
          <h3 className='pt-4 my-3'>EasyChef has created the perfect app for you to experiment with fun and new recipes as well blessing the world with your own creativity!</h3>
          <div className='d-flex justify-content-center py-4'>
            <MDBBtn rounded color='warning'>
              Create a Recipe!
            </MDBBtn>
          </div>
        </MDBCol>

        <MDBCol size="6" className='slide p-0 m-0'>
          <Slider {...settings}>
            {images.map((img) => (
              <div className='d-flex justify-content-center'>
                <img src={img} alt={img} style={{height: '70vh', width: 'auto'}}
                
                />
                
              </div>
              )
            )}
            
          </Slider>
        </MDBCol>

      </MDBRow>
    </>
  );
}

export default Home;
