import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading';
import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Button } from '@mui/material';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';
import baseUrl from '../urls/baseUrl'

function CreateBatch() {
    const [batches, setBatches] = useState([]);
    const [students, setStudents] = useState([]);
    const [trainers, setTrainers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newBatch, setNewBatch] = useState({
        trainerIds: [],
        courseIds: [],
        studentIds: [],
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const batchResponse = await axios.get(`${baseUrl}batches/fetch`);
                // const studentResponse = await axios.get(`${baseUrl}students/fetch`);
                const trainerResponse = await axios.get(`${baseUrl}trainers/fetch`);
                const courseResponse = await axios.get(`${baseUrl}courses/fetch`);
                setBatches(batchResponse.data);
                // setStudents(studentResponse.data);
                setTrainers(trainerResponse.data);
                setCourses(courseResponse.data);
                setLoading(false);
            } catch (error) {
                showErrorToast(`Error fetching data: ${error}`);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchStudentsByCourse = async () => {
            if (newBatch.courseIds.length > 0) {
                try {
                    const studentCoursesResponse = await axios.get(`${baseUrl}courses/fetch/students/of/course/${newBatch.courseIds[0]}`);
                    if (studentCoursesResponse.status === 200) {
                        setStudents(studentCoursesResponse.data);
                    } else { 
                        setStudents([]);
                    }
                } catch (error) {
                    // showErrorToast(`Error fetching students for course: ${error}`);
                    showInfoToast('no students found for selected course!')
                }
            }
        };

        fetchStudentsByCourse();
    }, [newBatch.courseIds]);

    const handleMultiSelectChange = (e) => {
        const { name, value } = e.target;
        setNewBatch((prevData) => ({
            ...prevData,
            [name]: Array.isArray(value) ? value : [value], // Ensure the value is an array
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const batchData = {
            trainer: newBatch.trainerIds.map(id => ({ id })), // Send trainer data as an array with an ID object
            students: newBatch.studentIds.map(id => ({ id })), // Send selected students as an array of ID objects
            course: newBatch.courseIds.length > 0 ? [{ id: newBatch.courseIds[0] }] : [], // Only sending the first course if any
        };

        try {
            // Update the course with the selected trainer
            const updatedCourse = {
                trainer: newBatch.trainerIds.map(id => ({ id })) // Sending trainer data
            };

            const courseUpdateResponse = await axios.put(
                `${baseUrl}courses/update/${newBatch.courseIds[0]}`,
                updatedCourse
            );
            showSuccessToast('Course updated successfully');

            // Create the batch after updating the course
            const batchResponse = await axios.post(`${baseUrl}batches/create`, batchData);
            showSuccessToast('Batch created successfully!');
            setLoading(false);
            navigate('/admin-profile');
        } catch (error) {
            setError(`Error in updating course or creating batch: ${error}`);
            showErrorToast('Failed to update the course or create the batch. Please try again.');
        } finally {
            setNewBatch({
                trainerIds: [],
                courseIds: [],
                studentIds: [],
            });
        }
    };

    return (
        <>
            {loading ? (<Loading />)
                : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="admin__batch-management">
                        <h2>Manage Batches</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Select Single Course */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Select Course</InputLabel>
                                <Select
                                    name="courseIds"
                                    value={newBatch.courseIds}
                                    onChange={handleMultiSelectChange}
                                    renderValue={(selected) => courses.find(course => course.id === selected[0])?.courseName || 'Select Course'}
                                >
                                    {courses?.map(course => (
                                        <MenuItem key={course.id} value={course.id}>
                                            <ListItemText primary={course.courseName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Select Single Trainer */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Select Trainer</InputLabel>
                                <Select
                                    name="trainerIds"
                                    value={newBatch.trainerIds}
                                    onChange={handleMultiSelectChange}
                                    renderValue={(selected) => trainers.find(trainer => trainer.id === selected[0])?.fullName || 'Select Trainer'}
                                >
                                    {trainers?.map(trainer => (
                                        <MenuItem key={trainer.id} value={trainer.id}>
                                            <ListItemText primary={trainer.fullName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Select Multiple Students */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Assign Students</InputLabel>
                                <Select
                                    multiple
                                    name="studentIds"
                                    value={newBatch.studentIds}
                                    onChange={handleMultiSelectChange}
                                    renderValue={(selected) => selected.map((id) => students.find(student => student.id === id)?.fullName).join(', ')}
                                >
                                    {students?.map(student => (
                                        <MenuItem key={student.id} value={student.id}>
                                            <Checkbox checked={newBatch.studentIds.indexOf(student.id) > -1} />
                                            <ListItemText primary={student.fullName} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Create Batch
                            </Button>
                        </form>
                    </div>
                )}
        </>
    );
}

export default CreateBatch;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Loading from '../../Loading';
// import { showSuccessToast, showErrorToast } from '../utility/ToastService';
// import { Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, Button } from '@mui/material';

// function CreateBatch() {
//     const [batches, setBatches] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [trainers, setTrainers] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [newBatch, setNewBatch] = useState({
//         trainerIds: [],
//         courseIds: [],
//         studentIds: [],
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const batchResponse = await axios.get(`${baseUrl}batches/fetch`);
//                 const studentResponse = await axios.get(`${baseUrl}students/fetch`);
//                 const trainerResponse = await axios.get(`${baseUrl}trainers/fetch`);
//                 const courseResponse = await axios.get(`${baseUrl}courses/fetch`);
//                 // const studentCoursesResponse = await axios.get(`http://127.0.0.1:8080/courses/student/${newBatch?.student.id}`);//
//                 const studentCoursesResponse = await axios.get(`http://127.0.0.1:8080/courses/fetch/students/of/course/${newBatch?.course.id}`);//to get list fo students by course id

//                 setBatches(batchResponse.data);
//                 setStudents(studentResponse.data);
//                 setTrainers(trainerResponse.data);
//                 setCourses(courseResponse.data);
//                 setLoading(false);
//             } catch (error) {
//                 showErrorToast(`Error fetching data: ${error}`);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const handleMultiSelectChange = (e) => {
//         const { name, value } = e.target;
//         setNewBatch((prevData) => ({
//             ...prevData,
//             [name]: Array.isArray(value) ? value : [value], // Ensure the value is an array
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const batchData = {
//             trainer: newBatch.trainerIds.map(id => ({ id })), // Send trainer data as an array with an ID object
//             students: newBatch.studentIds.map(id => ({ id })), // Send selected students as an array of ID objects
//             course: newBatch.courseIds.length > 0 ? [{ id: newBatch.courseIds[0] }] : [], // Only sending the first course if any
//         };
//         // console.log(batchData)

//         try {
//             // Update the course with the selected trainer
//             const updatedCourse = {
//                 trainer: newBatch.trainerIds.map(id => ({ id })) // Sending trainer data
//             };

//             const courseUpdateResponse = await axios.put(
//                 `${baseUrl}courses/update/${newBatch.courseIds[0]}`,
//                 updatedCourse
//             );
//             showSuccessToast('Course updated successfully');

//             // Create the batch after updating the course
//             const batchResponse = await axios.post(`${baseUrl}batches/create`, batchData);
//             showSuccessToast('Batch created successfully!');
//             setLoading(false);
//             navigate('/admin-profile');
//         } catch (error) {
//             setError(`Error in updating course or creating batch: ${error}`);
//             showErrorToast('Failed to update the course or create the batch. Please try again.');
//         } finally {
//             setNewBatch({
//                 trainerIds: [],
//                 courseIds: [],
//                 studentIds: [],
//             });
//         }
//     };

//     return (
//         <>
//             {loading ? (<Loading />)
//                 : error ? (
//                     <p>{error}</p>
//                 ) : (
//                     <div className="admin__batch-management">
//                         <h2>Manage Batches</h2>
//                         <form onSubmit={handleSubmit}>
//                             {/* Select Single Course */}
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel>Select Course</InputLabel>
//                                 <Select
//                                     name="courseIds"
//                                     value={newBatch.courseIds}
//                                     onChange={handleMultiSelectChange}
//                                     renderValue={(selected) => courses.find(course => course.id === selected[0])?.courseName || 'Select Course'}
//                                 >
//                                     {courses?.map(course => (
//                                         <MenuItem key={course.id} value={course.id}>
//                                             <ListItemText primary={course.courseName} />
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                                 </FormControl>
                                
//                             {/* Select Single Trainer */}
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel>Select Trainer</InputLabel>
//                                 <Select
//                                     name="trainerIds"
//                                     value={newBatch.trainerIds}
//                                     onChange={handleMultiSelectChange}
//                                     renderValue={(selected) => trainers.find(trainer => trainer.id === selected[0])?.fullName || 'Select Trainer'}
//                                 >
//                                     {trainers?.map(trainer => (
//                                         <MenuItem key={trainer.id} value={trainer.id}>
//                                             <ListItemText primary={trainer.fullName} />
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>

//                             {/* Select Multiple Students */}
//                             <FormControl fullWidth margin="normal">
//                                 <InputLabel>Assign Students</InputLabel>
//                                 <Select
//                                     multiple
//                                     name="studentIds"
//                                     value={newBatch.studentIds}
//                                     onChange={handleMultiSelectChange}
//                                     renderValue={(selected) => selected.map((id) => students.find(student => student.id === id)?.fullName).join(', ')}
//                                 >
//                                     {students?.map(student => (
//                                         <MenuItem key={student.id} value={student.id}>
//                                             <Checkbox checked={newBatch.studentIds.indexOf(student.id) > -1} />
//                                             <ListItemText primary={student.fullName} />
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>

//                             <Button type="submit" variant="contained" color="primary" fullWidth>
//                                 Create Batch
//                             </Button>
//                         </form>
//                     </div>
//                 )}
//         </>
//     );
// }

// export default CreateBatch;