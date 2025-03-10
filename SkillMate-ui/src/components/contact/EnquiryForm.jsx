import { FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Button, TextField, Typography, IconButton, Dialog, DialogContent } from '@mui/material';
import picture from '../../assets/professional.png';
import baseUrl from '../urls/baseUrl'
import CustomButton from '../utility/CustomButton';
import { showErrorToast, showSuccessToast, showWarningToast } from '../utility/ToastService';


function EnquiryForm({ closeForm, contact }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [ formData, setFormData ] = useState({
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
      [ name ]: value,
    }));
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (formData.fullName && formData.email && formData.contactNumber && formData.qualification && formData.query) {
      try {
        const response = await axios.post(`${baseUrl}contact-us`, formData);
        // console.log('Enquiry submitted successfully:', response.data);
        showSuccessToast('Enquiry submitted successfully!');
        setFormData({ fullName: '', email: '', contactNumber: '', qualification: '', query: '' });
      } catch (error) {
        // console.error('Error submitting enquiry:', error);
        showErrorToast('Failed to submit enquiry. Please try again.');
      }
    } else {
      showWarningToast("Please fill out all the required fields");
    }
  };

  const formContent = (
    <Box
      sx={ {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        // backgroundColor: '#394852',
        // backgroundColor: 'var(--color-p4)',
        // backgroundColor: 'var(--color-p1))',
        border: '1px solid var(--color-p4)',
        width: '100%',
        padding: 2,
        height: 'auto',
        maxWidth: 'md',
        margin: '0 auto',
        borderRadius: 2,
      } }
    >
      {/* Image Section */ }
      <Box
        flex={ 1 }
        display={ { xs: 'none', md: 'block' } }
        sx={ {
          width: { xs: '100%', md: '50%' },
          height: { xs: 'auto', md: '100%' },
        } }
      >
        <img
          src={ picture }
          alt="Professional"
          style={ {
            width: '100%',
            height: '100%',
            borderRadius: '8px',
            objectFit: 'cover',
          } }
        />
      </Box>

      {/* Form Section */ }
      <Box
        flex={ 1 }
        component="form"
        // onSubmit={ handleEnquirySubmit }
        display="flex"
        flexDirection="column"
        gap={ 1 }
        sx={ {
          width: { xs: '100%', md: '50%' },
          height: { xs: 'auto', md: '100%' },
        } }
      >
        <Typography fontSize={ 'var(--font-size-p2)' } align="center" sx={ { marginTop: 4 } }>
          Fill your information and get free consultancy...
        </Typography>
        <Typography align="center" sx={ { marginTop: 0 } }>
          And sign up to explore more things
        </Typography>
        <TextField
          label="Your Full Name"
          name="fullName"
          value={ formData.fullName }
          onChange={ handleInputChange }
          fullWidth
          required
          sx={ { marginBottom: 1 } }
        />
        <TextField
          label="Email ID"
          type="email"
          name="email"
          value={ formData.email }
          onChange={ handleInputChange }
          fullWidth
          required
          sx={ { marginBottom: 1, ":focus": { backgroundColor: 'none' } } }
        />
        <TextField
          label="Contact Number"
          name="contactNumber"
          value={ formData.contactNumber }
          onChange={ handleInputChange }
          fullWidth
          required
          sx={ { marginBottom: 1 } }
        />
        <TextField
          label="Your Degree"
          name="qualification"
          value={ formData.qualification }
          onChange={ handleInputChange }
          fullWidth
          required
          sx={ { marginBottom: 1 } }
        />
        <TextField
          label="Your Detailed Query"
          name="query"
          value={ formData.query }
          onChange={ handleInputChange }
          multiline
          rows={ 4 }
          fullWidth
          required
          sx={ { marginBottom: 1 } }
        />
        <CustomButton text={ "Submit" } onClick={ handleEnquirySubmit } />
      </Box>
    </Box>
  );

  return (
    <>
      { !contact ? (
        <Dialog open={ !isAuthenticated || contact } onClose={ closeForm } maxWidth="md" fullWidth>
          <DialogContent sx={ { backgroundColor: 'var(--color-p1))', padding: 0, overflow: 'hidden' } }>
            {/* Close Button at Top Right */ }
            <IconButton onClick={ closeForm } sx={ { position: 'absolute', top: 5, right: 5, color: 'white', ":focus": { outline: 'none', border: 'none' } } }>
              <FaTimes color='var(--color-p3)' />
            </IconButton>
            { formContent }
          </DialogContent>
        </Dialog>
      ) : (
        <Box>{ formContent }</Box>
      ) }
    </>
  );
}
EnquiryForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  contact: PropTypes.bool.isRequired,
};

export default EnquiryForm;

