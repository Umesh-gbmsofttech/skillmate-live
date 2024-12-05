import React from 'react'
import logo from '../../assets/skillmate.jpg'

function SuccessfullyPlacedStudents() {
    return (
        <div className='Successfully-Placed-Students-container'>
            <p className='Successfully-Placed-Students-heading'>Successfully Placed Students</p>
            {/* display at least 4 cards in row responsive */}
            <ul>
                <li>
                    <div className="Successfully-Placed-Students-container-card">
                        <img className='Successfully-Placed-Students-container-card-image' src={logo} alt='Trainer 1' />
                        <div className="Successfully-Placed-Students-container-card-student-data">
                            <h4>Student 1</h4>
                            <p>Body text for whatever you'd like to say.</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default SuccessfullyPlacedStudents