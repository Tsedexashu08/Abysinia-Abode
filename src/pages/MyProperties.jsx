import { useEffect, useState } from "react";
import cardListStyle from '../styles/Myproperties.module.css';
import MyPropertyCard from "../components/MyPropertyCard";
import searchIcon from '../images/search-icon.png'
import avatar from '../images/avatar.png'
import { useNavigate } from "react-router-dom";


function MyProperties() {
    const navigate = useNavigate()
    const [properties, setProperties] = useState({});
    const [searchValue, setSearchedValue] = useState('')
    const [searchResults, setSearchedResults] = useState([])

    useEffect(() => {
        const fetchMyProperties = async () => {
            try {
                const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchMyProperties.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: (sessionStorage.getItem('user_id')),
                });
                const data = await response.json();

                console.log('User Fetch Success:', data);
                setProperties(data.data || []);
            } catch (error) {
                console.error('Fetch Error:', error);
                setProperties([]);
            }
        };
        fetchMyProperties();
    }, []);


    const handleSearch = (e) => {
        const value = e.target.value
        setSearchedValue(value)
        searchProperty(value)
    }

    const searchProperty = (value) => {
        const results = properties.filter(property =>
            property.property_name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchedResults(results);
    };
    console.log(properties);

    return (
        <div className={cardListStyle.myproperties}>
            <div className={cardListStyle.SearchBar}>
                <h2>My Properties</h2>
                <div className={cardListStyle.search}>
                    <img src={searchIcon} alt='search-icon' />
                    <input type="text" placeholder="  Search your properties by name" onChange={handleSearch}></input>
                </div>
            </div>
            <div className={cardListStyle.cardlist}>
                {searchValue === '' ? properties.length > 0 ? (
                    properties.map((property) => (
                        <MyPropertyCard
                            id={property.property_id}
                            name={property.property_name}
                            type={property.property_type}
                            forSale={property.for_sale ? 'True' : 'False'}
                            description={property.description}
                            price={property.price}
                            location={property.location}
                            availability={property.availability ? 'True' : 'False'}
                            size={property.property_size}
                            createdAt={property.created_at}
                            policy={property.cancellation_policy}
                            src={`http://localhost/Abysinia-Abode/src/api/${property.image}`}
                        />
                    ))
                ) : (
                    <div className={cardListStyle.none}>
                        <h1>you dont seem to own any property...</h1>
                        <div className={cardListStyle.addProperty}>
                            <img src={avatar} alt="pointin Avatar" />
                            <button onClick={() => { navigate('/addProperty') }}>Add a Property</button>
                        </div>
                    </div>
                ) : searchResults.length > 0 ? (
                    searchResults.map((property) => (
                        <MyPropertyCard
                            id={property.id}
                            name={property.property_name}
                            type={property.property_type}
                            forSale={property.for_sale ? 'True' : 'False'}
                            description={property.description}
                            price={property.price}
                            location={property.location}
                            availability={property.availability}
                            size={property.property_size}
                            createdAt={property.created_at}
                            policy={property.cancellation_policy}
                            src={`http://localhost/Abysinia-Abode/src/api/${property.image}`}
                        />
                    ))
                ) : (
                    <div className={cardListStyle.noproperties}>
                        <h1>you dont own properties by that name...</h1>

                    </div>
                )



                }
            </div>
        </div>
    );
}

export default MyProperties;