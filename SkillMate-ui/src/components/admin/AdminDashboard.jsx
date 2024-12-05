import React from 'react'

function AdminDashboard() {
    return (
        <div className='admin-dashboard-container'>
            AdminDashboard

            <div className='admin-dashboard-greet-section'>
                <h1 className='admin-dashboard-greet-heading'>Hello Admin</h1>
                <p className='admin-dashboard-greet-description'>Welcome to your dashboard. Here you can manage your users, courses, and subscriptions.</p>
            </div>

            <div className='admin-dashboard-buttons-section'>
                <button className='admin-dashboard-action-button'>Manage Students</button>
                <button className='admin-dashboard-action-button'>Manage Trainers</button>
                <button className='admin-dashboard-action-button'>Manage Courses</button>
                <button className='admin-dashboard-action-button'>Manage Subscriptions</button>
                <button className='admin-dashboard-action-button'>Logout</button>
                <button className='admin-dashboard-action-button'>Settings</button>
                <button className='admin-dashboard-action-button'>Help</button>
                {/* if new idea becomes for any changes in this layout could be updated */}
            </div>
        </div>
    )
}

export default AdminDashboard