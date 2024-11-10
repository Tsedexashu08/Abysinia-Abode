import style from '../styles/Footer.module.css'

function Terms(){
    return(
        <div className={style.termspage}>
        <h1>1. Introduction</h1>
        <p>Welcome to Abyssinya Abode. These Terms and Agreements (“Terms”) govern your use of our website and services. By accessing or using our platform, you agree to comply with and be bound by these Terms. </p>
        <h1>2. User Responsibilities</h1>
        <ul>
            <li>Users must provide accurate and complete information during the registration process.</li>
            <li>Users are responsible for maintaining the confidentiality of their account information.</li>
            <li>
            Users must not engage in any illegal activities or violate any laws while using our platform.
            </li>
        </ul>
        <h1>3. Booking Policies</h1>
        <ul>
        <li>All bookings are subject to availability and confirmation by the host.</li>
            <li>Users must adhere to the check-in and check-out times specified by the host.</li>
            <li>Any special requests or requirements must be communicated to the host in advance.
            </li>

        </ul>
        <h1>4. Payment Terms</h1>
        <ul>
            <li>Payment for bookings must be made through our secure payment gateway.</li>
            <li>Users are responsible for any additional fees or charges incurred during their stay.</li>
            <li>A security deposit may be required and will be refunded upon satisfactory inspection of the property.
            </li>
        </ul>
        <h1>5. Cancellation Policies</h1>
            <li>Cancellations made 15 days before the check-in date will receive a full refund.</li>
            <li>Cancellations made within 3 days of the check-in date may incur a cancellation fee.</li>
            <li>No-shows will be charged the full booking amount.
            </li>
        <h1>6. Host Responsibilities</h1>
            <li>Hosts must provide accurate and up-to-date information about their property.</li>
            <li>Hosts are responsible for ensuring the property is clean and safe for guests.</li>
            <li>Hosts must address any issues or complaints raised by guests promptly.
            </li>
        <h1>7. Liability</h1>
            <li>Abyssinya Abode is not liable for any damages, injuries, or losses incurred during the stay.</li>
            <li>Users agree to indemnify and hold Abyssinya Abode harmless from any claims or disputes arising from their use of the platform.
            </li>
            <h1>9. Changes to Terms</h1>
            <li>We reserve the right to modify these Terms at any time. Any changes will be posted on our website, and continued use of the platform constitutes acceptance of the updated Terms.</li>
            <h1>10. Contact Us</h1>
            <li>If you have any questions or concerns about these Terms, please contact us at [Your Contact Information].</li>
            </div>
    )
}

export default Terms