import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../styles/bookReservations.module.css';

function BookingReservation({ checkIn, checkOut, email, amount, tx_ref, public_key, guests, property_id }) {
    const userId = sessionStorage.getItem('user_id');//retrieving the current users id from session.(causd its an attrbutte in reservations table).
    const [reservation, setReservation] = useState({}); // State for storing reservation details

    useEffect(() => {
        // Setting the reservation details to send this state to the db.
        setReservation({
            CheckIn: checkIn,
            CheckOut: checkOut,
            user_id: userId,
            propertyId: property_id,
            Guests: guests
        });
    }, [checkIn, checkOut, userId, property_id, guests]);

    const handleReservation = async (e) => {
        e.preventDefault(); // Prevent default form submission(cause html has a default form submission)

        try {
            const response = await axios.post('http://localhost:80/Abysinia-Abode/src/api/BookReservation.php', reservation, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(response.data);

            // Only submitting the form after the reservation is successfully processed
            if (response.data.message === 'success')
                e.currentTarget.submit();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className={style.bookingReservation}>
            <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
                <section>
                    <input type="hidden" name="public_key" value={public_key} />
                    <input type="hidden" name="tx_ref" value={tx_ref} />
                    <input type="hidden" name="amount" value={amount} />
                    <input type="hidden" name="currency" value="ETB" />
                </section>
                <section>
                    <input type="hidden" name="email" value={email} />
                    <input type="hidden" name="first_name" value={checkIn} />
                    <input type="hidden" name="last_name" value={checkOut} />
                    <input type="hidden" name="title" value="Let us do this" />

                </section>
                <button type="submit" className={style.availabilityButton} onClick={handleReservation}>Book</button>
                <button type="submit" >Pay Now</button>
            </form>
        </div>
    );
}

export default BookingReservation;