import React, { useState, useEffect } from 'react';
import SearchPanel from '../components/searchSection';
import PropertyCard from '../components/propertyCard';
import PropPageStyle from '../styles/PropertyListPage.module.css';
import avatar from '../images/avatar.png'
import notfoundimg from '../images/notfound.png'
import { useNavigate } from 'react-router-dom';

function PropertyListPage() {
  const navigate = useNavigate()
  const [PropertyInfo, setPropertyInfo] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchesFound, setSearchesFound] = useState(0);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchProperties.php', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log('User Fetch Success:', data);
        setPropertyInfo(data.data || []); // Ensure it's always an array
      } catch (error) {
        console.error('Fetch Error:', error);
        setPropertyInfo([]); // In case of an error, setting it to an empty array(cause apparrently if its empty ,it dont know its an array n says length property not defined.)
      }
    };
    fetchProperties();
  }, []);

  const handleSearch = (value) => {
    setSearchedValue(value);
    searchProperty(value);
    if (value === '') setSearchesFound(0);//seting its value back to zero if user leaves searchbar.
  };

  const searchProperty = (value) => {
    const results = PropertyInfo.filter(property =>
      property.property_name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchesFound(results.length);
    setSearchResults(results);
  };

  const handleSort = (option) => {
    setFilterValue(option);
    if (option === 'property_name') {
      const sortedProperties = [...PropertyInfo].sort((a, b) => 
        a.property_name.toLowerCase().localeCompare(b.property_name.toLowerCase())
      );
      setPropertyInfo(sortedProperties); // Update state with sorted properties
    }
    if (option === 'price') {
      const sortedProperties = [...PropertyInfo].sort((a, b) => 
          a.price - b.price
      );
      setPropertyInfo(sortedProperties); // Update state with sorted properties
  }
  };

  console.log(PropertyInfo);
  return (
    <div className={PropPageStyle.propertyListPage}>
      <SearchPanel onSearch={handleSearch} onSort={handleSort} searchesFound={searchesFound} />
      <div className={PropPageStyle.cardList}>
        {searchedValue === '' ? PropertyInfo.length > 0 ? (
          PropertyInfo.map((property) => (
            <PropertyCard 
              key={property.property_id} // Add a unique key prop
              src={`http://localhost/Abysinia-Abode/src/api/${property.image}`} 
              name={property.property_name} 
              id={property.property_id} 
            />
          ))
        ) : (
        <>
        <div className={PropPageStyle.addProperty}>
          <img src={avatar} alt="pointin Avatar" />
          <button onClick={()=>{navigate('/addProperty')}}>Add Your own Property</button>
        </div>
        </>
        ) : searchResults.length > 0 ? (
          searchResults.map((property) => (
            <PropertyCard 
              key={property.property_id} // Add a unique key prop
              src={`http://localhost/Abysinia-Abode/src/api/${property.image}`} 
              name={property.property_name} 
              id={property.property_id} 
            />
          ))
        ) : (
          <div className={PropPageStyle.notfound}>
            <img src={notfoundimg} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default PropertyListPage;