import React, { useState } from 'react';
import style from '../styles/MyPropertyCard.module.css';
import { Link } from 'react-router-dom';
import ConfirmationPopup from './ConformationPopup';

function MyPropertyCard(props) {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleCancel = () => {
    setPopupOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/DeleteProperty.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: props.id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Handle response if needed
      console.log('Delete successful:', data);
      
    } catch (error) {
      console.error('Fetch Error:', error);
    }
    setPopupOpen(false);
    window.location.reload();
  };

  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img src={props.src} alt='property img' className={style.image} />
      </div>
      <div className={style.cardTitle}>{props.name}</div>
      <div className={style.information}>
        <p><b>Type: </b>{props.type}</p>
        <p><b>For sale: </b>{props.forSale}</p>
        <p><b>Price: </b>{props.price}</p>
        <p><b>Location: </b>{props.location}</p>
        <p><b>Description: </b>{props.description}</p>
        <p><b>Size: </b>{props.size} sqft</p>
        <p><b>Added at: </b>{props.createdAt}</p>
        <p><b>Cancellation policy: </b>{props.policy}</p>
        <div className={style.buttons}>
          <Link to={`/editproperty/${props.id}`}>
            <button type='button' className={style.editButton}>Edit</button>
          </Link>
          <button onClick={() => setPopupOpen(true)} type='button' className={style.deleteButton}>Delete</button>
          <ConfirmationPopup
            isOpen={isPopupOpen}
            message="Are you sure you want to delete this item?"
            onConfirm={handleDelete}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}

export default MyPropertyCard;