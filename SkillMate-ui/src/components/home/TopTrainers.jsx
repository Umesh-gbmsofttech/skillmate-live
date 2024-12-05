import React from 'react'
import logo from '../../assets/skillmate.jpg'

function TopTrainers() {
    return (
        <div className='top-trainers-container'>
            <p className='top-trainers-container-heading'>Top Trainers</p>
            {/* display at least 4 cards in row responsive */}
            <ul>
                <li>
                    <div className="top-trainer-container-card">
                        <img className='top-trainer-container-card-image' src={logo} alt='Trainer 1' />
                        <div className="top-trainer-container-card-trainer-data">
                            <h4>Trainer 1</h4>
                            <p>Body text for whatever you'd like to say.</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default TopTrainers