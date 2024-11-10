import React, { useState } from 'react';
import style from '../styles/acountStyle.module.css';
import PropertyInformation from './PropertyInformation';
import icon from '../images/changeprofile.png'
import { useNavigate } from 'react-router-dom';

function AccountBanner(props) {
  const formData = new FormData();//formdata object for appending and sending input data to php.
  const user_id = sessionStorage.getItem('user_id')//retrieving user id from sessionstorage(of current user)
  const [updatedPropPic, setPropic] = useState({})//state fro storing new propic
  const handleUpload = () => {//function to open file input on button click.
    document.querySelector('#fileinput').click();
  };

  const ChangeProfilePic = async (file) => {//function for updating profile pic in db.
    try {
      formData.append('user_id', user_id);//
      formData.append('profile_pic', file); // Use the passed file directly

      const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/EditProfilePicture.php', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        console.log('Profile picture updated successfully');
      } else {
        console.error('Error:', result.error);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
    window.location.reload();//reload page to see updated profile pic.
  };

  console.log(updatedPropPic)//logging for debugging (will take out later).

  return (
    <div className={style.accountBanner}>
      <div className={style.Propic}>
        <img src={props.img} alt="" />
      </div>
      <div className={style.info}>
        <h2>{props.accountName}</h2>
        <h3>{props.accountType}</h3>
        <div className={style.del}>
          <button className={style.cssbuttonsiobutton} onClick={handleUpload}>
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
            </svg>
            <span><img src={icon} alt="" /></span>
          </button>
          <div>Delete</div>
        </div>
      </div>
      <PropertyInformation propertyAmount={props.propertyAmount} propertySold={props.propertySold} />
      <input type="file" id="fileinput" style={{ display: 'none' }} onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setPropic({//seting updatedpropic state to selected file(image).
            user_id: user_id,
            profile_pic: file
          });
          ChangeProfilePic(file); // Pass the file directly
        }
      }} />
    </div>
  );
}

AccountBanner.defaultProps = {//default value displayed jsut in case info isn't set.
  accountType: "customer account",
  accountName: "Account Name"
};

export default AccountBanner;