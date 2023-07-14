import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,onSnapshot,doc,updateDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth,signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

  
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


  let textarea = document.getElementById('textarea');

  let postButton = document.getElementById('post');

     let placeholder = document.getElementById('StartH2');

  const maxCharacters = 385;  // 415 
  
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

    let inputData = {
        content: textarea.value,
         time: serverTimestamp()
      };

  addDoc(collection(db, "post"),inputData)
  .then(() => {

    setTimeout( alert('succecful edit the data in firebase') , 4000)
     

    window.location.href = '../Threads.html';
  })
  .catch((error) => {
    console.log(error);
  })

})


// Retrieving the data from  local storage
var profilePictureURL = JSON.parse(localStorage.getItem('userProfile')); //geting the key 

let profilePicture = profilePictureURL.photoURL // value in a key 
let name = profilePictureURL.displayName // value 

document.getElementById('largeImage').src = profilePicture;

document.getElementById('UserName').innerHTML = name;

document.getElementById('smallimage').src = profilePicture;


