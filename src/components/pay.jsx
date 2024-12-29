import React, { useState } from 'react';
import BookReservation from '../pages/BookReservation';
import style from '../styles/bookReservations.module.css';

function Pay(props) {
    const [checkIn, setcheckIn] = useState('');
    const [checkOut, setcheckOut] = useState('');
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState(50);
    const [guests, setGuests] = useState(0);

    const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
    const tx_ref = `${email}-tx-${randomNumber}`;//will ask mak on how this works with email bein empty.

    const public_key = 'CHAPUBK_TEST-1PLg4HAlgFw6PQ09vBEgEcuVCTSvoI30';

    return (
        <div className={style.pay}>
            <div>
                <div className={style.payment}>
                    <section>
                        <label htmlFor="input">Check in:</label>
                        <input onChange={(e) => { setcheckIn(e.target.value) }} type="date" />
                        <label htmlFor="input">Check out:</label>
                        <input onChange={(e) => { setcheckOut(e.target.value) }} type="date" />
                        {/* <label htmlFor="input">Email:</label>
                        <input onChange={(e) => { setEmail(e.target.value) }} type="email" /> */}
                    </section>
                    <section>
                        <label htmlFor="input">Amount:</label>
                        <input onChange={(e) => { setAmount(e.target.value) }} type="number" />
                        <label htmlFor="input">guests:</label>
                        <input onChange={(e) => { setGuests(e.target.value) }} type="number" />

                    </section>
                </div>
                <BookReservation
                    checkIn={checkIn}
                    checkOut={checkOut}
                    email={email}
                    amount={amount}
                    tx_ref={tx_ref}
                    public_key={public_key}
                    guests={guests}
                    property_id={props.property_id}
                />

            </div>
        </div>
    )
}

export default Pay;