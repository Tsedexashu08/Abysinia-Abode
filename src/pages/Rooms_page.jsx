import React, { useEffect, useState } from 'react';
import style from '../styles/propertyDetailStyle.module.css';
import Pay from '../components/pay';
import { splitImagePaths } from '../components/functions';

function RoomsPage() {
  const [propertyInfo, setPropertyInfo] = useState([]); //state array to store multiple properties
  const [currentIndex, setCurrentIndex] = useState(0);
  const [booking, setBooking] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null); // Track the currently selected property
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchRooms.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('User Fetch Success:', data);
        setPropertyInfo(data.data || []);
        if (data.data.length > 0) {
          setSelectedProperty(data.data[0] || []); // Set the first property as selected initially
          setImages(splitImagePaths(data.data[0].images) || []);
          setAmenities(splitImagePaths(data.data[0].amenities) || []);
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };
    fetchProperties();
  }, []);

  const handleClick = () => setBooking(true);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setImages(splitImagePaths(property.images));
    setAmenities(splitImagePaths(property.amenities));
    setCurrentIndex(0); // Reset to the first image
  };

  return (
    // <div className={style.roomspage}>
    <div className={style.container}>
      <div className={style.propertyList}>
        {propertyInfo.map((property) => (
          <div key={property.property_id} className={style.propertyCard} onClick={() => handlePropertySelect(property)}>
            <h2>{property.name}</h2>
            <img src={`http://localhost/Abysinia-Abode/src/api/${splitImagePaths(property.images)[0]}`} alt={property.name} className={style.propertyImage} />
          </div>
        ))}
      </div>
      <main>
        <h1>Rooms </h1>
        {propertyInfo.length > 0 ? (
          <>

            <h2 className={style.header}>{selectedProperty?.name}</h2>
            <div className={style.imageCarousel}>
              <button onClick={handlePrev} className={style.carouselButton}>❮</button>
              <img src={`http://localhost/Abysinia-Abode/src/api/${images[currentIndex]}`} alt="Bedroom" className={style.mainImage} />
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
              ))}
            </div>

            <br />
            <div className={style.details}>
              <p className={style.options}>&nbsp;<strong>Posted at</strong> : {selectedProperty?.created_at}</p>
              <p><strong>Location</strong> : {selectedProperty?.location}</p>
              <p><strong>Type</strong> : {selectedProperty?.property_type}</p>
              <p><strong>Description</strong> : {selectedProperty?.description}</p>
              <p><strong>Price per-night</strong> : {selectedProperty?.price}</p>
              <p><strong>Rooms</strong> : {selectedProperty?.number_of_rooms} currently available</p>
              <p><strong>Amenities: </strong>
                {amenities.map((amenity, index) => (
                  <emphasis key={index}>{amenity} , free bauffet</emphasis>
                ))}
              </p>
            <button onClick={handleClick} className={style.availabilityButton}>Book Reservation</button>
          </div>
        {booking && <Pay property_id={selectedProperty?.property_id} />}
      </>
      ) : (
      <h1>No details available...</h1>
          )}
    </main>
      </div >
    // </div>
  );
}

export default RoomsPage;