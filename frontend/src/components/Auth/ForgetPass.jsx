import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

import api_path from '../../config/apis'
import { validate, ValidateEmail } from './ValidateData';

import Input from '../UI/Input';
import Button from '../UI/Button';



const ForgetPass = () => {

     const Navigator = useNavigate();

     const emailref = useRef(null);
     const errorbox = useRef([]);
     const labels = useRef([]);
     const [email, setemail] = useState();

     const handleChange = (e) => {
          setemail(e.target.value);
     }

     const handleSubmit = async (e) => {

          if (!validate([emailref.current], errorbox, labels)) {

               const response = await fetch(api_path.forgetpass, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
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
                    localStorage.setItem('forgetEmail', email);

                    // Simulate OTP sending
                    sessionStorage.setItem('otpSent', 'true');
                    Navigator("/verify", { state: { email } });

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

     }

     return (

          <div className='auth-container'>

               <div className="child-auth-container">

                    <h1>Forget Password</h1>

                    <div className="header-text">
                         <div className="text-line1">Enter your registered email, we will send you 6-digit OTP for forget password </div>
                    </div>

                    <div className="input-container">

                         <div className="input-box">

                              <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>

                              <Input
                                   type="email"
                                   value={email}
                                   name="email"
                                   placeholder={""}
                                   inputRef={emailref}
                                   onKeyUp={() => ValidateEmail(emailref.current, errorbox.current[0], labels.current[0])}
                                   onChange={handleChange}
                                   spellCheck={false}
                                   autoComplete={'off'}
                              />

                              <label ref={(e) => (labels.current[0] = e)} htmlFor="email" className='floating-label'>Enter Email</label>

                              <div ref={(e) => (errorbox.current[0] = e)} className="error email-error"> <i className="material-icons">info_outline</i> </div>


                         </div>

                    </div>

                    <Button text={"Send Otp"} onClick={handleSubmit} />

               </div>

          </div>

     );
}

export default ForgetPass;
