import React, { useState } from 'react';
import './Leave_Rating_Review.css';
import profilePic from '../../assets/profilePic.jpg';
import writeIcon from '../../assets/writeIcon.png';
import { useNavigate, useLocation } from 'react-router-dom';
import ReviewsSection from './ReviewsSection'; // assuming this is a section that lists reviews
import altImage from '../../assets/skillmate.jpg';

function LeaveRatingReview() {
    const navigate = useNavigate();
    const location = useLocation();

    const trainer = location.state?.trainer; // If it's a trainer
    const student = location.state?.student; // If it's a student

    const user = {
        profilePic,
        name: 'John Doe',
        experience: '10 years',
        rating: '4.5 ⭐️⭐️⭐️⭐️⭐️',
    };

    // Logic to determine if it's a trainer or student
    const userType = trainer ? 'trainer' : student ? 'student' : '';

    const handleRateUsTypeTrainerClick = (trainer) => {
        navigate('/rating-reviews/page/card', { state: { trainer } });
    };
    const handleRateUsTypeStudentClick = (student) => {
        navigate('/rating-reviews/page/card', { state: { student } });
    };

    return (
        <div className='rating__reviews_-container'>
            {userType === 'trainer' && trainer && (
                <>
                    <div className='rating__reviews_-container-card'>
                        <img className='rating__reviews_-container-card-image' src={trainer.profilePic ? `data:image/png;base64,${trainer.profilePic}` : altImage} />
                        <div className="rating__reviews_-container-card-data">
                            <h1>{trainer?.fullName}</h1>
                            <p>Experience: {trainer?.experience}</p>
                            <p>Expertise: {trainer?.technologies}</p>
                            <p>4.5 ⭐️⭐️⭐️⭐️⭐️</p>
                        </div>
                    </div>
                    <div className="leave__a-rating-review" onClick={() => handleRateUsTypeTrainerClick(trainer)} >
                        <h2>Leave a Rating and Review <img src={writeIcon} alt="Rate Us" /></h2>
                    </div>
                </>
            )}
            {userType === 'student' && student && (
                <>
                    <div className='rating__reviews_-container-card'>
                        <img className='rating__reviews_-container-card-image' src={student.profilePic ? `data:image/png;base64,${student.profilePic}` : altImage} />
                        <div className="rating__reviews_-container-card-data">
                            <h1>{student?.fullName}</h1>
                            <p>Experience: {student?.experience}</p>
                            <p><ul>
                                Expertise:
                                {student?.courses && student.courses.length > 0 ? (
                                    student.courses.map((course, idx) => (
                                        <li key={idx}>{course.courseName}</li>
                                    ))
                                ) : (
                                    <li>No expertise listed</li>
                                )}
                            </ul></p>
                            <p>4.5 ⭐️⭐️⭐️⭐️⭐️</p>
                        </div>
                    </div>

                    <div className="leave__a-rating-review" onClick={() => handleRateUsTypeStudentClick(student)} >
                        <h2>Leave a Rating and Review <img src={writeIcon} alt="Rate Us" /></h2>
                    </div>
                </>
            )}


            {/* <div className="leave__a-rating-review" onClick={handleRateUsClick} >
                <h2>Leave a Rating and Review <img src={writeIcon} alt="Rate Us" /></h2>
            </div> */}

            <ReviewsSection />
        </div>
    );
}

export default LeaveRatingReview;
// import React, { useState } from 'react'
// import './Leave_Rating_Review.css'
// import profilePic from '../../assets/profilePic.jpg'
// import writeIcon from '../../assets/writeIcon.png'
// import { useNavigate } from 'react-router-dom';
// import ReviewsSection from './ReviewsSection'
// function LeaveRatingReview() {

//     const [userRole, setUserRole] = useState('');
//     const navigate = useNavigate();

//     const user =
//     {
//         profilePic,
//         name: 'John Doe',
//         experience: 10 + + ' of years',
//         rating: 4.5 + ' ⭐️⭐️⭐️⭐️⭐️',
//     }

//     const handleRatingChange = (event) => {
//         setUserRole(event.target.value);
//     }
//     const handleRateUsClick = () => {
//         navigate('/rating-reviews/page/card')
//     }


//     return (
//         <div className='rating__reviews_-container'>
//             <div className='rating__reviews_-container-card'>
//                 <img className='rating__reviews_-container-card-image' src={user.profilePic} alt={user.name} />
//                 <div className="rating__reviews_-container-card-data">
//                     <h1>{user.name}</h1>
//                     <p>{user.experience}</p>
//                     <p>{user.rating}</p>
//                 </div>
//             </div>
//             <div className="leave__a-rating-review" onClick={handleRateUsClick} >
//                 <h2>Leave a Rating and Review <img src={writeIcon} alt="Rate Us" /></h2>
//             </div>

//             <ReviewsSection />
//         </div>
//     )
// }

// export default LeaveRatingReview