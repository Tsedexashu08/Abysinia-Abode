import React from 'react'
import style from '../styles/addPropertyStyle.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

// AddPropertyPage component for adding a new property
function AddPropertyPage() {
    const [property, setProperty] = useState({
        amenities: [], // Initialize amenities as an empty array
    });
    const navigate = useNavigate(); // Hook for navigation after submitting the form

    // Handle changes in checkbox inputs for amenities
    const handleCheckboxChange = (e) => {
        const { checked, value } = e.target; // Get checked status and value from the input
        setProperty(prevProperty => {
            const updatedAmenities = prevProperty.amenities || []; // Ensure amenities is always defined
            if (checked) {
                // Add to the amenities array if checked
                return {
                    ...prevProperty,
                    amenities: [...updatedAmenities, value],
                };
            } else {
                // Remove from the amenities array if unchecked
                return {
                    ...prevProperty,
                    amenities: updatedAmenities.filter(amenity => amenity !== value),
                };
            }
        });
    };

    // Handle image file uploads
    const handleImageUpload = (e) => {
        const { files } = e.target; // Get selected files from the event target
        const updatedImages = Array.from(files); // Convert FileList to an array of File objects

        setProperty(prevProperty => {
            const existingImages = prevProperty.images || []; // Ensure images is always defined
            return {
                ...prevProperty,
                images: [...existingImages, ...updatedImages], // Add new File objects to the existing ones
            };
        });
    };

    // Set initial property state with user ID on component mount
    useEffect(() => {
        setProperty({
            user_id: sessionStorage.getItem('user_id'), // Pass current user ID for the API query
        });
    }, []);

    // Handle changes in text input fields
    const handleChange = (e) => {
        const { name, value } = e.target; // Get name and value from the input
        setProperty(values => ({ ...values, [name]: value })); // Update property state
    };

    // Function to handle form submission
    const AddProperty = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Send property data to the server using axios
        axios.post('http://localhost:80/Abysinia-Abode/src/api/AddProperty.php', property, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set content type for form data
            },
        })
        .then(response => {
            console.log(response.data); // Log the response data
            navigate('/myproperties'); // Navigate to the properties page after successful addition
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors that occur during the request
            navigate('/editAccount'); // Navigate to the edit account page on error
        });
    };

    console.log(property); // Logging the current property state for debugging(will take out later.)

    return (
        <>
            <div className={style.container}> {/* Main container for the add property form */}
                <h1>Add Your Property</h1>
                <form action="#" method="POST" enctype="multipart/form-data" onSubmit={AddProperty}>
                    {/* Property Title Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="title">Property Title</label>
                        <input type="text" id="title" name="title" placeholder="Cozy Downtown Apartment" required onChange={handleChange} />
                    </div>

                    {/* Property Type Selection */}
                    <div className={style.formGroup}>
                        <label htmlFor="property-type">Property Type</label>
                        <select id="property-type" name="property_type" required onChange={handleChange}>
                            <option value="Apartment">Apartment</option>
                            <option value="House">House</option>
                            <option value="Villa">Villa</option>
                            <option value="Condo">Condo</option>
                        </select>
                    </div>

                    {/* For Sale Selection */}
                    <div className={style.formGroup}>
                        <label htmlFor="forsale">For Sale</label>
                        <select id="forsale" name="forsale" required onChange={handleChange}>
                            <option value="True">Yes</option>
                            <option value="False">No</option>
                        </select>
                    </div>

                    {/* Location Inputs */}
                    <div className={style.formGroup}>
                        <label htmlFor="location">Location</label>
                        <input type="text" id="street" name="street" placeholder="Street Address" required onChange={handleChange} />
                        <input type="text" id="city" name="city" placeholder="City" required onChange={handleChange} />
                        <input type="text" id="state" name="state" placeholder="State/Region" required onChange={handleChange} />
                        <input type="text" id="zip" name="zip" placeholder="Postal/ZIP Code" required onChange={handleChange} />
                        <input type="text" id="country" name="country" placeholder="Country" required onChange={handleChange} />
                    </div>

                    {/* Image Upload Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="photos">Photos</label>
                        <input type="file" id="photos" name="images" multiple required onChange={handleImageUpload} />
                    </div>

                    {/* Number of Rooms Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="rooms">Number of Rooms</label>
                        <input type="number" id="bedrooms" name="bedrooms" placeholder="Bedrooms" min="1" required onChange={handleChange} />
                        <input type="number" id="bathrooms" name="bathrooms" placeholder="Bathrooms" min="1" required onChange={handleChange} />
                    </div>

                    {/* Maximum Occupancy Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="occupancy">Maximum Occupancy</label>
                        <input type="number" id="occupancy" name="occupancy" placeholder="Number of Guests" min="1" required onChange={handleChange} />
                    </div>

                    {/* Amenities Checkboxes */}
                    <div className={style.formGroup}>
                        <label htmlFor="amenities">Amenities</label>
                        <input type="checkbox" id="wifi" name="amenities" value="wifi" onChange={handleCheckboxChange} /> Wifi <br />
                        <input type="checkbox" id="kitchen" name="amenities" value="kitchen" onChange={handleCheckboxChange} /> Kitchen<br />
                        <input type="checkbox" id="parking" name="amenities" value="parking" onChange={handleCheckboxChange} /> Parking<br />
                        <input type="checkbox" id="pool" name="amenities" value="pool" onChange={handleCheckboxChange} /> Pool<br />
                        <input type="checkbox" id="Surveillance" name="amenities" value="Surveillance" onChange={handleCheckboxChange} /> Surveillance<br />
                        <input type="checkbox" id="Laundry" name="amenities" value="Laundry" onChange={handleCheckboxChange} /> Laundry<br />
                        <input type="checkbox" id="Hot Water" name="amenities" value="Hot Water" onChange={handleCheckboxChange} /> Hot Water<br />
                    </div>

                    {/* Price Per Night Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="price">Price Per Night</label>
                        <input type="number" id="price" name="price" placeholder="Price in USD" required onChange={handleChange} />
                    </div>

                    {/* Property Description Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="description">Property Description</label>
                        <textarea id="description" name="description" rows="4" placeholder="Describe your property" required onChange={handleChange}></textarea>
                    </div>

                    {/* Availability Inputs */}
                    <div className={style.formGroup}>
                        <label htmlFor="availability">Availability</label>
                        <input type="date" id="availability-start" name="availability-start" required onChange={handleChange} />
                        <input type="date" id="availability-end" name="availability-end" required onChange={handleChange} />
                    </div>

                    {/* Property Rules Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="rules">Property Rules</label>
                        <textarea id="rules" name="rules" rows="2" placeholder="No smoking, no pets, etc." required onChange={handleChange}></textarea>
                    </div>

                    {/* Cancellation Policy Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="cancellation">Cancellation Policy</label>
                        <textarea id="cancellation" name="cancellation" rows="2" placeholder="Provide cancellation policy" required onChange={handleChange}></textarea>
                    </div>

                    {/* Property Size Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="size">Property Size (m<sup>2</sup>)</label>
                        <input type="number" id="size" name="size" placeholder="Property size in square feet" required onChange={handleChange} />
                    </div>

                    {/* Security Deposit Input */}
                    <div className={style.formGroup}>
                        <label htmlFor="deposit">Security Deposit (ETB)</label>
                        <input type="number" id="deposit" name="deposit" placeholder="Amount in ETB" required onChange={handleChange} />
                    </div>

                    <button type="submit">Add Property</button> {/* Submit button for the form */}
                </form>
            </div>
        </>
    );
}

export default AddPropertyPage;