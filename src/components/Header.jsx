import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultuser from '../images/user.png';
import HeaderStyle from '../styles/header.module.css';


const Header = () => {
  const username = (sessionStorage.getItem('username'));//getting credentails of currently logged in user set in login page.
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {//fetching the current ussers data to set profile pic and user name in header.
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchUser.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: (username), // Send the user object
        });

        const data = await response.json();
        console.log('User Fetch Success:', data);

        // Assuming data.data is an array and contains profile_pic
        if (data.data && data.data.length > 0) {
          setProfilePic(data.data[0].profile_pic); // Setting the profile picture URL cause thats what stored in the db and not the actuall image.
          sessionStorage.setItem('user_id', data.data[0].user_id)//retrieving the user id of current user(b/c we gonna store it in a session to use it in every other page)
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    };

    fetchUserData(); // Start by fetching user data and setting the profile pic of logged in user in header.
  }, [username]);
  return (
    <div className={HeaderStyle.header}>
      <span><Link className={HeaderStyle.heading} to='/home'>Abyssynia Abode</Link></span>
      <div className={HeaderStyle.account}>
        <div className={HeaderStyle.accountPhoto}>
          {profilePic ? (
            // if profilepic state has value set its value in img below to display propic.
            <img src={`http://localhost/Abysinia-Abode/src/api/${profilePic}`} alt='Profile' />
          ) : (
            <img src={defaultuser} alt='Default User' />
            // if its empty display default usericon.
          )}
        </div>
        <Link to="/account">{username}</Link>
      </div>
    </div>
  );
};

export default Header;