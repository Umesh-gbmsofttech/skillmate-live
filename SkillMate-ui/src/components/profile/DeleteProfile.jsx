import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import baseUrl from '../urls/baseUrl'



function DeleteProfile() {
    const { user } = useContext(GlobalContext);


    const navigate = useNavigate();

    const handleDeleteProfileClick = async () => {
        try {
            // check the logged in user's role student/trainer/admin and then hit on of them url accordingly
            // id is the the mobile number of the logged in user
            const response = await fetch(`${baseUrl}students/${user.id || user.MoNo || user.mobile}`, `${baseUrl}trainers/${user.id || user.MoNo || user.mobile}`, `${baseUrl}admin/${user.id || user.MoNo || user.mobile}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ mobile }),
            });

            const data = await response.json();

            if (response.ok) {
                user.setUserData(null)
            } else {
                setError(data.error || 'Failed to Delete your account');
            }
        } catch (error) {
            setError('Failed to Delete your account');
        }
    };


    return (
        <div className='delete-profile-conainer'>
            Are you sure you want to delete?

            <button className='delete-profile-button' onClick={handleDeleteProfileClick}>Delete</button>
            <button className='cancel-delete-profile-button' onClick={() => navigate('/profile')}>Cancel</button>

            <p>This action cannot be undone.</p>
        </div>
    )
}

export default DeleteProfile