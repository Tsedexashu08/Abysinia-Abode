import React, { useState } from 'react';
import style from '../styles/propertyDetailStyle.module.css';
import Pay from '../components/pay';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { splitImagePaths } from '../components/functions';




function EventDetails() {
  const { name } = useParams()//getting the name passed from Eventcard url.
  const [EventInfo, setEventInfo] = useState({})//this stores the event information of currently displayed event.     
  const [images, setImages] = useState([])/* this hold the path to the images that will be displayed in the image carousel. */
  const [currentIndex, setCurrentIndex] = useState(0); /*currentIndex initializes a state variable currentIndex to keep track of which image is currently displayed in the carousel. setCurrentIndex function is used to update the state.*/
  const [booking, setBooking] = useState(false);//state for checking if booking button is clicked or not.


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchEvent.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: (name),
        });
        const data = await response.json();
        
        console.log('User Fetch Success:', data);
        setEventInfo(data.data);
        setImages(splitImagePaths(data.data[0].images))//setting the image paths in the images state,.
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };
  
      fetchEvent();
    
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
  console.log(EventInfo)
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
              EventInfo.length > 0 ?(
          <div className={style.details}>{/*this section contains event details.*/}
                    <p className={style.options}><b>posted at</b> : {EventInfo[0].created_at}</p>
            <h3>Details</h3>
             <p>{EventInfo[0].event_description}</p>
             <p><strong>date-of-ocassion</strong>: {EventInfo[0].event_date}</p>
            <button onClick={handleClick} className={style.availabilityButton}>Book Reservation</button>
          </div>
                ):(<h2>no details available</h2>)
            }
          {booking ?
            <Pay property_id={EventInfo[0].property_id}/> : ''
          }
        </main>
      </div>
    </>
  );
};

export default EventDetails;