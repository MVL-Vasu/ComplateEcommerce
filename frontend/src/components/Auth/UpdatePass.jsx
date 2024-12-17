import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import api_paths from '../../config/apis';

// import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';

import { ValidateUpdatePass, ValidateConfPass, ValidatePass } from './ValidateData';

import Button from '../UI/Button';
import Input from '../UI/Input';
import { toast } from 'react-toastify';

const UpdatePass = () => {

     const Navigate = useNavigate();

     useEffect(() => {
          // Redirect if OTP was not verified
          if (!sessionStorage.getItem('otpVerified')) {
               Navigate('/verify');
          }
     }, []);

     const passwordref = useRef(null);
     const confirmpassref = useRef(null);
     const errorbox = useRef([]);
     const labels = useRef([]);

     const [passVisible, setpassVisible] = useState(false);
     const [confirmpassVisible, setconfirmpassVisible] = useState(false);

     const [formData, setformData] = useState({
          password: "",
          confirmpass: ""
     });

     const handleChange = (e) => {
          setformData({ ...formData, [e.target.name]: e.target.value });
     }

     const handleSubmit = async (e) => {

          // let responseData;

          if (!ValidateUpdatePass(passwordref.current, confirmpassref.current, errorbox, labels)) {
               try {

                    const response = await fetch(api_paths.UpdatePass, {
                         method: 'POST',
                         body: JSON.stringify({ password: formData.password, token: localStorage.getItem("passToken") }),
                         headers: {
                              'Content-Type': 'application/json',
                         }
                    })
                    const result = await response.json();

                    if (result.success) {
                         toast.success(result.message);
                         sessionStorage.clear();
                         localStorage.removeItem("passToken");
                         localStorage.removeItem("forgetEmail");
                         Navigate("/login");
                    }
                    else {
                         toast.error(result.error);
                    }

               } catch (error) {
                    toast.error(error);
               }

          }
          else {
               console.log("error");
          }

     }

     return (

          <div className='auth-container'>

               <div className="child-auth-container">

                    <h1><i className="fa-solid fa-rotate"></i> New Password</h1>

                    <div className="input-container">

                         <div className="header-text">
                              <div className="text-line1">please enter at least 8-digits password</div>
                         </div>

                         <div className="input-box">

                              <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>

                              <Input
                                   type={passVisible ? "text" : "password"}
                                   value={formData.password}
                                   name="password"
                                   placeholder={""}
                                   inputRef={passwordref}
                                   onKeyUp={() => ValidatePass(passwordref.current, errorbox.current[0], labels.current[0])}
                                   onChange={handleChange}
                              />

                              <label ref={(e) => (labels.current[0] = e)} htmlFor="password" className='floating-label'>New Password</label>

                              <i className={`fa-regular fa-eye${passVisible ? "" : "-slash"} eye-icon`} onClick={() => setpassVisible(!passVisible)}></i>

                              <div ref={(e) => (errorbox.current[0] = e)} className="error pass-error"><i className="material-icons">info_outline</i> invalid password</div>

                         </div>

                         <div className="input-box">

                              <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>

                              <Input
                                   type={confirmpassVisible ? "text" : "password"}
                                   value={formData.confirmpass}
                                   name="confirmpass"
                                   placeholder={""}
                                   inputRef={confirmpassref}
                                   onKeyUp={() => ValidateConfPass(passwordref.current, confirmpassref.current, errorbox.current[1], labels.current[1])}
                                   onChange={handleChange}
                                   spellCheck={false}
                                   autoComplete={'off'}
                              />

                              <label ref={(e) => (labels.current[1] = e)} htmlFor="confirmpass" className='floating-label'>Confirm Password</label>

                              <i className={`fa-regular fa-eye${confirmpassVisible ? "" : "-slash"} eye-icon`} onClick={() => setconfirmpassVisible(!confirmpassVisible)}></i>

                              <div ref={(e) => (errorbox.current[1] = e)} className="error confirmpass-error"> <i className="material-icons">info_outline</i> invalid username </div>

                         </div>

                    </div>

                    <Button text={"Update Password"} onClick={handleSubmit} />

                    <div className='form-link'>

                         <p>Already have an account? <span onClick={() => { Navigate("/login") }}>Login</span> </p>

                    </div>

               </div>

          </div>
     );
}

export default UpdatePass;
