import React, { useState } from 'react';
import './CSS/LoginSignUp.css';

const LoginSignUp = () => {

     const [state, setState] = useState("Login");
     const [formData, setformData] = useState({
          username: "",
          email: "",
          password: ""
     });

     const login = async () => {
          let responseData;

          await fetch('http://localhost:3001/login', {
               method: 'POST',
               headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(formData),
          }).then((resp) => resp.json()).then((data) => responseData = data)

          if (responseData.success) {
               localStorage.setItem('auth-token', responseData.token);
               window.location.replace("/");
          }
     };

     const signup = async () => {

          let responseData;

          await fetch('http://localhost:3001/signup', {
               method: 'POST',
               headers: {
                    Accept: 'application/form-data',
                    'Content-Type': 'application/json',
               },
               body: JSON.stringify(formData),
          }).then((resp) => resp.json()).then((data) => responseData = data)


          if (responseData.success) {
               localStorage.setItem('auth-token', responseData.token);
               window.location.replace("/");
          }
          else{
               // swal("Product Deleted Successfully", { icon: "success", })
               alert("Signup Failed");
          }

     };

     const changeHandler = (e) => {
          setformData({ ...formData, [e.target.name]: e.target.value });
     }

     return (
          <div className='loginsignup'>
               <div className="loginsignup-container">
                    <h1>{state}</h1>
                    <div className="loginsignup-fields">

                         {
                              state === "Sign Up" ? <input type="text" value={formData.username} onChange={changeHandler} name='username' placeholder='Your Name' /> : <></>
                         }

                         <input type="email" value={formData.email} onChange={changeHandler} name='email' placeholder='Email Address' />
                         <input type="password" value={formData.password} onChange={changeHandler} name='password' placeholder='Password' />
                    </div>

                    <button onClick={() => state === "Login" ? login() : signup()}>{state}</button>
                    {
                         state === "Sign Up" ?
                              <p className='loginsignup-login'>Already have an account ? <span onClick={() => setState("Login")}>Login here</span></p>
                              :
                              <p className='loginsignup-login'>Create an Account ? <span onClick={() => setState("Sign Up")} >Sign Up</span></p>
                    }

                    <div className="loginsignup-agree">
                         <input type="checkbox" name=' ' id=' ' />
                         <p>By continuing, i agree to the terms of use & privacy policy.</p>
                    </div>
               </div>
          </div>
     );
}

export default LoginSignUp;
