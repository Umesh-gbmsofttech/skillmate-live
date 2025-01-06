import React from 'react'
import LiveSessions from './LiveSessions'
import BuyCourse from './BuyCourse'
import SubCarausal from './SubCarausal'
import MyCourses from '../courses/MyCourses'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Subscription() {
    const location = useLocation(); // Retrieve data passed via navigation
    const course = location.state?.course;
    const admin = useSelector((state) => state.auth.username); // for admin only

    return (
        <div className='subscription-container'>
            <SubCarausal />
            <BuyCourse course={course} />
            {!admin ?
                <>
                    < MyCourses />
                    <LiveSessions />
                </>
                : ""
            }
        </div>
    )
}

export default Subscription