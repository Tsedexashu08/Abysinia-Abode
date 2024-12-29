import React, { useState } from 'react'
import { useEffect } from 'react'
import EventCard, { OfferCard } from './EventCard'
import style from '../styles/evenListStyle.module.css'
import cardstyles from '../styles/propertyCard.module.css'
import avatar from '../images/avatar.png'
import { useNavigate } from 'react-router-dom'

// container for event and offer cards in the home page.
function EventLists() {
  const navigate = useNavigate()
  const [Events, setEvents] = useState({});//state fro storing events fetchesd from db.

  useEffect(() => {
    const fetchEvents = async () => {
      try {//fetching all events from db and putting them in our Events state.
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchEvents.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log('User Fetch Success:', data);
        setEvents(data.data || []); // Ensure it's always an array
      } catch (error) {
        console.error('Fetch Error:', error);
        setEvents([]); // In case of an error, set to an empty array(cause apparrently if its empty it dont know its an array n says length property not defined.)
      }
    };
    fetchEvents();
  }, []);
  console.log(Events)//logging fetched events for debugging(will take out later).
  return (
    <div className={`${style.lists}`}>
      {//conditionally rendering the events if they were retrived.(using event card component).
        Events.length > 0 ? (Events.map((events) => (//if events state has data(its length greater than 0)display the data.
          <EventCard className={cardstyles.eventCard}
            name={events.event_name}
            src={`http://localhost/Abysinia-Abode/src/api/${events.image}`}
          />
        ))

        ) : (  <div className={style.addProperty}>
          <img src={avatar} alt="pointin Avatar" />
          <button onClick={() => { navigate('/addevent') }}>Add Your own Event</button>
        </div>)//if events state is empty diaply no events.
      }
    </div>
  )
}

export default EventLists

export function OfferLists() {
  const navigate = useNavigate()
  const [offer, setOffer] = useState({});//state for storing offers(properties forsale) from our db.

  useEffect(() => {
    const fetchOffer = async () => {
      try {//same as eventlist but fethces from properties table not event.
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchProperties.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log('User Fetch Success:', data);
        setOffer(data.data || []); // Ensure it's always an array
      } catch (error) {
        console.error('Fetch Error:', error);
        setOffer([]); // In case of an error, set to an empty array(cause apparrently if its empty it dont know its an array n says length property not defined.)
      }
    };
    fetchOffer();
  }, []);

  return (
    <div className={`${style.lists}`}>
      {
        offer.length > 0 ? (offer.map((offer) => (
          <OfferCard className={cardstyles.offerCard}
            name={offer.property_name}
            src={`http://localhost/Abysinia-Abode/src/api/${offer.image}`}
          />
        ))

        ) : (
          <div className={style.addProperty}>
            <img src={avatar} alt="pointin Avatar" />
            <button onClick={() => { navigate('/addProperty') }}>Add Your own Property</button>
          </div>
        )
      }
    </div>
  )
}
