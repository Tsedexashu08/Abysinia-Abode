import React, { useState } from 'react'; 
import { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import style from '../styles/addPropertyStyle.module.css';

function AddEvent() { // Component for adding events
    const [event, setEvent] = useState({}); // State for holding event data
    const [propertyname, setPropertyname] = useState(''); // State for storing selected property name
    const [properties, setProperties] = useState([]); // State for storing fetched properties
    const navigate = useNavigate(); // Hook for navigation after event submission

    // Effect to fetch properties from the API on component mount
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Fetch properties from the API
                const response = await fetch('http://localhost:80/Abysinia-Abode/src/api/fetchProperties.php', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json(); // Parse JSON response
                console.log('User Fetch Success:', data); // Log successful fetch
                setProperties(data.data || []); // Set properties or an empty array if none
            } catch (error) {
                console.error('Fetch Error:', error); // Log any errors during fetch
                setProperties([]); // Reset properties state on error
            }
        };
        fetchProperties(); // Call the fetch function
    }, []); // Empty dependency array to run once on mount

    console.log(event); // Log event state for debugging

    const handleSelect = (e) => {
        const option = e.target.value; // Get selected option value
        setPropertyname(option); // Update property name state directly as a string
        setEvent((prevEvent) => ({ ...prevEvent, property_name: option })); // Add property_name to the event state
    };

    // Handle changes in input fields
    const handleChange = (e) => {
        const name = e.target.name; // Get input field name
        const value = e.target.value; // Get input field value
        setEvent(values => ({ ...values, [name]: value })); // Update event state with new value
    }

    // Handle image uploads
    const handleImageUpload = (e) => {
        const { files } = e.target; // Get selected files from the event target

        // Convert FileList to an array of File objects
        const updatedImages = Array.from(files);

        setEvent(prevEvent => {
            const existingImages = prevEvent.images || []; // Ensure images are always defined
            return {
                ...prevEvent,
                images: [...existingImages, ...updatedImages] // Add new files to existing images
            };
        });
    };

    // Function to handle form submission
    const AddEvent = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Post event data to the API
        axios.post('http://localhost:80/Abysinia-Abode/src/api/AddEvent.php', event, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set content type for file upload
            }
        })
            .then(response => {
                console.log(response.data); // Log response data
                navigate('/home'); // Navigate to home on successful submission
            })
            .catch(error => {
                console.error('Error:', error); // Log any errors during submission
            });
    }

  

    return (
        <div>
            <div className={style.container}> {/* Use className for React */}
                <h1>Add Your Event</h1> {/* Title of the form */}
                <form action="#" method="POST" enctype="multipart/form-data" onSubmit={AddEvent}>
                    {/* Form group for event title */}
                    <div className={style.formGroup}>
                        <label htmlFor="title">Event Title</label>
                        <input type="text" id="title" name="title" placeholder="Concert by jano band" required onChange={handleChange}></input>
                    </div>

                    {/* Form group for selecting host venue */}
                    <div className={style.formGroup}>
                        <label htmlFor="property_name">Host Venue</label>
                        <select id="property_name" name="property_name" required onChange={handleSelect}>
                            {/* Fetching the property names from the database for selection */}
                            {
                                properties.length > 0 ? (
                                    properties.map((property) => (
                                        <option key={property.property_name} value={property.property_name}>{property.property_name}</option> 
                                    ))
                                ) : (
                                    <h1>No properties for hosting</h1> // Message if no properties are available
                                )
                            }
                        </select>
                    </div>
                    <br />
                    {/* Form group for uploading event photos */}
                    <div className={style.formGroup}>
                        <label htmlFor="photos">Photos for event Preview</label>
                        <input type="file" id="photos" name="images" multiple required onChange={handleImageUpload}></input>
                    </div>
                    
                    {/* Form group for event description */}
                    <div className={style.formGroup}>
                        <label htmlFor="description">Event Description</label>
                        <textarea id="description" name="description" rows="4" placeholder="Describe your Event" required onChange={handleChange}></textarea>
                    </div>
                    {/* Form group for selecting event date */}
                    <div className={style.formGroup}>
                        <label htmlFor="event_date">Date of Event</label>
                        <input type="date" id="availability-start" name="event_date" required onChange={handleChange} />
                    </div>
                    <button type="submit">Add Event</button> {/* Submit button */}
                </form>
            </div>
        </div>
    )
}

export default AddEvent; // Export the AddEvent component