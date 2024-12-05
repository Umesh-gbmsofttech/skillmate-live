import React from 'react'
import logo from '../../assets/skillmate.jpg'

function SupportColumnSection() {
    return (
        <div className='support-column-section-container'>
            <p className='support-column-section-container-heading'>Support Column</p>
            {/* display at least 4 cards in row responsive */}
            <ul>
                <li>
                    <div className="support-column-section-container-card">
                        <img className='support-column-section-container-card-image' src={logo} alt='Trainer 1' />
                        <div className="support-column-section-container-card-support-data">
                            <h4>Title 1</h4>
                            <p>Body text for whatever you'd like to say.</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}


export default SupportColumnSection