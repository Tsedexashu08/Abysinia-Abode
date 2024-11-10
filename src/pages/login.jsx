import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider'; // Import the AuthContext
import style from '../styles/styles.module.css';
import bg from '../images/bg.png';

function Login() {
    const { login } = useAuth();
    const [user, setUser] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/HandleLogin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            if (data.success) {
                console.log('User Fetch Success:', data);
                sessionStorage.setItem('username', user.username);
                login(); // Update the authentication context
                navigate('/home'); // Redirecting to home page
            } else {
                console.error(data.message || 'Login failed');
                setError('Incorrect username or password');
            }

        } catch (error) {
            console.error('Fetch Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className={style.loginPage}>
            <h1>Abyssinya Abode</h1>
            <form className={style.login} onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Login</legend>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleInputChange}
                        required
                    /><br />
                    <label htmlFor="pass">Password: </label>
                    <input
                        type="password"
                        id="pass"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        required
                    /><br />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input type="submit" value="LOGIN" className='submit' />
                    <span>Don't have an account? <Link to='/register'>Signup</Link></span>
                </fieldset>
            </form>
            <img className={style.bg} src={bg} alt="" />
        </div>
    );
}

export default Login;