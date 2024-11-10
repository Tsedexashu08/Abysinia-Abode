import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../styles/HomePageStyle.module.css'
import searchIcon from '../images/search-icon.png'
import EventLists from '../components/eventofferlists'
import { OfferLists } from '../components/eventofferlists'
import propimage from '../images/addpropimage.png'




function HomePage() {//homepage
    return (
        <div className={`${style.HomePage}`}>
            <div className={`${style.searchSection}`}>
                <div className={`${style.searchbar}`}>
                    <MainSearch />
                </div>
                <h1>Unlock the world one Local<br /> Experience at a time.</h1>
            </div>
            <div className={`${style.eventsection}`}>
                <h1>Checkout some upcoming events near you</h1>
                <EventLists /> {/* component for displayin events */}
            </div>
            <div className={`${style.offersection}`}>
                <h1>We also offer</h1>
                <OfferLists /> {/* component for displayin offers(properties forsale.) */}
            </div>
            <div className={`${style.addPropertysection}`}>
                <div className={style.texts}>
                    <h1>Are you a seller?</h1>
                    <h3>Showcase your property here!</h3>
                    <button className={style.addpropbutton}><Link to='/addProperty' className={style.link}>Add Property</Link> </button>
                </div>
                <div className={style.image}>
                    <img src={propimage} alt="addproperty img" />

                </div>
            </div>
        </div>
    )
}


function MainSearch() {//the search bar in home page.(this searches what reservations the currently logged in user has by place name).
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('user_id');//retrieving the user id we stored in sessionstorage earlier.(cause we need it in our mysql procedure.)
    const [searchedResult, setSearchedResult] = useState([]);//state for storing the search results.
    const [destination, setDestination] = useState('');//state for storing searched place input.
    const [error, setError] = useState(''); // State for error handling

    const handleDestination = (e) => {
        setDestination(e.target.value);
    };

    const handleSearch = async () => {
        const reservationData = {//puttin the user id(since we need it in our stored procedure) & the place searched in a object(so we can send it as a single entity to the php script).
            user_id: userId,
            property_name: destination,
        };

        setError(''); // Reset error state before fetching

        try {//sending the searched data to searchreservation php script.(with fetch api(api calls are the same in every page))
            const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/SearchReservation.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData), //this method Converts objects to JSON string(since thats how php recieves em).
            });
            const data = await response.json();

            if (data.status === 'success' && data.data.length > 0) {
                console.log('User Fetch Success:', data);
                setSearchedResult(data.data);//if searched reservation exists set the data of that resrvation in searchresult state(for displaying it)
                navigate(`/ReservationDetails/${destination}`);//taking user to reservation details page to show the reservation in that page.
            } else {
                // Setting the error state if no reservations are found
                setError(`you have no reservations made at "${destination}".`);
                console.log('No reservations found');
                setTimeout(() => {
                    setError('');
                }, 3000);//setting the error popup to dissapear after a few secs.

            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setError('An error occurred while fetching reservations.');
            setSearchedResult([]);//emptying the searchresults state when no results found on text change.
        }
    };

    return (
        <>
            <div className={`${style.Main}`}>
                <div className={`${style.searches}`}>
                    <input type='text' onChange={handleDestination} placeholder='search for your reservations ....' value={destination} />
                </div>

                <button onClick={handleSearch}><img src={searchIcon} alt="" /></button>
            </div>
            {error && (
                <div className={style.errorPopup}>
                    <p>{error}</p>
                </div>
            )} {/* Displaying error message if searchnot found */}
        </>
    );
}

export default HomePage


