import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 

export function LoginEmail() {
    const [otpVisible, setOtpVisible] = useState(false);
    const [email, setEmail] = useState(""); 
    const [showForm, setShowForm]=useState(true);
    let navigate=useNavigate();

    const handleSendOtp = (e) => {
        e.preventDefault(); 
        if (email) {
            alert("OTP sent to the entered email address");
            setOtpVisible(true); 
        } else {
            alert("Please enter a valid email");
        }
    };

    const handleCloseForm =(e)=>{
        navigate('/');
    }

    return (
        <>
          {showForm && (
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '25rem' }}>
                <button className="btn-close position-absolute " style={{"top":"10px", "right":"10px"}} onClick={handleCloseForm}></button>
                <div className="card-body">
                    <form>
                        
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter a valid email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        {otpVisible && (
                            <div className="mb-3">
                                <label className="form-label">OTP</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter OTP"
                                />
                            </div>
                        )}
                        <Link>login with mobile Number</Link>

                        {!otpVisible && (
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleSendOtp}
                            >
                                Send OTP
                            </button>
                        )}

                        {otpVisible && (
                            <button
                                className="btn btn-success w-100 mt-3"
                                type="submit"
                            >
                                Login
                            </button>
                        )}
                    </form>
                    <Link to="/register" className="d-block mt-3 text-center">
                        Don't have an account? Please Register
                    </Link>
                </div>
            </div>
        </div>
          )}
        </>
    );
}












// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'; 

// export function LoginEmail() {
//     const [otpVisible, setOtpVisible] = useState(false);
//     const [email, setEmail] = useState(""); 
//     const [otp, setOtp] = useState("");
//     const [showForm, setShowForm] = useState(true);
//     let navigate = useNavigate();

//     // Function to handle sending OTP
//     const handleSendOtp = async (e) => {
//         e.preventDefault();
//         if (email) {
//             try {
//                 const response = await fetch('http://localhost:3001/send-otp', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ email }),
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     alert(data.message || 'OTP sent successfully to your email.');
//                     setOtpVisible(true);
//                 } else {
//                     alert(data.message || 'Failed to send OTP.');
//                 }
//             } catch (error) {
//                 console.error('Error sending OTP:', error);
//                 alert('An error occurred while sending OTP.');
//             }
//         } else {
//             alert('Please enter a valid email.');
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
//                     body: JSON.stringify({ email, otp }),
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     alert(data.message || 'OTP verified successfully.');
//                     navigate('/dashboard'); // Redirect to dashboard upon successful verification
//                 } else {
//                     alert(data.message || 'Invalid OTP. Please try again.');
//                 }
//             } catch (error) {
//                 console.error('Error verifying OTP:', error);
//                 alert('An error occurred while verifying OTP.');
//             }
//         } else {
//             alert('Please enter the OTP.');
//         }
//     };

//     // Function to close the form
//     const handleCloseForm = () => {
//         navigate('/');
//     };

//     return (
//         <>
//             {showForm && (
//                 <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//                     <div className="card shadow p-4" style={{ width: '25rem' }}>
//                         <button 
//                             className="btn-close position-absolute" 
//                             style={{ top: "10px", right: "10px" }} 
//                             onClick={handleCloseForm}
//                         ></button>
//                         <div className="card-body">
//                             <form>
//                                 <div className="mb-3">
//                                     <label className="form-label">Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         placeholder="Enter a valid email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>

//                                 {otpVisible && (
//                                     <div className="mb-3">
//                                         <label className="form-label">OTP</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             placeholder="Enter OTP"
//                                             value={otp}
//                                             onChange={(e) => setOtp(e.target.value)}
//                                         />
//                                     </div>
//                                 )}
//                                 <Link to="/login-mobile" className="d-block mb-3">
//                                     Login with Mobile Number
//                                 </Link>

//                                 {!otpVisible && (
//                                     <button
//                                         className="btn btn-primary w-100"
//                                         onClick={handleSendOtp}
//                                     >
//                                         Send OTP
//                                     </button>
//                                 )}

//                                 {otpVisible && (
//                                     <button
//                                         className="btn btn-success w-100 mt-3"
//                                         onClick={handleOtpVerification}
//                                     >
//                                         Login
//                                     </button>
//                                 )}
//                             </form>
//                             <Link to="/register" className="d-block mt-3 text-center">
//                                 Don't have an account? Please Register
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
