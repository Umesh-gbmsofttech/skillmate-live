import React from 'react'
import './EnquiryForm.css'
import picture from '../../assets/professional.jpg'

function EnquiryForm() {
    // const picture = 'https://www.pngitem.com/pimgs/m/105-1052305_contact-us-icon-png-transparent.png'
    const handleEnquirySubmiy = (e) => {
        e.preventDefault()
        console.log('Enquiry submitted')
        alert('Enquiry submitted')
    }


    return (
        <div className='contact-us__enquiry-form-container'>
            <div className="enquiry-container-heading">
                <p>Fill your information and get free consultancy...</p>
                <p>And sign up to explore more things</p>
            </div>
            <div className="enquiry-container-form-image">
                {/* <div className="enquiry-container-image"> */}
                <img className="enquiry-container-image" src={picture} alt="" />
                {/* </div> */}
                {/* <div className="enquiry-container-form"> */}
                <form className="enquiry-container-form">
                    <label htmlFor="full name">Your Full Name</label>
                    <input type="text" placeholder="Your fullname Name" required />

                    <label htmlFor="email">Email ID</label>
                    <input type="email" placeholder="Your Email" required />

                    <label htmlFor="mobile">Contact Number</label>
                    <input type="text" placeholder="Your Phone Number" required />

                    <label htmlFor="degree">Your Degree</label>
                    <input type="text" placeholder="Your Degree" required />

                    <label htmlFor="Query">Your detailed query</label>
                    <textarea placeholder="Your Detailed query" required></textarea>

                    <button onClick={handleEnquirySubmiy} type="submit">submit</button>
                </form>
                {/* </div> */}
            </div>
        </div>
    )
}

export default EnquiryForm