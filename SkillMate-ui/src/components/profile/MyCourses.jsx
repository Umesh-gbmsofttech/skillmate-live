import React, { useContext } from 'react';
import Courses from '../courses/Courses';
import { GlobalContext } from '../context/GlobalContext';

function MyCourses() {
    const { user } = useContext(GlobalContext);

    return (
        <div className="my-courses-container">
            <Courses userId={user?.mobile} />
        </div>
    );
}

export default MyCourses;
