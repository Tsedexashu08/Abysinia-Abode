import React from 'react';
import propCardStyle from '../styles/propertyCard.module.css'
import { Link } from 'react-router-dom';





function Card(props) {//this is a card ui meant to display property info in card form.
    return (
        <>
            <div className={propCardStyle.card}>
                <img id={propCardStyle.propImg} src={props.src} alt='property image' />
                <Link to={`/propertyDetails/${props.name}`}>
                    <h3>{props.name}</h3>
                    <p>click here for more</p>
                </Link>
            </div>
        </>

    );
}
Card.defaultProps = {
    name: "property name"
};
export default Card;

