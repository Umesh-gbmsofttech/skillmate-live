import React from 'react';
import './OurStudentsPlacedIn.css';
import companyLogo from '../../../assets/skillmate.jpg'; // Sample logo, you can replace this with the actual logo paths.

function OurStudentsPlacedIn() {
    const companyLogos = Array(14).fill(companyLogo); // Create an array of 12 images

    return (
        <div className='our-students-placed-in-container'>
            <h1 className='our-students-placed-in-heading'>Our Students Placed In</h1>

            {/* Flexbox container for images */}
            <div className='company-logos-container'>
                {companyLogos.map((logo, index) => (
                    <div key={index} className='company-logo'>
                        <img src={logo} alt={`Company ${index + 1}`} className='company-logo-image' />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OurStudentsPlacedIn;
