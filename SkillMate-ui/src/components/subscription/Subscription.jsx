import React from 'react'
import LiveSessions from './LiveSessions'
import BuyCourse from './BuyCourse'
import SubCarausal from './SubCarausal'

function Subscription() {
    return (
        <div className='subscription-container'>
            <SubCarausal />
            <BuyCourse />
            <LiveSessions />
        </div>
    )
}

export default Subscription