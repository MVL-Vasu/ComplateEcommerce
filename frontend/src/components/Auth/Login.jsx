import React, { useRef, useState } from 'react';
import './Auth.css';
import api_paths from '../../config/apis';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import { validate, ValidateEmail, ValidatePass } from './ValidateData';
import googleimg from './google.png'

import Input from '../UI/Input';
import Button from '../UI/Button';



const Login = () => {

     const email = useRef(null);
     const password = useRef(null);
     const errorbox = useRef([]);
     const labels = useRef([]);

     const [passVisible, setpassVisible] = useState(false);
     const Navigate = useNavigate();
     const [formData, setformData] = useState({
          email: "",
          password: ""
     });

     const handleChange = (e) => {
          setformData({ ...formData, [e.target.name]: e.target.value });
     }

     const handleSubmit = async (e) => {

          let responseData;

          if (!validate([email.current, password.current], errorbox, labels)) {

               await fetch( api_paths.login , {
                    method: 'POST',
                    headers: {
                         Accept: 'application/form-data',
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
               })
                    .then((resp) => resp.json())
                    .then((data) => responseData = data)

               console.log(responseData);

               if (responseData.success) {

                    localStorage.setItem('auth-token', responseData.token);

                    await Swal.fire({
                         title: "Login Successful",
                         text: "Redirection to home page...",
                         icon: "success",
                         timer: 3000,
                         limit : 1,
                         timerProgressBar: true,
                    })

                    window.location.replace("/");

               }
               else {

                    toast.error(responseData.error, {
                         position: "top-center",
                         autoClose: 3000,
                         hideProgressBar: false,
                         closeOnClick: true,
                         pauseOnHover: false,
                         draggable: true,
                         progress: undefined,
                         theme: "colored",
                    });

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
                                   type="email"
                                   value={formData.email}
                                   name="email"
                                   placeholder={""}
                                   inputRef={email}
                                   onKeyUp={() => ValidateEmail(email.current, errorbox.current[0], labels.current[0])}
                                   onChange={handleChange}
                                   spellCheck={false}
                                   autoComplete={'off'}
                              />

                              <label ref={(e) => (labels.current[0] = e)} htmlFor="email" className='floating-label'>Enter Email</label>

                              <div ref={(e) => (errorbox.current[0] = e)} className="error email-error"> <i className="material-icons">info_outline</i> </div>

                         </div>

                         <div className="input-box">

                              <i className="success-icon fa-solid fa-circle-check" style={{ color: '#18c994' }}></i>

                              <Input
                                   type={passVisible ? "text" : "password"}
                                   value={formData.password}
                                   name="password"
                                   placeholder={""}
                                   inputRef={password}
                                   onKeyUp={() => ValidatePass(password.current, errorbox.current[1], labels.current[1])}
                                   onChange={handleChange}
                              />

                              <label ref={(e) => (labels.current[1] = e)} htmlFor="password" className='floating-label'>Enter password</label>

                              <i className={`fa-regular fa-eye${passVisible ? "" : "-slash"} eye-icon`} onClick={() => setpassVisible(!passVisible)}></i>

                              <div ref={(e) => (errorbox.current[1] = e)} className="error pass-error"><i className="material-icons">info_outline</i> invalid password</div>

                         </div>

                    </div>

                    <div className="form-link forget-pass-link">

                         <Link to={"/forgetPass"}><span>foreget passoword</span></Link>

                    </div>

                    <Button text={"Login"} onClick={handleSubmit} />

                    <div className='form-link'>

                         <p>Do not have an Account? <span onClick={() => { Navigate("/signup") }}>SignUp</span> </p>

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

export default Login;
