import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { showErrorToast } from '../utility/ToastService';
import baseUrl from '../urls/baseUrl';

const MyMeetings = ({ trainerId, courses }) => {
    const token = useSelector((state) => state.auth.token);
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMeetings = async () => {
            setLoading(true);
            try {
                let allMeetings = [];
                for (const course of courses || []) { // Ensure courses is iterable
                    if (!course?.id) {
                        console.error("Skipping invalid course:", course);
                        continue;
                    }
                    const response = await axios.get(
                        `${baseUrl}meetings/trainer/${trainerId}/${course.id}`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    allMeetings = [...allMeetings, ...response.data];
                }
                setMeetings(allMeetings);
            } catch (error) {
                showErrorToast(`Error fetching meetings: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (Array.isArray(courses) && courses.length > 0 && trainerId) {
            fetchMeetings();
        }
    }, [trainerId, courses, token]);


    return (
        <div>
            <h2>My Meetings</h2>
            {loading ? (
                <p>Loading meetings...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {meetings.map((meeting) => (
                        <div key={meeting.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                            <img src={`data:image/jpeg;base64,${meeting.course.image}`} alt={meeting.course.title} style={{ width: '100%', borderRadius: '5px' }} />
                            <h3>{meeting.course.title}</h3>
                            <p>Batch ID: {meeting.batch.id}</p>
                            <p>Start Time: {meeting.startTime}</p>
                            <p>End Time: {meeting.endTime}</p>
                            <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                                <button style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px' }}>
                                    Join Now
                                </button>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyMeetings;
