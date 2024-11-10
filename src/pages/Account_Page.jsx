import React, { useEffect, useState } from 'react';
import editIcon from '../images/editicon.png'
import propertyIcon from '../images/propertyIcon.png'
import eventIcon from '../images/event.png'
import logoutIcon from '../images/logout.png'
import { useAuth } from '../components/AuthProvider';
import { Link, useNavigate } from 'react-router-dom'
import style from '../styles/acountStyle.module.css'
import AccountBanner from '../components/AccountBanner'
import { getDateOfBirth } from '../components/functions';
import { useOutletContext } from 'react-router-dom';
import img from '../images/settings.png'
import avatar from '../images/avatar.png'





function Account_Page() {
  const { onChange } = useOutletContext()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [account, setAccountInfo] = useState([])
  const [purchases, setPurchases] = useState([])//state for stroring and displaying purchases in account page.
  const user_id = (sessionStorage.getItem('user_id'));//id of currently logged in user that we got from login page and header component.


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchUserForAccountPage.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: (user_id), // Send the user_id to the php script.
        });

        const data = await response.json();
        console.log('User Fetch Success:', data);
        setAccountInfo(data.data[0] || [])
        onChange(true)
      } catch (error) {
        console.error('Fetch Error:', error);
        setAccountInfo([])
      }
    };

    const fetchUserReservations = async () => {
      try {
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/ViewPurchaseHistory.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id }), // Correctly stringify the user_id
        });

        // Check if the response is okay.
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('User Fetch Success:', data);
        setPurchases(data.data || []); // Adjusted to handle data correctly
      } catch (error) {
        console.error('Fetch Error:', error);
        setPurchases([]);
      }
    };

    fetchUserData();
    fetchUserReservations() // Starting by fetching user data and setting the relevant information in the account page..;
  }, []);

  return (
    <div className={`${style.AccountPage}`}>
      <div className={`${style.sideBar}`}>
        <span className={style.general}><img src={img} alt="" />General</span>
        <Link className={style.links} to="/editAccount"><img src={editIcon} alt="edit" /> Edit Account</Link>
        <Link className={style.links} to="/myproperties"><img src={propertyIcon} alt="edit" />My Properties</Link>
        <Link className={style.links} to='/addevent'><img src={eventIcon} />Add event</Link>
        <Link className={style.links} to='/' onClick={logout}><img src={logoutIcon} />Log Out</Link>
      </div>

      <div className={style.account}>
        <div className={style.accountInfo}>

          <AccountBanner img={`http://localhost/Abysinia-Abode/src/api/${account.profile_pic}`}
            accountName={account.username}
            accountType={`${account.account_type}`}
            propertyAmount={`${account.properties_owned}`}
            propertySold={`${account.properties_sold}`}
          />


        </div>
        <div className={style.data}>
          <div className={style.infoSection}>

            <div className={style.accountInformation}>
              <section>

                <label htmlFor="fullname">Full Name:</label>
                <input type="text" id="fullname" name="fullname" value={account.full_name} /><br />

                <label htmlFor="email">email:</label>
                <input type="text" id="email" name="email" value={account.email} /><br />

                <label htmlFor="dob">Date of Birth:</label>
                <input type="text" id="dob" name="dob" value={getDateOfBirth(account.age)} /><br />

                <label htmlFor="nationality">Nationality:</label>
                <input type="text" id="nationality" name="nationality" value={account.nationality} /><br />
              </section>
              <section>

                <label htmlFor="tel">Telephone:</label>
                <input type="tel" id="tel" name="tel" value={account.phone_no} /><br />

                <label htmlFor="user">Username:</label>
                <input type="text" id="user" name='user' value={account.username} /><br />

                <label htmlFor="pass">Password:</label>
                <input type="password" id="pass" name="pass" value={account.password} /><br />

                <label htmlFor="user">created at:</label>
                <input type="text" id="createdate" name='createdate' value={account.created_at} /><br />
              </section>

            </div>
            <div className={style.addProperty}>
              <img src={avatar} alt="pointin Avatar" />
              <button onClick={() => { navigate('/addProperty') }}>Add Property</button>
            </div>
          </div>
          <div className={style.purchaseHistory}>
            <h2>Purchase History</h2>
            <div className={style.historyTable}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Purchase History</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.length > 0 ? (
                    purchases.map((purchase, index) => (
                      <tr key={index}>
                        <td>{purchase.property_name}</td>
                        <td>{purchase.purchase_date}</td>
                        <td>{purchase.property_price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center' }}>
                        <h1>No purchase history...</h1>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Account_Page
