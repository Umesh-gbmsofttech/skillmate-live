export const handleProfilePicChange = (e, setProfilePic, setError) => {
    const file = e.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            setError('Please upload a valid image file.');
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setError('File size must be less than 2MB.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(file);
    }
};

export const handleResumeChange = (e, setResume, setError) => {
    const file = e.target.files[0];
    if (file) {
        if (!file.type.includes('pdf')) {
            setError('Please upload a valid PDF file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setResume(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(file);
    }
};
