import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import api_paths from '../../config/apis';

import Swal from 'sweetalert2';
// import { toast } from 'react-toastify';

import { validate, ValidateEmail, ValidatePass, ValidateUsername } from './ValidateData';
import googleimg from './google.png'

import Button from '../UI/Button';
import Input from '../UI/Input';

const SignUp = () => {

     const Navigate = useNavigate();

     const username = useRef(null);
     const email = useRef(null);
     const password = useRef(null);
     const errorbox = useRef([]);
     const labels = useRef([]);

     const [passVisible, setpassVisible] = useState(false);
     const [formData, setformData] = useState({
          username: "",
          email: "",
          password: ""
     });

     const handleChange = (e) => {
          setformData({ ...formData, [e.target.name]: e.target.value });
     }

     const handleSubmit = async (e) => {

          let responseData;

          if (!validate([username.current, email.current, password.current], errorbox, labels)) {

               await fetch(api_paths.register, {
                    method: 'POST',
                    headers: {
                         Accept: 'application/form-data',
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
               })
                    .then((resp) => resp.json())
                    .then((data) => responseData = data)


               if (responseData.success) {

                    localStorage.setItem('auth-token', responseData.token);
                    window.location.replace("/");

               }
               else {

                    // swal("Product Deleted Successfully", { icon: "success", })
                    Swal.fire({
                         title: 'Sign Up Failed',
                         text: 'Email already exists',
                         icon: "error"
                    })
               }

               console.log("no Error");
          }
          else {
               console.log("Error");
          }

     }

     return (
          <div className='auth-container'>

               <div className="child-auth-container">

                    <h1>Login</h1>

                    <div className="input-container">

                         <div className="input-box">

                              <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>
                              <Input
                                   type="text"
                                   value={formData.username}
                                   name="username"
                                   placeholder={""}
                                   inputRef={username}
                                   onKeyUp={() => ValidateUsername(username.current, errorbox.current[0], labels.current[0])}
                                   onChange={handleChange}
                                   spellCheck={false}
                                   autoComplete={'off'}
                              />

                              <label ref={(e) => (labels.current[0] = e)} htmlFor="username" className='floating-label'>Enter Username</label>

                              <div ref={(e) => (errorbox.current[0] = e)} className="error username-error"> <i className="material-icons">info_outline</i> invalid username </div>

                         </div>

                         <div className="input-box">

                              <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>

                              <Input
                                   type="email"
                                   value={formData.email}
                                   name="email"
                                   placeholder={""}
                                   inputRef={email}
                                   onKeyUp={() => ValidateEmail(email.current, errorbox.current[1], labels.current[1])}
                                   onChange={handleChange}
                                   spellCheck={false}
                                   autoComplete={'off'}
                              />

                              <label ref={(e) => (labels.current[1] = e)} htmlFor="email" className='floating-label'>Enter Email</label>

                              <div ref={(e) => (errorbox.current[1] = e)} className="error email-error"> <i className="material-icons">info_outline</i> </div>

                         </div>

                         <div className="input-box">

                              <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>

                              <Input
                                   type={passVisible ? "text" : "password"}
                                   value={formData.password}
                                   name="password"
                                   placeholder={""}
                                   inputRef={password}
                                   onKeyUp={() => ValidatePass(password.current, errorbox.current[2], labels.current[2])}
                                   onChange={handleChange}
                              />

                              <label ref={(e) => (labels.current[2] = e)} htmlFor="password" className='floating-label'>Enter password</label>

                              <i className={`fa-regular fa-eye${passVisible ? "" : "-slash"} eye-icon`} onClick={() => setpassVisible(!passVisible)}></i>

                              <div ref={(e) => (errorbox.current[2] = e)} className="error pass-error"><i className="material-icons">info_outline</i> invalid password</div>

                         </div>

                    </div>

                    <Button text={"Sign Up"} onClick={handleSubmit} />

                    <div className='form-link'>

                         <p>Already have an account? <span onClick={() => { Navigate("/login") }}>Login</span> </p>

                    </div>

                    <div className="line"></div>

                    <div className="media-options">

                         <a href="/" className="field facebook">
                              <i className='fa-brands fa-facebook facebook-icon'></i>
                              <span>Login with Facebook</span>
                         </a>

                    </div>

                    <div className="media-options">

                         <a href="/" className="field google">
                              <img src={googleimg} alt="" className="google-img" />
                              <span>Login with Google</span>
                         </a>

                    </div>

               </div>

          </div>
     );
}

export default SignUp;
