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
document.getElementById('name').textContent = name;
document.getElementById('smallname').textContent = name;



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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  if user logout than what to do  //////////////////////////


auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('logo').style.display = 'flex';
  } else {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('logo').style.display = 'none';
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  profile edit  //////////////////////////


let edit = document.getElementById('edit');

edit.addEventListener('click', ()=>{

  Swal.fire({
    title: 'Edit Profile',
    html: 
'<input id="swal-input1" class="swal2-input" style="width: 400px;" maxLength = 50; placeholder="Enter your bio e:g Web develpoer etc" ;>' +
      '<input id="swal-input2" class="swal2-input" placeholder="Enter your social media link " maxLength = 40;>' +
      '<input id="swal-input3" class="swal2-input" placeholder="Enter your social media link" maxLength = 40;>' +
      '<input id="swal-input4" class="swal2-input" placeholder="Enter your social media link" maxLength = 40;>' ,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#2ded27",
      confirmButtonText: "Done",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const label = document.getElementById('swal-input1').value;
        const option1 = document.getElementById('swal-input2').value;
        const option2 = document.getElementById('swal-input3').value;
        const option3 = document.getElementById('swal-input4').value;
    
        if (!label || !option1 || !option2 || !option3 ) {
          Swal.showValidationMessage('Please fill in all the fields');
          return false;
        }

let profileData = {
  bio: label,
  linkOne : option1,
  linktwo : option2,
  linkthree : option3,
}

localStorage.setItem('Editprofile', JSON.stringify(profileData));


        //  this is Updating the UI immediately after saving to local storage
        retriveFromlocalstorage();

      }
      
    })

});

let retriveFromlocalstorage = function(){
let getData = JSON.parse(localStorage.getItem('Editprofile'));

if (!getData || typeof getData.bio !== 'string' || typeof getData.linkOne !== 'string' || typeof getData.linktwo !== 'string' || typeof getData.linkthree !== 'string') {
  
  getData = {
    bio: ' Web Developer / Data Analyst / freelancer / Ai enginner',
    linkOne: 'https://github.com/Bilalzafar0020',
    linktwo: 'https://github.com/Bilalzafar0020',
    linkthree: 'https://github.com/Bilalzafar0020',
  };
}


let bio = getData.bio;
let linkfirst = getData.linkOne;
let linksecond = getData.linktwo;
let linkthird = getData.linkthree;



document.getElementById('bio').textContent = bio;

document.getElementById('link1').textContent = linkfirst;
document.getElementById('link2').textContent = linksecond;
document.getElementById('link3').textContent = linkthird;

};

// so that every time call when page refresh/Domcontentloaded
retriveFromlocalstorage()



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  links redirection which they type   //////////////////////////

// Function to handle the click event
function handleLinkClick(linkId) {
  
  const linkElement = document.getElementById(linkId);
  const linkText = linkElement.textContent.trim();
  const fullLink =  linkText;

  window.location.href = fullLink;
}



document.getElementById('link1').addEventListener('click', ()=>{
  handleLinkClick('link1');
})



document.getElementById('link2').addEventListener('click', ()=>{
  handleLinkClick('link2');
})

document.getElementById('link3').addEventListener('click', ()=>{
  handleLinkClick('link3');
})