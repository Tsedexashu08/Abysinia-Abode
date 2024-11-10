import React, { useState } from 'react';
import style from '../styles/propertyDetailStyle.module.css';
import Pay from '../components/pay';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { splitImagePaths } from '../components/functions';




function App() {
  const { name } = useParams()//getting the name passed from propertycard url.
  const [propertyInfo, setPropertyInfo] = useState({})//this stores the property information of currently displayed property.     
  const [Amenities, setAmenities] = useState([])//state fro storing amenties of current property.                           
  const [images, setImages] = useState([])/* this hold the path to the images that will be displayed in the image carousel. */
  const [currentIndex, setCurrentIndex] = useState(0); /*currentIndex initializes a state variable currentIndex to keep track of which image is currently displayed in the carousel. setCurrentIndex function is used to update the state.*/
  const [booking, setBooking] = useState(false);//state fro checking if booking button is clicked or not.


  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchPropertyDetails.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: (name),
        });
        const data = await response.json();

        console.log('User Fetch Success:', data);
        setPropertyInfo(data.data);
        setImages(splitImagePaths(data.data[0].images))//setting the image paths in the images state,.
        setAmenities(splitImagePaths(data.data[0].amenities))
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };
    fetchProperty();

  }, []);


  const handleClick = () => {
    setBooking(true);
  };

  {/*this function increments the currentIndex to show next image*/ }
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  {/*this function decrements the currentIndex to show previous image*/ }
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
console.log(propertyInfo)
  return (
    <>
      <div className={style.container}>
        <main>
          <h2>{name}</h2>
          <div className={style.imageCarousel}>                                                 {/*this wraps the carousel, containg the navigation buttons and the currrently displayed image*/}
            <button onClick={handlePrev} className={style.carouselButton}>❮</button>
            <img src={`http://localhost/Abysinia-Abode/src/api/${images[currentIndex]}`} alt="Bedroom" className={style.mainImage} />        {/*this image element displays the current image based on currentIndex.*/}
            <button onClick={handleNext} className={style.carouselButton}>❯</button>
          </div>
          <div className={style.thumbnailContainer}>

            {images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost/Abysinia-Abode/src/api/${image}`}
                alt={`Thumbnail ${index + 1}`}
                className={`${style.thumbnail} ${currentIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}        {/*this sets the currentIndex to the clicked thumbnail`s index when clicked, changing the main image displayed.*/}
          </div>
          <br />
          {
            propertyInfo.length > 0 ?(
              <div className={style.details}>        {/*this section contains property details and amenities.*/}
            <p className={style.options}>&nbsp;<strong>posted at</strong> : {propertyInfo[0].created_at}</p>
            <p><strong>Location</strong> : {propertyInfo[0].location}</p>
            <p><strong>Type</strong> : {propertyInfo[0].property_type}</p>
            <p><strong>Description</strong> : {propertyInfo[0].description}</p>
            <p><strong>Price per-night</strong> : {propertyInfo[0].price}</p>
            <p><strong>Rooms</strong> : {propertyInfo[0].number_of_rooms} currently available</p>
            <p><strong>Amenities</strong></p>
            <ul className={style.amenities}>
              {
                Amenities.map((amenty) => (

                  <li>{amenty}</li>

                )
                )
              }
            </ul>
            <button onClick={handleClick} className={style.availabilityButton}>Book Reservation</button>
          </div> ):(
            <h1>no details available...</h1>
          )
          }
          {booking ?
            <Pay property_id={propertyInfo[0].property_id} /> : ''
          }
        </main>
      </div>
    </>
  );
};

export default App;