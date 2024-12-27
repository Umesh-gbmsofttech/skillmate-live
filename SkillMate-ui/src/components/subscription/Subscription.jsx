import React from 'react'
import LiveSessions from './LiveSessions'
import BuyCourse from './BuyCourse'
import SubCarausal from './SubCarausal'
import MyCourses from '../courses/MyCourses'
import { useLocation } from 'react-router-dom'

function Subscription() {
    const location = useLocation(); // Retrieve data passed via navigation
    const course = location.state?.course; // Safely access `course`

    return (
        <div className='subscription-container'>
            <SubCarausal />
            <BuyCourse course={course} />
            <MyCourses />
            <LiveSessions />
        </div>
    )
}

export default Subscription