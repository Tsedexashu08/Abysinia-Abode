import style from '../styles/styles.module.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CustomerSignup() {
  const formData = new FormData();//formdata object we use to append and store all input states in a single variable.
  const [inputs, setInputs] = useState({//state for storing each input from the form with appropriate name.
    fname: '',
    mname: '',
    lname: '',
    dob: '',
    nationality: '',
    tel: '',
    email: '',
    user: '',
  });
  //each state below will store the value of the input with the same name as itself.
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');
  const [accountType, setAccountType] = useState('customer');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {//function that setsthe states when input values change.
    const { name, value } = e.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleCheckboxChange = (e) => {//function that sets the value of which checkbox is selected.
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setError('');
    }
  };

  const handleAccountType = (e) => {//function that sets the account type selected from the select options in the form.
    setAccountType(e.target.value);
  };

  const handleImageChange = (e) => {//function that sets the image(profilepic) selceted when file is selected into the images state.
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else if (!isChecked) {
      setError('You must agree to the terms of use.');
    } else {
      setError('');
      formData.append('profile_pic', image);//appending(storing the values below for each input into the form object with 
      //the names in brackets.(those names are what are used in the php script to fetch the values.))
      formData.append('password', password);
      formData.append('accountType', accountType);

      // Append all input fields to FormData object so we just send the form data object to the php script.
      Object.keys(inputs).forEach((key) => {
        formData.append(key, inputs[key]);
      });

      // Send request to the server
      axios.post('http://localhost:80/Abysinia-Abode/src/api/AddUser.php', formData, {//sending the data from the forms same as other pages but this time with axios(its a react library dont stress it(itis  just another api.))
          headers: {//THE PHP SCRIPTS WE USE IN EACH CALL ARE THE FILES WITH SAME NAME AT THE END OF THE URL ABOVE(in this case(ADDUSER.PHP))
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.message === 'User registered successfully') {//if successfull take the user to the login page to login.
            navigate('/');// "/"-is the path of login page(if u guys wanna see the paths of each page look at the App.js file)
          } else {
            setError(response.data.message);//else display the error.
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setError('An error occurred during registration.');
        });
    }
  };

  return (
    <>
      <div className={style.signuppage}>
        <h1>Abyssinya Abode</h1>
        <form onSubmit={handleSubmit} method='POST' encType="multipart/form-data" className={style.signUp}>
          <fieldset>
            <legend>Sign up</legend>
            <label htmlFor="fileInput">Choose an image for your profile picture:</label>
            <input type="file" id="fileInput" name="profile_pic" accept="image/*" onChange={handleImageChange} />
            <label htmlFor="fname">First name:</label>
            <input type="text" id="fname" name="fname" value={inputs.fname} onChange={handleChange} required /><br />
            <label htmlFor="mname">Middle Name:</label>
            <input type="text" id="mname" name="mname" value={inputs.mname} onChange={handleChange} /><br />
            <label htmlFor="lname">Last Name:</label>
            <input type="text" id="lname" name="lname" value={inputs.lname} onChange={handleChange} required /><br />
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" value={inputs.dob} onChange={handleChange} /><br />
            <label htmlFor="nationality">Nationality:</label>
            <input type="text" id="nationality" name="nationality" value={inputs.nationality} onChange={handleChange} required /><br />
            <label htmlFor="tel">Telephone:</label>
            <input type="tel" id="tel" name="tel" value={inputs.tel} onChange={handleChange} required /><br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={inputs.email} onChange={handleChange} required /><br />
            <label htmlFor="accountType">Account type:</label>
            <select name="accountType" value={accountType} onChange={handleAccountType}>
              <option value="owner">Owner</option>
              <option value="customer">Customer</option>
            </select><br />
            <br />
            <label htmlFor="user">Username:</label>
            <input type="text" id="user" name='user' value={inputs.user} onChange={handleChange} required /><br />
            <label htmlFor="pass">Password:</label>
            <input type="password" value={password} id="pass" name="pass" onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="Cpass">Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="Cpass" required />
            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>}{/* //display the error if its set */}
            <div className={style.agreement}>
              <input type="checkbox" id="terms" checked={isChecked} onChange={handleCheckboxChange} />
              <label htmlFor="terms">I have agreed to the <Link to='/termsPage'> Terms of use</Link></label>
            </div>
            <input type="submit" value="Sign up" />
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default CustomerSignup;