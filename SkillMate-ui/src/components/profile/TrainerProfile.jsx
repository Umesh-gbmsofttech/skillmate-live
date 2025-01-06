import React, { useState, useEffect } from 'react';
import './TrainerProfile.css';
import defaultProfilePic from '../../assets/skillmate.jpg';
import editIcon from '../../assets/editIcon.png';
import hideEye from '../../assets/hide-eye.png';
import viewEye from '../../assets/view-eye.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function TrainerProfile() {
    const [showProfile, setShowProfile] = useState(true);
    const [students, setStudents] = useState([]);
    const [batch, setBatch] = useState(''); // Selected batch ID
    const [batches, setBatches] = useState([]); // List of all batches
    const [isLoading, setIsLoading] = useState(false);
    const [attendances, setAttendances] = useState({});
    const userData = useSelector((state) => state.auth.userData);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const trainerId = userData?.id;
    console.log('user id: ' + userData.id);
    const [isUpdatingAttendace, setIsUpdatingAttendance] = useState(false);

    const [meetingDetails, setMeetingDetails] = useState({
        fromTime: "",
        toTime: "",
        meetingLink: "",
        message: "",
    });

    const [previousMeetings, setPreviousMeetings] = useState([]);

    // Handle meeting creation
    const handleSubmit = async () => {
        if (!meetingDetails.meetingLink || !meetingDetails.fromTime || !meetingDetails.toTime) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/meetings/create", {
                meetingLink: meetingDetails.meetingLink,
                fromTime: meetingDetails.fromTime,
                toTime: meetingDetails.toTime,
                message: meetingDetails.message,
                trainer: { id: trainerId },
            });

            alert("Meeting saved successfully");
            setPreviousMeetings((prevMeetings) => [response.data, ...prevMeetings]);
        } catch (error) {
            console.error("Error saving meeting:", error);
        }
    };

    const fetchBatches = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/batches/by-trainer/${trainerId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBatches(response.data);
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    };

    const fetchStudents = async () => {
        if (!batch) return;

        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/students/batch/${batch}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAttendances = async () => {
        if (students.length === 0) return;

        const updatedAttendances = {};
        try {
            for (const student of students) {
                const response = await axios.get(`http://localhost:8080/attendances/student/${student.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                updatedAttendances[student.id] = response.data;
            }
            setAttendances(updatedAttendances);
        } catch (error) {
            console.error('Error fetching attendances:', error);
        }
    };


    const updateStudentDetails = async (studentId, field, value, recordId) => {
        try {
            const updatedAttendances = { ...attendances };
            const studentAttendance = updatedAttendances[studentId];

            // Update the specific record field
            const updatedRecord = studentAttendance.find((record) => record.id === recordId);
            if (updatedRecord) {
                updatedRecord[field] = value;
            }

            setAttendances(updatedAttendances);

            await axios.put(
                `http://localhost:8080/attendances/update/${recordId}`,
                { [field]: value },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert('Attendance updated successfully');
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };

    useEffect(() => {
        fetchBatches();
    }, [trainerId, token]);

    useEffect(() => {
        fetchStudents();
    }, [batch]);

    useEffect(() => {
        fetchAttendances();
    }, [students]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMeetingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    document.querySelectorAll('.form-group-time input[type="time"]').forEach(input => {
        input.addEventListener('focus', function () {
            this.classList.remove('hide-icon');
        });

        input.addEventListener('blur', function () {
            this.classList.add('hide-icon');
        });
    });

    return (
        <div className="trainer-profile">
            <div className="trainer-header">
                <img
                    className="trainer-header__picture"
                    src={userData?.profilePic ? `data:image/jpeg;base64,${userData.profilePic}` : defaultProfilePic}
                    alt="Profile"
                />
                <h1 className="trainer-header__welcome">Welcome, {userData?.fullName || 'Trainer'}</h1>
                <div className="trainer-header__actions">
                    <img
                        src={showProfile ? hideEye : viewEye}
                        alt={showProfile ? 'Hide Profile' : 'View Profile'}
                        onClick={() => setShowProfile(!showProfile)}
                    />
                    <img onClick={() => navigate('/trainer-profile-update')} src={editIcon} alt="Edit Profile" />
                </div>
            </div>

            {showProfile && (
                <div className="trainer-details">
                    <p><strong>Full Name:</strong> {userData?.fullName}</p>
                    <p><strong>Mobile Number:</strong> {userData?.mobileNumber}</p>
                    <p><strong>Email:</strong> {userData?.email}</p>
                    <p><strong>Working Status:</strong> {userData?.workingStatus}</p>
                    <p><strong>Experience:</strong> {userData?.experience} years</p>
                    <p><strong>Company Name:</strong> {userData?.companyName}</p>
                    <p><strong>Address:</strong> {userData?.address}</p>
                    <p><strong>Qualification:</strong> {userData?.qualification}</p>
                    <p><strong>Technologies:</strong> {userData?.technologies?.join(', ') || 'N/A'}</p>
                </div>
            )}

            <div className="trainer-meeting">
                <h2 className='trainer-meeting__heading'>Update Meeting Link</h2>
                <div className='form-group-time'>
                    <span>
                        <label>From Time:</label>
                        <input type="time" name="fromTime" value={meetingDetails.fromTime} onChange={handleInputChange} />
                    </span>
                    <span>
                        <label>To Time:</label>
                        <input type="time" name="toTime" value={meetingDetails.toTime} onChange={handleInputChange} />
                    </span>
                </div>
                <div className="form-group">
                    <label>Meeting Link:</label>
                    <input
                        type="text"
                        name="meetingLink"
                        value={meetingDetails.meetingLink}
                        onChange={handleInputChange}
                        placeholder="Enter meeting link"
                    />
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <input
                        type="text"
                        name="message"
                        value={meetingDetails.message}
                        onChange={handleInputChange}
                        placeholder="Enter meeting message"
                    />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <div className="batch-selector">
                <label>Select Batch:</label>
                <select value={batch} onChange={(e) => setBatch(e.target.value)}>
                    <option value="">-- Select Batch --</option>
                    {batches.map((batchItem) => (
                        <option key={batchItem.id} value={batchItem.id}>
                            Batch {batchItem.id}
                        </option>
                    ))}
                </select>
            </div>

            <div className="attendance-list">
                {isLoading ? (
                    <p>Loading students...</p>
                ) : (
                    <table className='attendance-list-table'>
                        <thead>
                            <tr>
                                <th>Sr. No.</th>
                                <th>Student Name</th>
                                <th>course Name</th>
                                <th>In Time</th>
                                <th>Out Time</th>
                                <th>Total Attendance</th>
                                <th>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => {
                                const attendance = attendances[student.id];
                                return attendance ? (
                                    attendance.map((record, recordIndex) => (
                                        <tr key={`${student.id}-${record.id}`}>
                                            <td>{index + 1}</td>
                                            <td>{student.fullName}</td>
                                            <td>{student.courses}</td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={record.inTime || ''}
                                                    onChange={(e) =>
                                                        updateStudentDetails(student.id, 'inTime', e.target.value, record.id)
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="time"
                                                    value={record.outTime || ''}
                                                    onChange={(e) =>
                                                        updateStudentDetails(student.id, 'outTime', e.target.value, record.id)
                                                    }
                                                />
                                            </td>
                                            <td>{record.totalAttendance}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={record.remark || ''}
                                                    onChange={(e) =>
                                                        updateStudentDetails(student.id, 'remark', e.target.value, record.id)
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td colSpan="7">No attendance records found</td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                )}
            </div>
        </div>
    );
}

export default TrainerProfile;
