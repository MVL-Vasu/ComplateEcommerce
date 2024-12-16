// const { toast } = require('react-toastify');

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const PhonePattern = /^[6-9]\d{9}$/;

// const emailPattern = /^[6-9]\d{9}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
const usernamePattern = /^[a-zA-Z0-9]{3,}$/;

// const erroricon = "<i className='material-icons'>info_outline</i>";


const ValidateEmail = (email, errorbox, label) => {

     if (IsNull(email.value)) {
          email.style.outline = "2px solid red";
          label.style.color = "red";
          errorbox.innerText = `${email.name} is required`;
          errorbox.style.display = 'block';
     }
     else if (IsPatternMatched(email.value, emailPattern)) {
          label.style.color = "green";
          errorbox.style.display = "none";
          email.style.outline = "2px solid green";
          // checkIcon.style.display = "block";
     }
     else {
          email.style.outline = "2px solid red";
          errorbox.style.display = "block";
          errorbox.innerText = "Invalid email address";
          label.style.color = "red";
          // checkIcon.style.display = "none";
     }
}

const ValidatePass = (pass, errorbox, label) => {

     if (IsNull(pass.value)) {
          pass.style.outline = "2px solid red";
          errorbox.innerText = `${pass.name} is required`;
          errorbox.style.display = 'block';
          label.style.color = "red";
     }
     else if (IsPatternMatched(pass.value, passwordPattern)) {
          pass.style.outline = "2px solid green";
          errorbox.style.display = "none";
          label.style.color = "green";
          // checkIcon.style.display = "block";
     }
     else {
          pass.style.outline = "2px solid red";
          errorbox.style.display = "block";
          errorbox.innerText = "please enter atleast 8 character with number and small letters";
          label.style.color = "red";
          // checkIcon.style.display = "none";
     }

}

const ValidateUsername = (username, errorbox, label) => {

     if (IsNull(username.value)) {
          username.style.outline = "2px solid red";
          errorbox.innerText = `${username.name} is required`;
          errorbox.style.display = 'block';
          label.style.color = "red";
     }
     else if (IsPatternMatched(username.value, usernamePattern)) {
          username.style.outline = "2px solid green";
          errorbox.style.display = "none";
          label.style.color = "green";
          // checkIcon.style.display = "block";
     }
     else {
          username.style.outline = "2px solid red";
          errorbox.style.display = "block";
          errorbox.innerText = "please enter atleast 3 character ";
          label.style.color = "red";
          // checkIcon.style.display = "none";
     }

}


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


const validate = (Inputs, errorbox, labels) => {

     let IsError = false;

     Inputs.forEach((element, i) => {

          if (element != null && errorbox.current[i] != null) {

               let name = element.getAttribute("name");

               // element.style.outline = "";
               // errorbox.current[i].innerText = "";
               // errorbox.current[i].style.display = "none";

               if (element.value === "") {
                    element.style.outline = "2px solid red";
                    errorbox.current[i].innerText = `${name} is required`;
                    errorbox.current[i].style.display = "block";
                    labels.current[i].style.color = "red";
                    IsError = true;
               }
               else if (name === "username" && !usernamePattern.test(element.value)) {
                    element.style.outline = "2px solid red";
                    errorbox.current[i].innerText = `username must contain at least 3 character`;
                    errorbox.current[i].style.display = "block";
                    labels.current[i].style.color = "red";
                    IsError = true;
               }
               else if (name === "email" && !emailPattern.test(element.value)) {
                    element.style.outline = "2px solid red";
                    errorbox.current[i].innerText = `Invalid email address`;
                    errorbox.current[i].style.display = "block";
                    labels.current[i].style.color = "red";
                    IsError = true;
               } else if (name === "password" && !passwordPattern.test(element.value)) {
                    element.style.outline = "2px solid red";
                    errorbox.current[i].innerText = `please enter atleast 8 character with number and small letters`;
                    errorbox.current[i].style.display = "block";
                    labels.current[i].style.color = "red";
                    IsError = true;
               }
          }
     });

     return IsError;

}

export { ValidateEmail, ValidatePass, ValidateUsername, validate };
// export { validate, inputvalidation };
