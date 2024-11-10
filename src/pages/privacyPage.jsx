import style from '../styles/Footer.module.css'; 

function Privacy() {
    return (
        <div className={style.privacypage}>
            <h1>Privacy Policy</h1>
            <h2>1. Introduction</h2>
            <p>Welcome to Abyssinya Abode. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.</p>

            <h2>2. Information We Collect</h2>
            <ul>
                <li><b>Personal Information:</b> When you register, book a stay, or contact us, we may collect personal details such as your name, email address, phone number, and payment information.</li>
                <li><b>Usage Data:</b> We collect information about your interactions with our website, including IP address, browser type, pages visited, and the time and date of your visit.</li>
                <li><b>Cookies and Tracking Technologies:</b> We use cookies and similar technologies to enhance your experience on our site and gather information about your browsing activities.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
                <li><b>To Provide Services:</b> We use your information to process bookings, manage your account, and provide customer support.</li>
                <li><b>To Improve Our Platform:</b> We analyze usage data to improve our website’s functionality and user experience.</li>
                <li><b>Marketing and Communications:</b> With your consent, we may send you promotional materials and updates about our services.</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <ul>
                <li><b>With Hosts and Guests:</b> We share necessary information with hosts and guests to facilitate bookings and communication.</li>
                <li><b>Third-Party Service Providers:</b> We may share your data with third-party providers who assist us in operating our website and providing services.</li>
                <li><b>Legal Requirements:</b> We may disclose your information if required by law or to protect our rights and safety.</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>

            <h2>6. Your Rights</h2>
            <ul>
                <li><b>Access and Correction:</b> You have the right to access and update your personal information.</li>
                <li><b>Data Deletion:</b> You can request the deletion of your personal data, subject to legal and contractual obligations.</li>
                <li><b>Opt-Out:</b> You can opt-out of receiving marketing communications from us at any time.</li>
            </ul>

            <h2>7. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy periodically. Any changes will be posted on this page, and we encourage you to review it regularly.</p>

            <h2>8. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at Abyssinya Abode.</p>
        </div>
    );
}

export default Privacy;