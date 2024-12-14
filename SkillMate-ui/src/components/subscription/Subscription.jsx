import React from 'react'
import LiveSessions from './LiveSessions'
import BuyCourse from './BuyCourse'
import SubCarausal from './SubCarausal'
import MyCourses from '../courses/MyCourses'

function Subscription() {
    return (
        <div className='subscription-container'>
            <SubCarausal />
            <BuyCourse />
            <MyCourses />
            <LiveSessions />
        </div>
    )
}

export default Subscription