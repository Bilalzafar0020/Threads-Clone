
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword,sendEmailVerification,onAuthStateChanged,GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyDuMLLXueVf4QfiFPLtjOoDAD9pAGZJtsw",
    authDomain: "threads-clone-c0640.firebaseapp.com",
    projectId: "threads-clone-c0640",
    storageBucket: "threads-clone-c0640.appspot.com",
    messagingSenderId: "54023443046",
    appId: "1:54023443046:web:c7ad97ff3e61699e5893a7",
    measurementId: "G-5638RJ5BVG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);


  // alert message 
  function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
  
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = message;
  
    alertContainer.appendChild(alert);
  
    setTimeout(() => {
      alert.classList.add('hide');
      setTimeout(() => {
        alert.remove();
      }, 500);
    }, 2000);
  }

  
// Sticky alert   (help from chatgpt so that alert should be responsive)
window.addEventListener('scroll', function () {
  const alertContainer = document.getElementById('alertContainer');
  const alert = alertContainer.querySelector('.alert');
  if (alert) {
    const alertHeight = alert.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowBottom = scrollTop + windowHeight;

    if (windowBottom > alertContainer.offsetTop + alertHeight) {
      alert.classList.add('sticky');
    } else {
      alert.classList.remove('sticky');
    }
  }
});


  const signupForm = document.querySelector('form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const email = emailInput.value;
    const password = passwordInput.value;

  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

// window.location.href = 'index.html'

//  now email will ne send to user using  onAuthstatechanged 
        sendEmailVerification(userCredential.user);
        showAlert('Verification email has been sent. Please check your inbox.')
      })
      .catch((error) => {

        var errorCode = error.code;
        
        showAlert(errorCode)
      });
  });

//  email send

//   sendEmailVerification(auth.currentUser)
//   .then(() => {
//     // Email verification sent!
//     // ...
//   });




////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////

////////////////////   google login 



const provider = new GoogleAuthProvider();

 let google = document.getElementById('google');

 google.addEventListener('click', ()=>{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    window.location.href = './Threads/Threads.html';
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

})

