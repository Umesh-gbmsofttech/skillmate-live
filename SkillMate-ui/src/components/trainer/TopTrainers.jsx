import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './TopTrainers.css';
import logo from '../../assets/skillmate.jpg';
import Loading from '../../Loading';

function TopTrainers({ sectionHeading, student, trainer }) {
    const [isVisible, setIsVisible] = useState(false);
    const [trainers, setTrainers] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scrollDirection, setScrollDirection] = useState('down');
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (trainer === 'trainer') {
                    const response = await fetch('http://localhost:8080/trainers/fetch', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setTrainers(data);
                }
                if (student) {
                    const response = await fetch('http://localhost:8080/students/fetch', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setStudents(data);
                }
            } catch (error) {
                setError(`Error fetching data: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, trainer, student]);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const section = document.querySelector('.ourTopTrainersCardSection');
            if (section) {
                const rect = section.getBoundingClientRect();
                // setIsVisible(rect.top <= window.innerHeight && rect.bottom >= 0);
                setIsVisible(rect.top && rect.bottom >= 0);
            }
            setScrollDirection(window.scrollY > lastScrollY ? 'down' : 'up');
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleCardClick = (person) => {
        navigate('/rating-reviews/page', { state: { person } });
    };

    return (
        <>
            {loading ? (<Loading />) : error ? (
                <p>{error}</p>
            ) : (
                <div className={`ourTopTrainersContainer`}>
                    <h3 className='ourTopTrainersHeading'>{sectionHeading}</h3>
                    <div className={`ourTopTrainersCardSection`}>
                        {[...trainers, ...students].map((person, index) => (
                            <div key={index}
                                className={`trainerCard ${isVisible ? `visible ${scrollDirection}` : ''}`}
                                onClick={() => handleCardClick(person)}>
                                <img className='trainerCardImage'
                                    src={person.profilePic ? `data:image/jpeg;base64,${person.profilePic}` : logo}
                                    alt={person.fullName || 'Person'} />
                                <div className='trainerCardDetails'>
                                    <h4 className='trainerNameCard'>{person.fullName}</h4>
                                    <p className='trainerCardBody'>{person.details || 'No details available'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default TopTrainers;