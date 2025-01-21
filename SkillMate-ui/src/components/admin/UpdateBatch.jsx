import axios from 'axios';
import React, { useEffect, useState } from 'react'
import deleteIcon from '../../assets/deleteIcon.png';
import editIcon from '../../assets/editIcon.png';
import defaultProfileImage from '../../assets/profilePic.jpg';

// to update/add/asign batch to student and trainer
function UpdateBatch() {
  const [students, setStudents] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);

  const getBatchesUrl = 'http://localhost:8080/batches/fetch';
  const getBatchByIdUrl = 'http://localhost:8080/batches/fetch{id}';
  const updateBatchUrl = 'http://localhost:8080/batches/update{id}';
  const createBatchUrl = 'http://localhost:8080/batches/create';
  const getBatchByTrainerIdUrl = 'http://localhost:8080/batches/by-trainer/{trainerId}';//to get batches assigned to trainer
  const getBatchByStudentIdUrl = 'http://localhost:8080/batches/by-student/{studentId}';//to get batches assigned to student
  const getCoursesByStudentIdUrl = 'http://localhost:8080/courses/student/{studentId}';//to get courses assigned to student

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/students/fetch');
        setStudents(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/batches/fetch');
        setBatches(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get('http://localhost:8080/trainers/fetch');
        setTrainers(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/courses/fetch');
        setCourses(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  console.log('Students: ', students)
  console.log('Trainers: ', trainers)
  console.log('Batches: ', batches)
  console.log('Courses: ', courses)
  return (
    <div>
      <>
        {students.length === 0 ? (
          <p>No Students available.</p>
        ) : (
          students?.map((student, index) => (
            <div key={index} >
              <img
                src={student.profileImage || defaultProfileImage}
                alt={`${student.fullName} profile`}
              />
              <div className="students-details-data">
                <h3>{student.fullName}</h3>
                {/* Ensure proper handling of properties like 'Technologies', 'attendance' */}
                <p>Technologies: {student.Technologies ? JSON.stringify(student.Technologies) : 'N/A'}</p>
                <p>Average Attendance: {student.attendanceByDays || 'N/A'} {student.attendanceAverage || ''}</p>
                <p>Batches: {student.batches ? (Array.isArray(student.batches) ? student.batches.map(batch => batch.id).join(', ') : student.batches) : 'N/A'}</p>
                <p>Remark By Trainer: {student.remarkByTrainer ? student.remarkByTrainer : 'N/A'}</p>
              </div>
              <button onClick={() => handleCourseEditClick(student.id)} className="ad_edit_st-btn">
                <img src={editIcon} alt="edit" />
              </button>
              <button onClick={() => handleDeleteCourse(student.id)} className="ad_delete_course-btn">
                <img src={deleteIcon} alt="delete" />
              </button>
            </div>
          ))
        )}
      </>
      <>
        {students.length === 0 ? (
          <p>No Students available.</p>
        ) : (
          students?.map((student, index) => (
            <div key={index} >
              <img
                src={student.profileImage || defaultProfileImage}
                alt={`${student.fullName} profile`}
              />
              <div className="students-details-data">
                <h3>{student.fullName}</h3>
                {/* Ensure proper handling of properties like 'Technologies', 'attendance' */}
                <p>Technologies: {student.Technologies ? JSON.stringify(student.Technologies) : 'N/A'}</p>
                <p>Average Attendance: {student.attendanceByDays || 'N/A'} {student.attendanceAverage || ''}</p>
                <p>Batches: {student.batches ? (Array.isArray(student.batches) ? student.batches.map(batch => batch.id).join(', ') : student.batches) : 'N/A'}</p>
                <p>Remark By Trainer: {student.remarkByTrainer ? student.remarkByTrainer : 'N/A'}</p>
              </div>
              <button onClick={() => handleCourseEditClick(student.id)} className="ad_edit_st-btn">
                <img src={editIcon} alt="edit" />
              </button>
              <button onClick={() => handleDeleteCourse(student.id)} className="ad_delete_course-btn">
                <img src={deleteIcon} alt="delete" />
              </button>
            </div>
          ))
        )}
      </>

    </div>
  )
}

export default UpdateBatch