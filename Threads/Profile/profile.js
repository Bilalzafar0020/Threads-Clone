import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

  
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
function showAlert(message) {
  const alertContainer = document.getElementById('alertContainer');

  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.textContent = message;

  alertContainer.appendChild(alert);

  setTimeout(() => {
    alert.remove();
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////    for pic and names    //////////////////////////
 
// Retrieving the data from local storage
var profilePictureURL = JSON.parse(localStorage.getItem('userProfile')); //getting the key 

let profilePicture;
let name;

if (profilePictureURL) {
 
  profilePicture = profilePictureURL.photoURL;
} else {
  
  profilePicture = '../../Assets/3d-render-cartoon-avatar-isolated_570939-71.jpg';
}

if ( profilePictureURL.displayName) {

  name = profilePictureURL.displayName;
} else {
 
  name = profilePictureURL.email;
}

document.getElementById('profileimg').src = profilePicture;
document.getElementById('name').innerHTML = name;
document.getElementById('smallname').innerHTML = name;



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  logout   //////////////////////////


let logout = document.getElementById('logout');

logout.addEventListener('click', ()=>{
  signOut(auth)
  .then(() => {
showAlert('Log outing you please wait....')


const alertContainer = document.getElementById('alertContainer');

setTimeout( ()=>{ alertContainer.style.display  = 'none' },9000);

   setTimeout( ()=>{  window.location.href = '../../index.html' } ,2000 );

  })
  .catch((error) => {
    showAlert(error);
  });
  


})



