import React from 'react'
import style from '../styles/addPropertyStyle.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditPropertyPage() {//same logic as editing account.
    const  id  = useParams()//property name passed from clicked card.
    console.log(id)
    const navigate = useNavigate()
    const [property, setProperty] = useState({
        amenities: [],//amenties(services a property has)since  theres more than 1 for 1 property we storem in array.
    })

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchProperty.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(id), // Send the property_id.
                });

                const data = await response.json();
                console.log('User Fetch Success:', data);

                // Assuming data.data is an array and contains profile_pic
                if (data.data && data.data.length > 0) {
                    setProperty(data.data[0]); 
                }
            } catch (error) {
                console.error('Fetch Error:', error);
            }
        };
        
        fetchPropertyData();
    }, []);
    // console.log(property)
    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        const value = e.target.value
        setProperty(prevProperty => {
            const updatedAmenities = prevProperty.amenities || []; // Ensuring amenities is always defined
            if (checked) {
                // Add to the amenities array
                return {
                    ...prevProperty,
                    amenities: [...updatedAmenities, value]
                };
            } else {
                // Remove from the amenities array
                return {
                    ...prevProperty,
                    amenities: updatedAmenities.filter(amenity => amenity !== value)
                };
            }
        });
    };

    const handleImageUpload = (e) => {
        const { files } = e.target; // Get selected files from the event target

        // Convert FileList to an array of File objects
        const updatedImages = Array.from(files);

        setProperty(prevProperty => {
            const existingImages = prevProperty.images || []; // Ensure images are always defined
            return {
                ...prevProperty,
                images: [...existingImages, ...updatedImages] // Add new File objects to the existing ones
            };
        });
    };


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProperty(values => ({ ...values, [name]: value }));
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:80/Abysinia-Abode/src/api/EditProperty.php', property, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                console.log(response.data);
                navigate('/myproperties')
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    console.log(property)
    return (
        <>
            <div class={style.container}>
                <h1>Edit Your Property</h1>
                <form action="#" method="POST" enctype="multipart/form-data" onSubmit={handleEdit}>
                    <div class={style.formGroup}>
                        <label for="title">Property Title</label>
                        <input type="text" id="title" name="title" placeholder="Cozy Downtown Apartment" required value={property.property_name || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                name: e.target.value
                            })
                        }
                    }>
                        </input>
                    </div>

                    <div class={style.formGroup}>
                        <label for="property-type">Property Type</label>
                        <select id="property-type" name="property-type" required value={property.property_type || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                property_type: e.target.value
                            })
                        }
                    }>
                            <option value="apartment">Apartment</option>
                            <option value="Hotel">Hotel</option>
                            <option value="House">House</option>
                            <option value="villa">Villa</option>
                            <option value="condo">Condo</option>
                        </select>
                    </div>

                    <div class={style.formGroup}>
                        <label for="location">Location</label>
                        <input type="text" id="street" name="location" placeholder="Street-Address/City/State/Zip-Code/Country" required value={property.location || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                location: e.target.value
                            })
                        }}></input><br />
                    </div>

                    <div class={style.formGroup}>
                        <label for="photos">Photos</label>
                        <input type="file" id="photos" name="images" multiple required onChange={handleImageUpload} ></input>
                    </div>

                    <div class={style.formGroup}>
                        <label for="forsale">For-sale</label>
                        <select id="forsale" name="forsale" required value={property.for_sale|| ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                for_sale: e.target.value
                            })
                        }
                    }>
                            <option value="True">TRUE</option>
                            <option value="False">FALSE</option>
                        </select>
                    </div>
                    <div class={style.formGroup}>
                        <label for="rooms">Number of Rooms</label>
                        <input type="number" id="bedrooms" name="bedrooms" placeholder="Bedrooms" min="1" required onChange={handleChange} value={property.price || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                number_of_rooms: e.target.value
                            })
                        }}></input>
                        <input type="number" id="bathrooms" name="bathrooms" placeholder="Bathrooms" min="1" required onChange={handleChange} value={property.price || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                bathrooms: e.target.value
                            })
                        }}></input>
                    </div>

                    <div class={style.formGroup}>
                        <label for="occupancy">Maximum Occupancy</label>
                        <input type="number" id="occupancy" name="occupancy" placeholder="Number of Guests" min="1" required onChange={handleChange} value={property.max_occupancy || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                max_occupancy: e.target.value
                            })
                        }}></input>
                    </div>

                    <div class={style.formGroup}>
                        <label for="amenities">Amenities</label>
                        <input type="checkbox" id="wifi" name="amenities" value="wifi" onChange={handleCheckboxChange}></input>Wifi
                        <input type="checkbox" id="kitchen" name="amenities" value="kitchen" onChange={handleCheckboxChange}></input>Kitchen
                        <input type="checkbox" id="parking" name="amenities" value="parking" onChange={handleCheckboxChange}></input>Parking
                        <input type="checkbox" id="pool" name="amenities" value="pool" onChange={handleCheckboxChange}></input>Pool
                    </div>
    
                    <div class={style.formGroup}>
                        <label for="price">Price Per Night</label>
                        <input type="number" id="price" name="price" placeholder="Price in USD" required value={property.price || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                price: e.target.value
                            })
                        }}></input>
                    </div>

                    <div class={style.formGroup}>
                        <label for="description">Property Description</label>
                        <textarea id="description" name="description" rows="4" placeholder="Describe your property" required value={property.description || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                description: e.target.value
                            })
                        }
                    }>
                        </textarea>
                    </div>

                    <div class={style.formGroup}>
                        <label for="availability">Availability</label>
                        <input type="date" id="availability-start" name="availability-start" required onChange={handleChange}></input>
                        <input type="date" id="availability-end" name="availability-end" required onChange={handleChange}></input>
                    </div>

                    <div class={style.formGroup}>
                        <label for="rules">Property Rules</label>
                        <textarea id="rules" name="rules" rows="2" placeholder="No smoking, no pets, etc." required  value={property.property_rules || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                property_rules: e.target.value
                            })
                        }}></textarea>
                    </div>

                    <div class={style.formGroup}>
                        <label for="cancellation">Cancellation Policy</label>
                        <textarea id="cancellation" name="cancellation" rows="2" placeholder="Provide cancellation policy" required value={property.cancellation_policy || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                cancellation_policy: e.target.value
                            })
                        }}></textarea>
                    </div>

                    <div class={style.formGroup}>
                        <label for="size">Property Size (sq ft)</label>
                        <input type="number" id="size" name="size" placeholder="Property size in square feet" required value={property.property_size || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                property_size: e.target.value
                            })
                        }}>
                        </input>
                    </div>

                    <div class={style.formGroup}>
                        <label for="deposit">Security Deposit (ETB)</label>
                        <input type="number" id="deposit" name="deposit" placeholder="Amount in USD" required value={property.security_deposit || ''} onChange={(e) => {
                            setProperty({
                                ...property,
                                security_deposit: e.target.value
                            })
                        }}></input>
                    </div>
                <button type="submit">Edit Property</button>
             </form>
        </div>
        </>);
}

export default EditPropertyPage;
