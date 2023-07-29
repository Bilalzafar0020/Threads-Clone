import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,onSnapshot,doc,updateDoc, serverTimestamp, query, orderBy,getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth,signOut,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

  
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
  const db = getFirestore(app);

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

// Sticky alert   
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
  

  let textarea = document.getElementById('textarea');

  let postButton = document.getElementById('post');

     let placeholder = document.getElementById('StartH2');

  const maxCharacters = 350;  // 415 
  
  textarea.addEventListener('input', () => {
    //  for text lenght
    if (textarea.value.length > maxCharacters) {
      textarea.value = textarea.value.substring(0, maxCharacters); 
    }

    //  for button color
    if (textarea.value.trim() !== '') {  // trim remove whitespaces from value of textarea if than it is not equal to empty valus than this color is user rgb(0,0,255);
      postButton.style.color = 'rgb(0, 0, 255)';
    } else {
      postButton.style.color = '#284e73';
    }

// for placeholder
  placeholder.innerText = '';
textarea.style.lineHeight = '1.7'
  });


  postButton.addEventListener('click', ()=>{

   let user = auth.currentUser;

if(user) {

  if(textarea.value.trim() === '' ){
    showAlert('Please enter some content to post');
    return // it will not play the function anymore i mean add data to database
  }

  let defaultProfilePic = 'https://imgur.com/WCazB4L'; 

    let inputData = {
        content: textarea.value,
         time: serverTimestamp(),
         userId: user.uid, //  the user's UID along with the post data
         userName: user.displayName || user.providerData[0].displayName || user.email,
         userProfilePic: user.photoURL || defaultProfilePic,
      };

  addDoc(collection(db, "post"),inputData)
  .then(() => {

    showAlert('Posting...');
  
    setTimeout(() => {
      showAlert('Posted');
      setTimeout(() => {
        window.location.href = '../Threads.html';
      }, 1000); // for alert
    }, 1000);  // for redirection

  })
  .catch((error) => {

    setTimeout( showAlert(`You have'nt log-in/log-out yourself from this app.please login again to add post`)
    , 9000);

  })
}

else{
    showAlert('You need to be login to post');
}



})


// Retrieving the data from  local storage
var profilePictureURL = JSON.parse(localStorage.getItem('userProfile')); //geting the key 

let profilePicture = profilePictureURL.photoURL // value in a key 
let name = profilePictureURL.displayName // value 

document.getElementById('largeImage').src = profilePicture;

document.getElementById('UserName').innerHTML = name;

document.getElementById('smallimage').src = profilePicture;


// Function to update the user's profile and name in the HTML elements
// function updateProfileUI(user) {
//   const userRef = doc(collection(db, "post"), user.uid);

//   getDoc(userRef)
//     .then((doc) => {
//       if (doc.exists()) {
//         const userData = doc.data();
//         const profilePicture = userData.userName;
//         const name = userData.userProfilePic;
    
//         document.getElementById('largeImage').src = profilePicture;
//         document.getElementById('UserName').innerHTML = name;
//         document.getElementById('smallimage').src = profilePicture;
//       } else {
//         console.log("User data not found!");
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching user data:", error);
//     });
// }

// // Listen for changes in the user's authentication state
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is logged in, update the UI with user data
//     updateProfileUI(user);
//   } else {
//     // User is logged out, handle accordingly (e.g., show login page, redirect, etc.)
//   }
// });

// ...


// Hi my name is Bilal zafar. I am a student of saylani mass it traning programm. where i have learhtml,css,bootstarp,tailwind ,
// javascript , Es6 , Firebase ( database,
// hosting,storage and autentiation) . Also
// I have learnt back end programming having 
// Express.js and node.js and now learning 
// MongoDb database 