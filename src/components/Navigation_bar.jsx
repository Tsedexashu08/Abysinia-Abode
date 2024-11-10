import React from 'react'
import { Link } from 'react-router-dom'
import NavBarStyle from '../styles/NavigationBar.module.css'
import Homeicon from '../images/home.png'
import PropertyIcon from '../images/propertyiIcon.png'
import AccountIcon from '../images/accountIcon.png'
import RoomIcon from '../images/roomIcon.png'




export default function NavigationBar() {


  return (
    <div className={NavBarStyle.Navigationbar}>
      <Link to="/home"><button><img src={Homeicon} alt="Home" title='Home' /><b>Home</b></button></Link>
      <Link to="/properties"><button><img src={PropertyIcon} alt="Property" title='Property' /><b>Properties</b></button></Link>
      <Link to="/account"><button><img src={AccountIcon} alt="Account" title='Account' /><b>Account</b></button></Link>    
      <Link to={`/rooms`}><button><img src={RoomIcon} alt="Room" title='Room' /><b>Rooms</b></button></Link>
    </div>
  )

};