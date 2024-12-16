
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export function LoginStudent() {
    
    const [mobile, setMobile] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [showOtp , setShowOtp]=useState(false);
    let navigate =useNavigate();

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (mobile.length === 10) {
            setShowOtp(true);
            alert('OTP sent to the entered mobile number');
        } else {
            alert('Please enter a valid 10-digit mobile number');
        }
    };

    const handleCloseForm = () => {
       
        navigate("/");
    };

    return (
        <>
            {showForm && (
                <div className="container mt-5 mb-5 align-items-center justify-content-center">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card shadow position-relative">
                                
                            <button
                                    className="btn-close position-absolute"
                                    style={{ top: '10px', right: '10px' }}
                                    onClick={handleCloseForm}
                                ></button>

                                {/* <div className="card-header text-black text-center">
                                    <h4>Student Login</h4>
                                </div> */}
                                <div className="card-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="mobile">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="mobile"
                                                placeholder="Enter 10-digit mobile number"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                            />
                                        </div>
                                       
                                            {showOtp &&(
                                                <div className="mb-3">
                                                <label className="form-label" htmlFor="otp">
                                                    OTP
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="otp"
                                                    placeholder="Enter OTP"
                                                />
                                            </div>
                                            )}
                                      
                                        
                                           {!showOtp &&(
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={handleSendOtp}
                                            >
                                                Send OTP
                                            </button>
                                           )}
                                       
                                       
                                           {showOtp &&(
                                             <button
                                             type="submit"
                                             className="btn btn-success w-100 mt-3"
                                         >
                                             Login
                                         </button>
                                           )}
                                        
                                    </form>
                                </div>
                                <div className="card-footer text-center text-muted mb-5">
                                    Need help? Contact support.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
















// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';

// export function LoginStudent() {
//     const [mobile, setMobile] = useState('');
//     const [otp, setOtp] = useState('');
//     const [showOtp, setShowOtp] = useState(false);
//     let navigate = useNavigate();

//     // Function to handle sending OTP
//     const handleSendOtp = async (e) => {
//         e.preventDefault();
//         if (mobile.length === 10) {
//             try {
//                 const response = await fetch('http://localhost:3001/send-otp', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ mobile }),
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setShowOtp(true);
//                     alert(data.message || 'OTP sent successfully');
//                 } else {
//                     alert(data.message || 'Failed to send OTP');
//                 }
//             } catch (error) {
//                 console.error('Error sending OTP:', error);
//                 alert('An error occurred while sending OTP.');
//             }
//         } else {
//             alert('Please enter a valid 10-digit mobile number');
//         }
//     };

//     // Function to handle OTP verification
//     const handleOtpVerification = async (e) => {
//         e.preventDefault();
//         if (otp) {
//             try {
//                 const response = await fetch('http://localhost:3001/verify-otp', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ mobile, otp }),
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     alert(data.message || 'OTP verified successfully');
//                     navigate('/dashboard'); // Navigate to the dashboard on success
//                 } else {
//                     alert(data.message || 'Invalid OTP');
//                 }
//             } catch (error) {
//                 console.error('Error verifying OTP:', error);
//                 alert('An error occurred while verifying OTP.');
//             }
//         } else {
//             alert('Please enter the OTP');
//         }
//     };

//     // Function to close the form
//     const handleCloseForm = () => {
//         navigate('/');
//     };

//     return (
//         <div className="container mt-5 mb-5 d-flex align-items-center justify-content-center">
//             <div className="card shadow-lg" style={{ width: '100%', maxWidth: '28rem' }}>
//                 <button
//                     className="btn-close position-absolute"
//                     style={{ top: '10px', right: '10px' }}
//                     onClick={handleCloseForm}
//                 ></button>
//                 <div className="card-header bg-primary text-white text-center">
//                     <h4>Student Login</h4>
//                 </div>
//                 <div className="card-body">
//                     <form>
//                         <div className="mb-3">
//                             <label className="form-label" htmlFor="mobile">
//                                 Mobile Number
//                             </label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="mobile"
//                                 placeholder="Enter 10-digit mobile number"
//                                 value={mobile}
//                                 onChange={(e) => setMobile(e.target.value)}
//                             />
//                         </div>

//                         {showOtp && (
//                             <div className="mb-3">
//                                 <label className="form-label" htmlFor="otp">
//                                     OTP
//                                 </label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id="otp"
//                                     placeholder="Enter OTP"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                 />
//                             </div>
//                         )}

//                         {!showOtp && (
//                             <button
//                                 className="btn btn-primary w-100"
//                                 onClick={handleSendOtp}
//                             >
//                                 Send OTP
//                             </button>
//                         )}

//                         {showOtp && (
//                             <button
//                                 className="btn btn-success w-100 mt-3"
//                                 onClick={handleOtpVerification}
//                             >
//                                 Login
//                             </button>
//                         )}
//                     </form>
//                 </div>
//                 <div className="card-footer text-center text-muted">
//                     Need help? <a href="#" className="text-primary">Contact support</a>.
//                 </div>
//             </div>
//         </div>
//     );
// }
