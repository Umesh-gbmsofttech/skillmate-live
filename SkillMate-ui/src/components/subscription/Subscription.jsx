import React from 'react'
import LiveSessions from './LiveSessions'
import BuyCourse from './BuyCourse'
import MyCourses from '../courses/MyCourses'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Carousel from '../home/Carousel'
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';
function Subscription() {
    const location = useLocation(); // Retrieve data passed via navigation
    const course = location.state?.course;
    const admin = useSelector((state) => state.auth.username); // for admin only
    const userData = useSelector((state) => state.auth.userData);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    // if (!isAuthenticated) {
    //     return <h1>Please login to continue</h1>
    // }
    if (!isAuthenticated) {
        showWarningToast('Something went wrong.');
        // navigate('/login/mobile');
        return;
    }

    return (
        <div className='subscription-container'>
            <Carousel />
            <BuyCourse course={course} />
            {!admin ?
                <>
                    < MyCourses />
                    <LiveSessions />
                </>
                : ""
            }
            {/* {userData ?
                <>
                    < MyCourses />
                    <LiveSessions />
                </>
                : ""
            } */}
        </div>
    )
}

export default Subscription