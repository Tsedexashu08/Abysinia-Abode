import React, { useState } from 'react';
import style from '../styles/propertyDetailStyle.module.css';
import Pay from '../components/pay';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { splitImagePaths,splitString } from '../components/functions';




// ReservationDetails component for displaying reservation information and booking options
function ReservationDetails() {
  const user_id = sessionStorage.getItem('user_id'); // Retrieve user ID from session storage
  const { name } = useParams(); // Get the property name passed from the URL
  const [Event, setEvent] = useState({}); // State to store property information
  const [images, setImages] = useState([]); // State to hold image paths for the carousel
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the currently displayed image index
  const [booking, setBooking] = useState(false); // State to check if the booking button has been clicked

  useEffect(() => {
    // Fetch reservation details from the server
    const fetchReservations = async () => {
      const parameters = {
        user_id: user_id,
        property_name: name,
      };
      try {
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/SearchReservation.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parameters), // Send user ID and property name as request body
        });
        const data = await response.json(); // Parse the JSON response
        console.log('User Fetch Success:', data); // Log the fetched data
        setEvent(data.data); // Set event information to state
        setImages(splitImagePaths(data.data[0].images)); // Set image paths in the state
      } catch (error) {
        console.error('Fetch Error:', error); // Log any errors during the fetch
      }
    };

    fetchReservations(); // Call the fetch function
  }, [user_id, name]); // Dependency array to re-fetch data if user ID or property name changes

  const handleClick = () => {
    setBooking(true); // Set booking state to true when the button is clicked
  };

  // Function to show the next image in the carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Increment index and loop back to start
  };

  // Function to show the previous image in the carousel
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Decrement index and loop to end
  };

  console.log(Event); // Log the event information for debugging

  return (
    <>
      <div className={style.container}> {/* Main container for reservation details */}
        <main>
          <h2>{name}</h2> {/* Display the property name */}
          <div className={style.imageCarousel}> {/* Carousel for displaying images */}
            <button onClick={handlePrev} className={style.carouselButton}>❮</button> {/* Previous button */}
            <img 
              src={`http://localhost/Abysinia-Abode/src/api/${images[currentIndex]}`} 
              alt="Property" 
              className={style.mainImage} 
            /> {/* Display the current image */}
            <button onClick={handleNext} className={style.carouselButton}>❯</button> {/* Next button */}
          </div>
          <div className={style.thumbnailContainer}> {/* Container for thumbnail images */}
            {images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost/Abysinia-Abode/src/api/${image}`}
                alt={`Thumbnail ${index + 1}`}
                className={`${style.thumbnail} ${currentIndex === index ? 'active' : ''}`} // Highlight the active thumbnail
                onClick={() => setCurrentIndex(index)} // Set current index to the clicked thumbnail's index
              />
            ))}
          </div>
          <br />
          {Event.length > 0 ? ( // Check if event details are available
            <div className={style.details}> {/* Section for event details */}
              <p className={style.options}><strong>Posted At:</strong> {Event[0].created_at}</p>
              <p><strong>Location:</strong> {Event[0].location}</p>
              <p><strong>Type:</strong> {Event[0].property_type}</p>
              <p><strong>Description:</strong> {Event[0].description}</p>
              <p><strong>Price Per Night:</strong> {Event[0].price}</p>
              <p><strong>Rooms:</strong> {Event[0].number_of_rooms} currently available</p>
              <p><strong>Check-in:</strong> {splitString(Event[0].check_in_dates)}</p>
              <p><strong>Check-out:</strong> {splitString(Event[0].check_out_dates)}</p>

              <button onClick={handleClick} className={style.availabilityButton}>Book Reservation</button> {/* Booking button */}
            </div>
          ) : (
            <h1>No details available...</h1> // Message if no reservation details are found
          )}
          {booking && <Pay property_id={Event[0].property_id} />} {/* Render Pay component if booking is true */}
        </main>
      </div>
    </>
  );
};

export default ReservationDetails;