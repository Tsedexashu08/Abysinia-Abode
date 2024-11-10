import { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import style from '../styles/acountStyle.module.css';
import { getDateOfBirth } from './functions';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';


function EditAccount() {
    const user_id = sessionStorage.getItem('user_id'); // id of current user.
    const [currentUser, setCurrentUser] = useState({});//state for storing data of currnet use(we fetch this from the db and set input values of the form)
    const navigate = useNavigate()
    const { onChange } = useOutletContext();//this is just a hook for rerendering the header(thats how i solved the header reloading when user name or profile pic is edited)

    useEffect(() => {
        // turning dob text feild to date type to show placeholder text as current date of birth(i added this because html doesnt allow place holders for date type inputs).
        document.getElementById('dob').addEventListener('focus', function () {
            this.type = 'date'; // Change to date input on focus(when its clicked)
        });

        document.getElementById('dob').addEventListener('blur', function () {//turning it back to text type when its empty.
            if (!this.value) {
                this.type = 'text';
            }
        });

        const fetchUserData = async () => {
            try {//retrieving the current users dat for putting it in the editform.
                const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchUserForAccountPage.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: (user_id), // Send the user object.
                });

                const data = await response.json();
                console.log('User Fetch Success:', data);

                // Assuming data.data is an array and contains profile_pic
                if (data.data && data.data.length > 0) {
                    setCurrentUser(data.data[0]); // Set the data of currently logged in user.
                }
            } catch (error) {
                console.error('Fetch Error:', error);
            }
        };

        fetchUserData();
    }, []);


    const handleEdit = async (e) => {//this method is called when edit button is clicked and sends the form dat so the dat of current user is edited.
        e.preventDefault();
        axios.post('http://localhost:80/Abysinia-Abode/src/api/EditUser.php', currentUser, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                console.log(response.data);
                sessionStorage.setItem('username', currentUser.username)//changing the user name in session storage(just incase user edits the username we set in loggin).
                navigate('/account')//taking user to account page after edit to see changes.
                onChange(true)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    console.log(currentUser)//logging data for debugging(will take out later).

    return (
        <div className={style.editAcc}>
            <form className={style.editForm} onSubmit={handleEdit}>
                <fieldset>
                    <legend>Edit Account</legend>
                    <label htmlFor="email">Write email to edit:</label>
                    <input type="text" id="email" name="email" value={currentUser.email || ''} onChange={(e) => {
                        setCurrentUser({
                            ...currentUser,
                            email: e.target.value
                        })//setting the values of the inputs from retrieved current user data.
                    }} /><br />

                   

                    <label htmlFor="fullname">Full Name:</label>
                    <input type="text" id="fullname" name="fullname" value={currentUser.full_name || ''} onChange={(e) => {
                        setCurrentUser({
                            ...currentUser,
                            full_name: e.target.value
                        })
                    }} /><br />

                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="text" id="dob" name="dob" value={getDateOfBirth(currentUser.age) || ''} onChange={(e) => {
                        setCurrentUser({
                            ...currentUser,
                            age: e.target.value
                        })
                    }} /><br />

                    <label htmlFor="nationality">Nationality:</label>
                    <input type="text" id="nationality" name="nationality" value={currentUser.nationality || ''} onChange={(e) => {
                        setCurrentUser({
                            ...currentUser,
                            nationality: e.target.value
                        })
                    }} /><br />

                    <label htmlFor="tel">Telephone:</label>
                    <input type="tel" id="tel" name="tel" value={currentUser.phone_no || ''} onChange={(e) => {
                        setCurrentUser({
                            ...currentUser,
                            phone_no: e.target.value
                        })
                    }} /><br />

                    <label htmlFor="user">Username:</label>
                    <input type="text" id="user" name='user' value={currentUser.username || ''} onChange={(e) => {
                        setCurrentUser({
                            ...currentUser,
                            username: e.target.value,
                        })
                    }} /><br />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" id="pass" name="pass" value={currentUser.password} onChange={(e) => {
                        setCurrentUser({
                            ...currentUser,
                            password: e.target.value
                        })
                    }} /><br />

                    <label htmlFor="Cpass">Confirm Password:</label>
                    <input type="password" id="Cpass" name="Cpass" value={currentUser.password} /><br />
                    <input type="submit" value="Edit" />
                </fieldset>
            </form>
        </div>
    );
}

export default EditAccount;