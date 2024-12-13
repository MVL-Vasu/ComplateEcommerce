const { toast } = require('react-toastify');

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const usernamePattern = /^[a-zA-Z0-9]{3,}$/;


const IsNull = (field) => {
     if (field === "") {
          return true;
     }
     return false;
}

const IsPatternMatched = (field, pattern) => {
     if (pattern.test(field)) {
          return true;
     }
     else {
          return false;
     }
}


const validate = (type, formData) => {


     let allInput = document.querySelectorAll(".input");
     const errorbox = document.querySelectorAll(".error")

     let IsError = false;

     allInput.forEach((element, i) => {

          if (element != null && errorbox[i] != null) {

               let name = element.getAttribute("name");

               element.style.outline = "";
               errorbox[i].innerText = "";
               errorbox[i].style.display = "none";

               if (element.value === "") {
                    element.style.outline = "2px solid red";
                    errorbox[i].innerText = `${name} is required`;
                    errorbox[i].style.display = "block";
                    return IsError = true;
               }
               else if (name === "username" && !usernamePattern.test(element.value)) {
                    element.style.outline = "2px solid red";
                    errorbox[i].innerText = `username must contain at least 3 character`;
                    errorbox[i].style.display = "block";
                    return IsError = true;
               }
               else if (name === "email" && !emailPattern.test(element.value)) {
                    element.style.outline = "2px solid red";
                    errorbox[i].innerText = `Invalid email address`;
                    errorbox[i].style.display = "block";
                    return IsError = true;
               } else if (name === "password" && !passwordPattern.test(element.value)) {
                    element.style.outline = "2px solid red";
                    errorbox[i].innerText = `please enter atleast 8 character with number and small letters`;
                    errorbox[i].style.display = "block";
                    return IsError = true;
               }
          }
     });

     return IsError;

}

const inputvalidation = (e, formData) => {


     let element = e.target;
     let errorbox = element.parentElement.lastChild;
     let checkIcon = element.parentElement.firstChild;


     if (e.target.name === "username") {

          if (IsNull(element.value)) {
               element.style.outline = "2px solid red";
               errorbox.innerText = `${element.name} is required`;
               errorbox.style.display = 'block';
          }
          else if (IsPatternMatched(element.value, usernamePattern)) {
               element.style.outline = "2px solid green";
               checkIcon.style.display = "block";
               errorbox.style.display = "none";
          }
          else {
               element.style.outline = "2px solid red";
               errorbox.style.display = "block";
               errorbox.innerText = "username must contain at least 3 character";
               checkIcon.style.display = "none";
          }

     }

     if (element.name === "email") {

          if (IsNull(element.value)) {
               element.style.outline = "2px solid red";
               errorbox.innerText = `${element.name} is required`;
               errorbox.style.display = 'block';
          }
          else if (IsPatternMatched(element.value, emailPattern)) {
               element.style.outline = "2px solid green";
               checkIcon.style.display = "block";
               errorbox.style.display = "none";
          }
          else {
               element.style.outline = "2px solid red";
               errorbox.style.display = "block";
               errorbox.innerText = "Invalid email address";
               checkIcon.style.display = "none";
          }

     }

     if (element.name === "password") {

          if (IsNull(element.value)) {
               element.style.outline = "2px solid red";
               errorbox.innerText = `${element.name} is required`;
               errorbox.style.display = 'block';
          }
          else if (IsPatternMatched(element.value, passwordPattern)) {
               element.style.outline = "2px solid green";
               checkIcon.style.display = "block";
               errorbox.style.display = "none";
          }
          else {
               element.style.outline = "2px solid red";
               errorbox.style.display = "block";
               errorbox.innerText = "please enter atleast 8 character with number and small letters";
               checkIcon.style.display = "none";
          }

     }

}





export { validate, inputvalidation };
