import React from 'react'
import { Link } from 'react-router-dom'

export function EventCard(props) {
    return (
        <div className={props.className}>
            <img src={props.src} alt='event image' />
            <h3>{props.name}</h3>
            <Link to={`/EventDetails/${props.name}`}>click here for more</Link>
        </div>)
}

export function OfferCard(props) {
    return (
        <div className={props.className}>
            <img src={props.src} alt='event image' />
            <h3>{props.name}</h3>
            <Link to={`/propertyDetails/${props.name}`}>click here for more</Link>
        </div>)
}
export default EventCard
