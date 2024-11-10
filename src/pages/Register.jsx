import Card from '../components/card.jsx'
import style from '../styles/styles.module.css'
import { Link } from 'react-router-dom';

function Register() {//component(page) for signing up a user(as owner or customer).
    const customerClick = () => console.log("Customer Clicked");
    const ownerClick = () => console.log("Owner Clicked");

    return (
        <>
        <div className={style.registerpage}>
            <main>
                <h1>Join as Customer or Owner?</h1>
                <div className={style.horizontal}>
                    <Link to='/signup'><Card title="Customer" desc="I want to book and visit resorts." click={customerClick} /></Link>
                    <Link to='/signup'><Card title="Owner" desc="I want to rent out and promote my properties." click={ownerClick} /></Link>
                </div>
            </main>
        </div>
        </>
    )
}

export default Register