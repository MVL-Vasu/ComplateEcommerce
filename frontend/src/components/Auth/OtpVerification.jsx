import React, { useState } from 'react';
// import Input from '../UI/Input';
import './Auth.css';
import Button from '../UI/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from 'otp-input-react';
import { auth } from "./firebase"; // Ensure this path is correct
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";


const OtpVerification = () => {

     const Navigator = useNavigate();

     const [otp, setotp] = useState(""); 

     const location = useLocation();
     const { phonenumber } = location.state || {};
     const number = `+919313297933`;

     const handleSubmit = (e) => {
          e.preventDefault();
          
          console.log(otp);
     };

     // Initialize Recaptcha
     const setupRecaptcha = () => {
          if (!window.recaptchaVerifier) {
               window.recaptchaVerifier = new RecaptchaVerifier(
                    auth,
                    "recaptcha-container",
                    {
                         size : "invisible",
                         callback : (response) => {
                              console.log("Recaptcha Verified");
                         },
                    }
               );
          }

     };

     const handleSendOtp = () => {
          setupRecaptcha();
          const phoneNumber = "+919313297933"; // Replace with the actual phone number
          // const phoneNumber = "+917487015447"; // Replace with the actual phone number
          console.log(phoneNumber);
          const appVerifier = window.recaptchaVerifier;

          signInWithPhoneNumber(auth, phoneNumber, appVerifier)
               .then((confirmationResult) => {
                    // SMS sent successfully
                    window.confirmationResult = confirmationResult;
                    console.log("OTP sent");
               })
               .catch((error) => {
                    console.error("Error sending OTP", error);
               });
     };


     return (
          <div className='auth-container otp-verification-page'>

               <div className="child-auth-container">


                    <h1>Verify OTP</h1>

                    <div id="recaptcha-container"></div>

                    <div className="header-text">
                         <div className="text-line1">Please enter the OTP send to send to your phone number</div>
                         <div className="text-line2">OTP send to 9313297933 <span>Change</span> </div>
                    </div>

                    <form action="">

                         <div className="input-container">
                              <OtpInput
                                   value={otp}
                                   OTPLength={6}
                                   otpType={"number"}
                                   onChange={setotp}
                                   disabled={false}
                                   autoFocus
                                   className="otp-container"
                              ></OtpInput>
                         </div>


                         <div className="resend-otp-timer form-link">
                              <p>Didn't receive an SMS? </p> <span>Resend OTP</span>
                         </div>

                         <Button text={"Verify Otp"} onClick={handleSendOtp} type={"submit"} />

                         <div className='form-link'>

                              <p>Already have an account? <span onClick={() => { Navigator("/login") }}>Login</span> </p>

                         </div>

                    </form>
               </div>
          </div>
     );
}

export default OtpVerification;








