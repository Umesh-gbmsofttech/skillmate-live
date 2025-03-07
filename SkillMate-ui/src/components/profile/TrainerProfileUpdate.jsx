import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, CircularProgress, Typography, Checkbox, FormControlLabel, MenuItem } from '@mui/material';
import { showSuccessToast, showErrorToast } from '../utility/ToastService';
import { useDispatch, useSelector } from 'react-redux';
import baseUrl from '../urls/baseUrl'
import { handleProfilePicChange, handleResumeChange } from '../utility/FileUploadHelper';
import { logout } from '../redux/authSlice'


function TrainerProfileUpdate() {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState({
        name: '',
        mobileNumber: '',
        email: '',
        address: '',
        qualification: '',
        workingStatus: '',
        resume: '', // To store base64 PDF data or URL
        technologies: [],
        image: '', // To store base64 image data
    });
    const [ loading, setLoading ] = useState(true);
    const { trainerId } = useParams();
    const navigate = useNavigate();
    const [ previewImage, setPreviewImage ] = useState(''); // To show the selected image preview
    const [ pdfFile, setPdfFile ] = useState(null);
    const [ showResume, setShowResume ] = useState(false);
    const [ error, setError ] = useState('');
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


    useEffect(() => {
        const fetchTrainerData = async () => {
            if (!isAuthenticated) {
                setLoading(false);
                navigate('/login/mobile');
                return;
            }
            try {
                const response = await axios.get(`${baseUrl}trainers/${trainerId}`);
                const trainer = response.data;
                setFormData({
                    name: trainer.name || '',
                    mobileNumber: trainer.mobileNumber || '',
                    email: trainer.email || '',
                    address: trainer.address || '',
                    qualification: trainer.qualification || '',
                    experience: trainer.experience || '',
                    workingStatus: trainer.workingStatus || '',
                    technologies: trainer.technologies || [],
                    image: trainer.image || '',
                    resume: trainer.resume || '',
                });

                // Show profile picture preview (existing one)
                setPreviewImage(trainer.image ? `data:image/png;base64,${trainer.image}` : 'default-avatar.png');

                // If there is a resume, set it for display
                if (trainer.resume) {
                    setPdfFile(trainer.resume); // Storing the base64 resume
                }

                setLoading(false);
            } catch (error) {
                showErrorToast('Error fetching trainer data!');
                setLoading(false);
            }
        };

        if (trainerId) {
            fetchTrainerData();
        } else {
            navigate('/admin-dashboard');
        }
    }, [ trainerId, navigate ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [ name ]: value
        }));
    };

    const handleTechnologiesChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            technologies: checked
                ? [ ...prevData.technologies, value ]
                : prevData.technologies.filter((tech) => tech !== value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${baseUrl}trainers/${trainerId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                showSuccessToast('Profile updated successfully \n Please login again!');
                navigate('/login/mobile');
                dispatch(logout());
            } else {
                showErrorToast('Profile not updated!');
            }
        } catch (error) {
            showErrorToast('An error occurred while updating the trainer.');
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    let validViewPdf = pdfFile;
    if (validViewPdf && !validViewPdf.startsWith('data:application/pdf;base64,')) {
        validViewPdf = `data:application/pdf;base64,${validViewPdf}`; // Add the base64 prefix if it's missing
    }
    return (
        <Box sx={ { padding: 4, backgroundColor: '#f7f7f71b', borderRadius: 2, marginTop: 2, marginLeft: 2, marginRight: 2 } }>
            <Typography variant="h4" gutterBottom>Edit Trainer Information</Typography>
            <form onSubmit={ handleSubmit }>
                <Box sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
                    {/* Profile Picture Section */ }
                    <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 } }>
                        <img
                            src={ previewImage }
                            alt="Trainer Profile"
                            style={ { width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' } }
                        />
                        <Button variant="contained" component="label">
                            Upload Profile Picture
                            <input type="file" hidden accept="image/*"
                                onChange={ (e) => handleProfilePicChange(
                                    e,
                                    (img) => {
                                        setFormData((prev) => ({ ...prev, image: img }));
                                        setPreviewImage(`data:image/png;base64,${img}`);
                                    },
                                    setError
                                ) } />
                        </Button>
                    </Box>

                    {/* Form Fields */ }
                    <TextField
                        label="Full Name"
                        name="name"
                        value={ formData.name }
                        onChange={ handleChange }
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Mobile Number"
                        name="mobileNumber"
                        value={ formData.mobileNumber }
                        onChange={ handleChange }
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={ formData.email }
                        onChange={ handleChange }
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        name="address"
                        value={ formData.address }
                        onChange={ handleChange }
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={ 2 }
                    />
                    <TextField
                        label="Qualification"
                        name="qualification"
                        value={ formData.qualification }
                        onChange={ handleChange }
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        label="Experience"
                        name="experience"
                        value={ formData.experience }
                        onChange={ handleChange }
                        type='number'
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Working Status"
                        name="workingStatus"
                        value={ formData.workingStatus }
                        onChange={ handleChange }
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    >
                        <MenuItem value="full-time">Full-Time</MenuItem>
                        <MenuItem value="part-time">Part-Time</MenuItem>
                        <MenuItem value="unemployed">Unemployed</MenuItem>
                    </TextField>

                    {/* Technologies Section */ }
                    <div className="selected-technologies">
                        <h5>Selected Technologies:</h5>
                        <div className="technologies-display">
                            { formData.technologies.map((tech, index) => (
                                <span key={ index } className="technology-tag">
                                    <Button
                                        variant="outlined"
                                        color="info"
                                        sx={ { padding: '4px 25px' } }
                                        onClick={ () => setShowResume(!showResume) }>
                                        { tech }
                                    </Button>,
                                </span>
                            )) }
                        </div>
                    </div>
                    <div >
                        { [ 'Java', 'Spring Boot', 'JavaScript', 'React', 'Angular', 'React Native' ].map((tech) => (
                            <FormControlLabel
                                key={ tech }
                                control={
                                    <Checkbox
                                        value={ tech }
                                        checked={ formData.technologies.includes(tech) }
                                        onChange={ handleTechnologiesChange }
                                    />
                                }
                                label={ tech }
                            />
                        )) }
                    </div>

                    {/* Resume Section */ }
                    <div>
                        { pdfFile ? (
                            <div className='mb-2'>
                                <Typography variant="h6">Existing Resume:</Typography>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={ { padding: '4px 25px' } }
                                    onClick={ () => setShowResume(!showResume) }>
                                    { showResume ? 'Hide Resume' : 'View Resume' }
                                </Button>

                                { showResume && (
                                    <iframe
                                        src={ validViewPdf }
                                        width="100%"
                                        height="600px"
                                        title="Resume Preview"
                                    />
                                ) }
                            </div>
                        ) : (
                            <Typography variant="h6">No resume uploaded</Typography>
                        ) }
                        <Button variant="contained" component="label">
                            Upload Resume
                            <input type="file" hidden accept="application/pdf"
                                onChange={ (e) => handleResumeChange(e, (pdf) => {
                                    setFormData((prev) => ({ ...prev, resume: pdf }));
                                    setPdfFile(pdf);  // Ensure the preview updates
                                }, setError) }

                            />
                        </Button>
                    </div>

                    <Box sx={ { textAlign: 'center', marginTop: 4 } }>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={ { padding: '12px 30px' } }
                            disabled={ loading } // Disable when loading
                        >
                            { loading ? 'Updating...' : 'Update Trainer' }
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default TrainerProfileUpdate;
