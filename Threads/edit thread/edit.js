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
 
   
  postButton.addEventListener('click', ()=>{

    let inputData = {
        content: textarea.value
      };
      
console.log(inputData);
  addDoc(collection(db, "post"),inputData)
  .then(() => {

    setTimeout( alert('succecful edit the data in firebase') , 4000)
     

    window.location.href = '../Threads.html';
  })
  .catch((error) => {
    console.log(error);
  })

})


