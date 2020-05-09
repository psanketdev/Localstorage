//form-modal
var formBtn = document.querySelectorAll('.get-start-form a');

formBtn.forEach(function(element){
  element.addEventListener('click', function(){
    document.querySelector('.main-container').classList.add('block');
    var formModal = document.querySelector('.formModal');
    formModal.classList.add('block');
    if (element.classList.contains("signin-btn")) {
      formModal.classList.add("active");
    }
  });
})

function formResponsive(){
  if(window.innerWidth <= 767){
    document.querySelector('.overlay-container').classList.add('none');
  }
  else{
    document.querySelector('.overlay-container').classList.add('show');
  }
}
formResponsive();

//for switching a froms
var signUpButton = document.getElementById('signUp');
var signInButton = document.getElementById('signIn');
var container = document.getElementById('container');

signUpButton.addEventListener('click', function () {
  container.classList.add('right-panel-active');
});


signInButton.addEventListener('click', function () {
  container.classList.remove('right-panel-active');
});
 
//function for signup validation 
var username = document.querySelector('.signup-name');
var signupEmail = document.querySelector('.signup-email');
var signupPassword = document.querySelector('.signup-password');
var validuser = false;
var validemail = false;
var validpassword = false;

//  regex validity 
username.addEventListener('blur', function () {
  var username_regex = /^([a-zA-Z]){2,10}$/;
  var nameStr = username.value;
  if (username_regex.test(nameStr)) {
    document.querySelector('.name_error').style.opacity = "0";
    validuser = true;
  }
  else {
    (username_regex.test(nameStr))
    document.querySelector('.name_error').style.opacity = "1";
    validuser = false;
  }
});

signupEmail.addEventListener('blur', function () {
  var email_regex = /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/;
  var emailStr = signupEmail.value;
  if (email_regex.test(emailStr)) {
    document.querySelector('.email_error').style.opacity = "0";
    validemail = true;
  }
  else {
    document.querySelector('.email_error').style.opacity = "1";
    validemail = false;
  }
});

signupPassword.addEventListener('blur', function () {
  var password_regex = /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/;
  var passwordStr = signupPassword.value;
  if (password_regex.test(passwordStr)) {
    document.querySelector('.password_error').style.opacity = "0";
    validpassword = true;
  }
  else {
    document.querySelector('.password_error').style.opacity = "1";
    validpassword = false;
  }
});

//for a click on submit button
var signUpBtn = document.querySelector('.sign-up');
signUpBtn.addEventListener('click', submitform);

function submitform(e) {
  e.preventDefault();
  if (validuser && validemail && validpassword) {
    console.log(validpassword, validemail, validuser);
    storeData();
    swal({
      title: "Good job!",
      text: "You Form Submitted Succefully.",
      icon: "success",
      button: "OK!",
    });
    formReset();
  }
  else if (username.value == "" || signupEmail.value == "" || signupPassword.value == "") {
    swal({
      title: "Alert!",
      text: "Kindly Check Your Details...",
      icon: "warning",
      button: "OK!",
    });
  }
  else {
    swal({
      title: "Oops!",
      text: "Something Went Wrong!",
      icon: "warning",
      button: "OK!",
    });
  }
}

//validation for signin form
var signinEmail = document.querySelector('.signin-email');
var signinPassword = document.querySelector('.signin-password');
var userData = null;

signinEmail.addEventListener('blur', function () {
  var email_regex = /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/;
  var emailStr = signinEmail.value;
  if (email_regex.test(emailStr)) {
    document.querySelector('.signin_email_error').style.opacity = "0";
    validemail = true;
  }
  else {
    document.querySelector('.signin_email_error').style.opacity = "1";
    validemail = false;
  }
});

signinPassword.addEventListener('blur', function () {
  var password_regex = /((?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z])){4,15}/;
  var passwordStr = signinPassword.value;
  if (password_regex.test(passwordStr)) {
    document.querySelector('.signin_password_error').style.opacity = "0";
    validpassword = true;
  }
  else {
    document.querySelector('.signin_password_error').style.opacity = "1";
    validpassword = false;
  }
});

//here we stored data in localstorage
function storeData() {
  var Data = {
    name: username.value,
    email: signupEmail.value,
    password: signupPassword.value,
  }
  var data_stored = JSON.stringify(Data);
  var users = "user" + localStorage.length;
  localStorage.setItem(users, data_stored);
  window.location.assign("home.html");
}

//function for user in localstorage exist or not
function checkUser(Email) {
  if (localStorage.length !== 0) {
    for (var key in localStorage) {
      if (key === "length") 
      { break;}
      else {
        var parseData = JSON.parse(localStorage[key]);
        
        var registeredEmail = parseData.email;
        if (Email.value === registeredEmail) {
          userData = parseData;
          return true;
        } 
        else { return false; }
      }
    }
  } 
  else { return false; }
}


//click event on sign button
var signIn_btn = document.querySelector('.sign-in');
signIn_btn.addEventListener('click', mainLogin);

function mainLogin(e) {
  e.preventDefault();
      var UserAlreadyExist = checkUser(signinEmail);
      if (UserAlreadyExist) {
        var password = userData.password;
        if (signinPassword.value === password) {
          swal({
            title: "Thank You!",
            text: "Thank You for Connecting with us",
            icon: "success",
            button: "OK!",
          });
          formReset();
          window.location.assign("home.html");
        }
        else { 
            swal({
                  title: "Alert!",
                  text: "Email ID & Password Doesn't Match, kindly check",
                  icon: "warning",
                  button: "OK!",
                });
        }
      } else { 
        swal({
          title: "Alert!",
          text: "Email ID & Password Doesn't Match, kindly check",
          icon: "warning",
          button: "OK!",
        });     
      }
}

//function for form reset
function formReset() {
  document.querySelector('form').reset();
}