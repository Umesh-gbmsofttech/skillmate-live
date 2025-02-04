import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import '../admin/AdminWelcome.css';
import Search from '../Search';
import axios from 'axios';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import profileImagePlaceholder from '../../assets/profilePic.jpg';
import ConfirmationDialog from '../utility/ConfirmationDialog';
import { showSuccessToast, showErrorToast, showInfoToast, showWarningToast } from '../utility/ToastService';

function ManageTrainersList() {
    const navigate = useNavigate();
    const [trainers, setTrainers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [trainerToDelete, setTrainerToDelete] = useState(null);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/trainers/fetch');
                const fetchedTrainers = response.data.map((trainer) => ({
                    id: trainer.id,
                    fullName: trainer.fullName,
                    experience: trainer.experience,
                    ratingsAverage: '4.5',
                    stars: '⭐⭐⭐⭐⭐',
                    rateByUsers: '(10,321)',
                    technologies: trainer.technologies ? trainer.technologies.join(', ') : 'Not specified',
                    profileImage: trainer.profilePic
                        ? `data:image/png;base64,${trainer.profilePic}`
                        : profileImagePlaceholder,
                }));
                setTrainers(fetchedTrainers);
                setLoading(false);
            } catch (error) {
                // console.error('Error fetching trainers data:', error);
                showErrorToast('Error fetching trainers data!');
            }
        };

        fetchTrainers();
    }, []);

    // Fuse.js configuration for search
    const fuse = new Fuse(trainers, {
        keys: ['fullName', 'technologies', 'experience'],
        threshold: 0.3, // Adjust for more/less strict matching
        includeScore: true,
    });

    // Filter trainers based on search query
    const filteredTrainers = searchQuery
        ? fuse.search(searchQuery).map(result => result.item)
        : trainers;

    // Handle delete trainer
    const handleDeleteTrainer = async (trainerId) => {
        setTrainerToDelete(trainerId);
        setIsConfirmDialogOpen(true); // Open the confirmation dialog
    };

    // Handle confirming the delete action
    const handleConfirmDelete = async () => {
        if (trainerToDelete) {
            try {
                const response = await axios.delete(`http://localhost:8080/trainers/delete/${trainerToDelete}`);
                if (response.status === 200) {
                    showSuccessToast('Trainer deleted successfully!');
                    setTrainers((prevTrainers) => prevTrainers.filter((trainer) => trainer.id !== trainerToDelete));
                    setSearchQuery(''); // Clear search query
                } else {
                    showErrorToast('Failed to delete the trainer. Please try again.');
                }
            } catch (error) {
                // console.error('Error deleting the trainer:', error);
                showErrorToast('An error occurred while trying to delete the trainer.');
            }
            setIsConfirmDialogOpen(false); // Close the dialog after confirming deletion
        }
    };

    // Handle cancel action for deletion
    const handleCancel = () => {
        setIsConfirmDialogOpen(false); // Close the dialog without deleting
        setTrainerToDelete(null); // Reset the trainer to delete
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="container trainers-list-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="admin-welcome">
                                <h1>Hello, Admin!</h1>
                                <p>Trainer's List</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <Search onSearch={setSearchQuery} />
                        </div>
                        <p className='col-12'>Number of Results: {filteredTrainers.length}</p>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <button onClick={() => navigate('/trainer-signup')} className="btn btn-success add__new-trainer-btn mb-5">
                                Add New Trainer
                            </button>
                        </div>
                    </div>

                    <div className="row ad__trainers-list">
                        {filteredTrainers.length > 0 ? (
                            filteredTrainers.map((trainer, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                                    <div className="card">
                                        <img className="card-img-top" src={trainer.profileImage} alt={`${trainer.fullName} profile`} />
                                        <div className="card-body">
                                            <h5 className="card-title">{trainer.fullName}</h5>
                                            <p className="card-text">Experience: {trainer.experience}</p>
                                            <p className="card-text">Ratings: {trainer.ratingsAverage} {trainer.stars} {trainer.rateByUsers}</p>
                                            <p className="card-text">Technologies: {trainer.technologies}</p>
                                            <p className="card-text">Trainer ID: {trainer.id}</p>
                                            <button className="btn btn-primary mr-2" onClick={() => navigate(`/trainer-profile-update/${trainer.id}`)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteTrainer(trainer.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p>No trainers available.</p>
                            </div>
                        )}
                    </div>

                    <ConfirmationDialog
                        open={isConfirmDialogOpen}
                        onClose={handleCancel}
                        onConfirm={handleConfirmDelete}
                        message="Are you sure you want to delete this trainer?"
                    />
                </div>
            )}
        </>
    );
}

export default ManageTrainersList;
