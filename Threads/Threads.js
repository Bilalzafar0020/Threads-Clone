import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,onSnapshot,doc,updateDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth,signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

  
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
  const storage = getStorage(app);


  let mainDiv = document.getElementById('mainContent');



let retrieveData = async function() {
  const querySnapshot = await getDocs(query(collection(db, 'post'), orderBy('time', 'desc'))); //  changes here

  const downloadURLPromises = querySnapshot.docs.map(async (docm) => {
    // querySnapshot.forEach((docm) => {  first this was like that but for storge we did it
    const postData = docm.data();
    const postId = docm.id;


 let mainPost = document.createElement('div');
mainPost.style.width = '100%'; //90%
mainPost.classList.add('mainPost')

mainDiv.appendChild(mainPost)

// pics area
let UserProfile = document.createElement('div');
UserProfile.classList.add('UserProfile')
mainPost.appendChild(UserProfile)


let largePic = document.createElement('div');
largePic.classList.add('largePic');
largePic.style.width = '3.5rem';
largePic.style.height = '3.5rem';
largePic.style.background = '#4c4c4c';
largePic.style.borderRadius = '50%';
// largePic.style.overflow = 'hidden';
UserProfile.appendChild(largePic);


let largeImg = document.createElement('img');
// largeImg.src = '../../Assets/IMG-20210924-WA0002.jpg';
largeImg.style.width = '100%';
largeImg.style.height = '100%';
largeImg.style.objectFit = 'cover';
largeImg.style.borderRadius = '50%';
largeImg.id = 'largeImg';
largePic.appendChild(largeImg);


const user = auth.currentUser;

if (user) {
  const userId = user.uid; //  the user's UID

  const profilePicRef = ref(storage, `profile_pictures/${userId}`);
  const profilePicUrl =  await getDownloadURL(profilePicRef);

  largeImg.src = profilePicUrl;
} else {
  console.log('User is not logged in');
}



let line = document.createElement('div');
line.style.width ='1.7px';
line.style.background = '#4c4c4c';
line.style.height = '13rem';
line.style.marginTop = '10px';
line.style.marginBottom = '10px';
UserProfile.appendChild(line);

let smallPic = document.createElement('div');
smallPic.style.width = '2rem';
smallPic.style.height = '2rem';
smallPic.style.background  = '#4c4c4c';
smallPic.style.borderRadius = '50%';
UserProfile.appendChild(smallPic);


let smallImg = document.createElement('img');
smallImg.src = '';
smallImg.style.width = '100%';
smallImg.style.height = '100%';
smallImg.style.objectFit = 'cover';
smallImg.style.borderRadius = '50%';
smallImg.id = 'smallImg';
smallPic.appendChild(smallImg);


// content area

let mainContentDiv = document.createElement('div');
mainContentDiv.style.marginLeft ='20px';
mainContentDiv.style.width = '100%';
mainPost.appendChild(mainContentDiv);


let posterDiv = document.createElement('div');
posterDiv.style.display = 'flex';
posterDiv.style.flexDirection = 'row';
posterDiv.style.justifyContent = 'space-between';
mainContentDiv.appendChild(posterDiv);




let userName = document.createElement('h1');
userName.innerHTML = `Bilal Zafar <img src="../../Assets/blue1.png" style="width: 20px; height: 20px;border-radius:999px ">`;
userName.style.letterSpacing = '1px';
userName.style.fontSize = '23px';
userName.style.color = '#f7ffff';
userName.style.fontWeight = 'lighter';
userName.style.textTransform = 'capitalize';
userName.id = 'userName'
posterDiv.appendChild(userName);



let time = document.createElement('h2');
time.innerHTML = '3m';
time.style.color = '#bbb7b7';
time.style.fontWeight = 'lighter';
time.style.textTransform = 'capitalize';
time.id = 'time';
time.style.fontSize = '20px';
posterDiv.appendChild(time);



let textArea = document.createElement('textarea');
textArea.innerText = postData.content;
//postData.content
textArea.style.letterSpacing = '1.5px';
textArea.style.fontSize = '16px';
textArea.style.color = '#f7ffff';
textArea.style.fontWeight = 'lighter';
textArea.style.lineHeight = '1.5';
textArea.style.background = '#000000';
textArea.style.border = 'none';
textArea.style.outline = 'none';
textArea.id = 'TextArea';
textArea.style.marginTop = '10px';
textArea.style.width = '100%';
textArea.style.height = '67%';
textArea.readOnly = true; 
textArea.style.textTransform = 'capitalize';
mainContentDiv.appendChild(textArea)


let icons = document.createElement('div');
icons.style.display = 'flex';
icons.style.flexDirection = 'row';
icons.style.justifyContent = 'space-between';
icons.style.alignItems = 'center';
icons.style.width = '8rem';
icons.style.height = '20px';


//  love icon
let loveIcon = document.createElement('img');
loveIcon.src = '../../Assets/heart.svg'; 
loveIcon.style.cursor = 'pointer';
icons.appendChild(loveIcon);

// message icon
let messageIcon = document.createElement('img');
messageIcon.src = '../../Assets/message-circle.svg'; 
messageIcon.style.cursor = 'pointer';
icons.appendChild(messageIcon);

//  recycle icon
let recycleIcon = document.createElement('img');
recycleIcon.src = '../../Assets/refresh-cw (1).svg'; 
recycleIcon.style.cursor = 'pointer';
icons.appendChild(recycleIcon);

//  send icon
let sendIcon = document.createElement('img');
sendIcon.src = '../../Assets/send.svg'; 
sendIcon.style.cursor = 'pointer';
icons.appendChild(sendIcon);



mainContentDiv.appendChild(icons)

return mainPost;  // for storage


  });

  const mainPosts = await Promise.all(downloadURLPromises); // for  storage

  mainPosts.forEach((mainPost) => {  // for  storage
    mainDiv.appendChild(mainPost); // for  storage
  });


  }

retrieveData();




//  Firestore listener for real-time updates
const pollsCollectionRef = collection(db, "post");
const unsubscribe = onSnapshot(pollsCollectionRef, (snapshot) => {

  mainDiv.innerHTML = '';

  retrieveData().catch((error) => {
    console.error("Error updating polls:", error);
  });
});






