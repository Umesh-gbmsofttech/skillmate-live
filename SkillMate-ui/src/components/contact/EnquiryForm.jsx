import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Button, TextField, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
// import picture from '../../assets/professional.jpg';
// import picture from '../../assets/professional1.png';
// import picture from '../../assets/professional2.png';
import picture from '../../assets/professional3.png';
import baseUrl from '../urls/baseUrl'


function EnquiryForm({ closeForm, contact }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    qualification: '',
    query: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}contact-us`, formData);
      console.log('Enquiry submitted successfully:', response.data);
      alert('Enquiry submitted successfully!');
      setFormData({ fullName: '', email: '', contactNumber: '', qualification: '', query: '' });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Failed to submit enquiry. Please try again.');
    }
  };

  const formContent = (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch', // Ensures equal height for image and form
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        backgroundColor: '#394852',
        // backgroundColor: '#6f7e87',
        width: '100%',
        padding: 2,
        height: 'auto',
        maxWidth: 'md',
        margin: '0 auto',
        borderRadius: 2,
      }}
    >
      {/* Image Section */}
      <Box
        flex={1}
        display={{ xs: 'none', md: 'block' }}
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: 'auto', md: '100%' }, // Full height on large screens
        }}
      >
        <img
          src={picture}
          alt="Professional"
          style={{
            width: '100%',
            height: '100%', // Ensures image stretches to fill the container
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Form Section */}
      <Box
        flex={1}
        component="form"
        onSubmit={handleEnquirySubmit}
        display="flex"
        flexDirection="column"
        gap={1} // Reduced gap between form fields
        sx={{
          width: { xs: '100%', md: '50%' },
          height: { xs: 'auto', md: '100%' }, // Full height on large screens
        }}
      >
        <Typography variant="h6" align="center" color="#96c6e0" sx={{ marginTop: 4 }}>
          Fill your information and get free consultancy...
        </Typography>
        <Typography variant="body2" align="center" color="#96c6e0" sx={{ marginTop: 0 }}>
          And sign up to explore more things
        </Typography>
        <TextField
          label="Your Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 1 }} // Reduced margin bottom
        />
        <TextField
          label="Email ID"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 1 }} // Reduced margin bottom
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 1 }} // Reduced margin bottom
        />
        <TextField
          label="Your Degree"
          name="qualification"
          value={formData.qualification}
          onChange={handleInputChange}
          fullWidth
          required
          sx={{ marginBottom: 1 }} // Reduced margin bottom
        />
        <TextField
          label="Your Detailed Query"
          name="query"
          value={formData.query}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          required
          sx={{ marginBottom: 1 }} // Reduced margin bottom
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      {!contact ? (
        <Dialog open={!isAuthenticated || contact} onClose={closeForm} maxWidth="md" fullWidth>
          <DialogContent sx={{ backgroundColor: '#394852', padding: 0 }}>
            {/* Close Button at Top Right */}
            <IconButton onClick={closeForm} sx={{ position: 'absolute', top: 5, right: 5, color: 'white' }}>
              <FaTimes color='#96c6e0' />
            </IconButton>
            {formContent}
          </DialogContent>
        </Dialog>
      ) : (
        <Box>{formContent}</Box>
      )}
    </>
  );
}
EnquiryForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  contact: PropTypes.bool.isRequired,
};

export default EnquiryForm;

