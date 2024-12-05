import React from 'react'

function OurStudentsplacedIn() {
    return (
        <div className='our-students-placed-in-container'>
            <p className='our-students-placed-in-container-heading'>Support Column</p>
            {/* display at least 4 cards in row responsive */}
            <ul>
                <li className="our-students-placed-in-container-card">
                    <img className='our-students-placed-in-container-card-image' src={logo} alt='Trainer 1' />
                </li>
            </ul>
        </div>
    )
}

export default OurStudentsplacedIn