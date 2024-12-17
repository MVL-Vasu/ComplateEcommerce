import React, { useEffect, useMemo, useState } from 'react';
// import Input from '../UI/Input';
import './Auth.css';
import Button from '../UI/Button';
import Countdown from 'react-countdown';

import { Navigate, useNavigate } from 'react-router-dom';
import OtpInput from 'otp-input-react';
import api_path from '../../config/apis'
import { toast } from 'react-toastify';


const OtpVerification = () => {

     const Navigator = useNavigate();

     
     const [otp, setotp] = useState("");
     const [otptimer, setotptimer] = useState(null);
     const [IsOtpExpired, setIsOtpExpired] = useState(false);
     const targetTime = useMemo(()=> Date.now() + otptimer,[otptimer]);
     
     // const location = useLocation();
     // const { phonenumber } = location.state || {};
     // const number = `+919313297933`;

     useEffect(() => {

          if (!sessionStorage.getItem('otpSent')) {
               Navigator('/forgetpass');
          }

          const getTime = async () => {
               try {
                    const response = await fetch(api_path.GetOtpTimer, {
                         method: 'POST',
                         body: JSON.stringify({ token: localStorage.getItem('passToken') }),
                         headers: {
                              'Content-Type': 'application/json',
                         }
                    })

                    let result = await response.json();

                    if (result.success) {

                         const remainingtime = new Date(result.sendtime).getTime() - new Date().getTime();

                         if (remainingtime > 0) {
                              setotptimer(remainingtime);
                         }
                         else {
                              setIsOtpExpired(true);
                         }
                    }
                    else {
                         toast.error(result.error);
                    }

               } catch (error) {
                    console.log(error);
                    toast.error(error);
               }
          }
          getTime();
     },[Navigator]);

     const resentOtp = async () => {

          const response = await fetch(api_path.forgetpass, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json'
               },
               body: JSON.stringify({ email: localStorage.getItem('forgetEmail') })
          })

          const result = await response.json();

          if (result.success) {

               toast.success(result.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               });

               localStorage.setItem('passToken', result.token);
               setotptimer(1 * 60 * 1000);
               setIsOtpExpired(false);



               // localStorage.setItem('forgetEmail', result.token);

          } else {

               toast.error(result.error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               });

          }

     }

     const handleSendOtp = async () => {

          const response = await fetch(api_path.otpverify, {
               method: 'POST',
               body: JSON.stringify({ otp: otp }),
               headers: {
                    'Content-Type': 'application/json',
               }
          })

          const result = await response.json();

          console.log(result);

          if (result.success) {
               toast.success(result.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               });

               sessionStorage.setItem('otpVerified', 'true');
               Navigator("/updatepass");

          }
          else {
               toast.error(result.error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
               });
          }

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

                    {/* <form action=""> */}

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

                         {otptimer !== null && !IsOtpExpired
                              ? (<Countdown onComplete={() => { setIsOtpExpired(true) }} date={targetTime} />)
                              : (<p>Didn't receive an SMS? <span onClick={resentOtp}>Resend OTP</span></p>)
                         }

                    </div>

                    <Button text={"Verify Otp"} onClick={handleSendOtp} />

                    <div className='form-link'>

                         <p>Already have an account? <span onClick={() => { Navigator("/login") }}>Login</span> </p>

                    </div>

                    {/* </form> */}
               </div>
          </div>
     );
}

export default OtpVerification;








