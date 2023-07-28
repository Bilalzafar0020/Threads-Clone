import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc,getDocs,onSnapshot,doc,updateDoc, serverTimestamp, query, orderBy,deleteDoc,getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAuth,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////        Alert    message                //////////////////////////

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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////    getting whole data from firbase   + creating dynacmmically posts               //////////////////////////



  let mainDiv = document.getElementById('mainContent');



let retrieveData = async function() {
  const querySnapshot = await getDocs(query(collection(db, 'post'), orderBy('time', 'desc'))); //  changes here

  const downloadURLPromises = querySnapshot.docs.map(async (docm) => {
    // querySnapshot.forEach((docm) => {  first this was like that but for storge we did it
    const postData = docm.data();
    const postId = docm.id;
    const userId = postData.userId;
    const username = postData.userName;
    const userProfilePic = postData.userProfilePic;

 let mainPost = document.createElement('div');
mainPost.style.width = '100%'; 
mainPost.classList.add('mainPost')

mainDiv.appendChild(mainPost)

   
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  pic area  //////////////////////////

let UserProfile = document.createElement('div');
UserProfile.classList.add('UserProfile')
mainPost.appendChild(UserProfile)


let largePic = document.createElement('div');
largePic.classList.add('largePic');
largePic.style.width = '3.5rem';
largePic.style.height = '3.5rem';
largePic.style.background = '#4c4c4c';
largePic.style.borderRadius = '50%';
UserProfile.appendChild(largePic);


let largeImg = document.createElement('img');
largeImg.style.width = '100%';
largeImg.style.height = '100%';
largeImg.style.objectFit = 'cover';
largeImg.style.borderRadius = '50%';
largeImg.id = 'largeImg';
largeImg.src = userProfilePic; 
largePic.appendChild(largeImg);



let line = document.createElement('div');
line.style.width ='1.7px';
line.style.background = '#4c4c4c';
line.style.height = '13rem';
line.style.marginTop = '10px';
line.style.marginBottom = '10px';
UserProfile.appendChild(line);

let smallPic = document.createElement('div');
smallPic.style.width = '4.5rem';
smallPic.style.height = '3rem';
smallPic.style.position = 'relative';
smallPic.style.borderRadius = '50%';


let smallPic1 = document.createElement('div');
smallPic1.style.width = '4.5rem';
smallPic.style.height = '3rem';
smallPic1.style.borderRadius = '50%';
smallPic.appendChild(smallPic1);



let div2 = document.createElement('div');
div2.style.width = '1.8rem';
div2.style.height = '70%';
div2.style.background = '#a78bfa';
div2.style.position = 'absolute';
div2.style.right = '5%';
div2.style.bottom = '40%'
div2.style.borderRadius = '50%';
smallPic1.appendChild(div2);

let div3 = document.createElement('div');
div3.style.width = '1.3rem';
div3.style.height = '50%';
div3.style.background = '#f87171';
div3.style.position = 'absolute';
div3.style.left = '15%';
div3.style.bottom = '10%'
div3.style.borderRadius = '50%';
div3.style.marginBottom = '15%'
smallPic1.appendChild(div3);




// Create three additional divs
let div1 = document.createElement('div');
div1.style.width = '1rem';
div1.style.height = '35%';
div1.style.position = 'absolute';
div1.style.bottom = '-4';
div1.style.left = '40%';
div1.style.borderRadius = '50%';
div1.style.background = '#60a5fa';
div1.style.marginTop = '40%'

smallPic1.appendChild(div1);



UserProfile.appendChild(smallPic);
// const user = auth.currentUser;

// if (user) {
//   const userId = user.uid; //  the user's UID

//   const profilePicRef = ref(storage, `profile_pictures/${userId}`);
//   const profilePicUrl =  await getDownloadURL(profilePicRef);

//   largeImg.src = profilePicUrl;
// } else {
//   console.log('User is not logged in');
// }




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  content  area  //////////////////////////


let mainContentDiv = document.createElement('div');
mainContentDiv.style.width = '100%';
mainContentDiv.classList.add('mainContentDiv');
mainPost.appendChild(mainContentDiv);


let posterDiv = document.createElement('div');
posterDiv.style.display = 'flex';
posterDiv.style.flexDirection = 'row';
posterDiv.style.justifyContent = 'space-between';
mainContentDiv.appendChild(posterDiv);




let userName = document.createElement('h1');
userName.style.color = '#f7ffff';
userName.style.fontWeight = 'lighter';
userName.style.textTransform = 'capitalize';
userName.innerHTML = `${username}<img src="../Assets/blue1.png" style="width: 20px; height: 20px;border-radius:999px ">`;
userName.classList.add('userName'); 


// const user = auth.currentUser;
    // if (user) {
    //   const profile = {
    //     displayName: user.displayName || user.providerData[0].displayName || user.email,
    //   };
    //   userName.innerHTML = `${profile.displayName}<img src="../Assets/blue1.png" style="width: 20px; height: 20px;border-radius:999px ">`;
    // }


posterDiv.appendChild(userName);



let secondposterDiv = document.createElement('div');
secondposterDiv.classList.add('secondposterDiv');
posterDiv.appendChild(secondposterDiv)


// The toDate() method is used to convert a Firestore Timestamp object to a JavaScript Date object

const postTime = postData.time.toDate(); //  postData.time is a Firestore Timestamp
const currentTime = new Date();
const timeDiff = currentTime - postTime;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// function to format the time to human readable  //////////////////////////

const formatTimeDiff = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000); // This line calculates the number of seconds by dividing the milliseconds by 1000 and rounding down using the Math.floor function.
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

// we are using Math.floor so that the unit should not be in decimal 

  if (years > 0) {
    return `${years}year${years > 1 ? 's' : ''}`;
  } else if (months > 0) {
//      return `${months} month${months > 1 ? 's' : ''} ago`;
    const currentDate = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = monthNames[currentDate.getMonth()]; //  months are zero-indexed
    return `${monthName} ${currentDate.getDate()}`; 
    
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;  // ${hours > 1 ? 'rs' : ''}
  } else if (minutes > 0) {
    return `${minutes}m `;
  } else {
    return `now`;
  }
};


let time = document.createElement('h2');
time.innerHTML = formatTimeDiff(timeDiff);
time.style.color = '#bbb7b7';
time.style.fontWeight = 'lighter';
time.id = 'time';
secondposterDiv.appendChild(time);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  the bootsrap dropdown  //////////////////////////

let dropdownContainer = document.createElement('div');
dropdownContainer.classList.add('dropdown');

let dropdownButton = document.createElement('button');
dropdownButton.classList.add('three-dots-trigger'); 
dropdownButton.setAttribute('type', 'button');
dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
dropdownButton.setAttribute('aria-expanded', 'false');
dropdownButton.style.color = 'white';
dropdownButton.innerHTML = '&#8230;'; 

dropdownContainer.appendChild(dropdownButton);



let dropdownMenu = document.createElement('ul');
dropdownMenu.classList.add('dropdown-menu');

let deleteAllButton = document.createElement('li');
deleteAllButton.classList.add('list');
let deleteAllLink = document.createElement('a');
deleteAllLink.classList.add('drop-down-options');
deleteAllLink.setAttribute('type', 'button');
deleteAllLink.innerHTML = 'Delete Post';
deleteAllButton.appendChild(deleteAllLink);
dropdownMenu.appendChild(deleteAllButton);

let icon = document.createElement('img');
icon.style.color = 'red';
icon.style.width = '20px';
icon.style.height = '15px';
icon.src = '../Assets/trash-2.svg';
deleteAllButton.appendChild(icon)



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////       Function to delete a post of the user who created it only             //////////////////////////

const deletePost = async (postId1) => {
  try {
    //  the current user
    const user = auth.currentUser;

    // Checking if the user is logged in
    if (user) {
      const postRef = doc(db, "post", postId1);
      const docSnapshot = await getDoc(postRef);   // getDoc to get the document referance

      // Checking if the post exists
      if (docSnapshot.exists()) {
        const postData = docSnapshot.data();

        //  if the current user is the owner of the post
        if (postData.userId === user.uid) {


          // Deleteing the post
          await deleteDoc(postRef);
          
          showAlert('Post deleted successfully! \u{1F600}'); // unicode corrector 

        } 
        
        else {

          showAlert('Only post owner can delete his post');
        
        }

      } 
      else {
        showAlert('Post does not exist.');
      }

    } 

    else {
      showAlert('User is not logged in')
    }


  } 
  catch (error) {

    showAlert('Error deleting post : ');

  }


};



deleteAllButton.addEventListener("click", () => {
  const postId1 = postId;


//  calling the function with the document id 
  deletePost(postId1);
});



dropdownContainer.appendChild(dropdownMenu);


secondposterDiv.appendChild(dropdownContainer);






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////  text area  //////////////////////////



let textArea = document.createElement('textarea');
textArea.innerText = postData.content;
//postData.content
textArea.style.color = '#f7ffff';
textArea.style.fontWeight = 'lighter';
textArea.style.background = '#000000';
textArea.style.border = 'none';
textArea.style.outline = 'none';
textArea.id = 'TextArea';
textArea.style.marginTop = '10px';
textArea.style.width = '100%';
textArea.readOnly = true; 
textArea.style.textTransform = 'capitalize';
textArea.style.overflowY = 'auto';
textArea.classList.add('textArea'); 
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
loveIcon.src = '../Assets/heart.svg'; 
loveIcon.style.cursor = 'pointer';
icons.appendChild(loveIcon);

// message icon
let messageIcon = document.createElement('img');
messageIcon.src = '../Assets/message-circle.svg'; 
messageIcon.style.cursor = 'pointer';
icons.appendChild(messageIcon);

//  recycle icon
let recycleIcon = document.createElement('img');
recycleIcon.src = '../Assets/refresh-cw (1).svg'; 
recycleIcon.style.cursor = 'pointer';
icons.appendChild(recycleIcon);

//  send icon
let sendIcon = document.createElement('img');
sendIcon.src = '../Assets/send.svg'; 
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

// retrieveData();

// ...
// ...



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  Firestore listener for real-time updates //////////////////////////
 
const pollsCollectionRef = collection(db, "post");
const unsubscribe = onSnapshot(pollsCollectionRef, (snapshot) => {

  mainDiv.innerHTML = '';

  retrieveData().catch((error) => {
    console.error("Error updating polls:", error);
  });
});




///////////////////////// for the responsiveness of styles which we have created dynamically on elemnets inline 

/*

(1) method
// Function to apply media query styles
function applyMediaQueryStyles() {
  if (window.innerWidth >= 328 && window.innerWidth <= 878) {
    textArea.style.letterSpacing = '1px';
    textArea.style.fontSize = '13px';
    textArea.style.lineHeight = '1.3';
    mainContentDiv.style.marginLeft = '14px';
  } else {
    // Reset styles if not within the media query range
    textArea.style.letterSpacing = '';
    textArea.style.fontSize = '';
    textArea.style.lineHeight = '';
    mainContentDiv.style.marginLeft = '';
  }
}

// Call the function when the page loads and whenever the window is resized
window.addEventListener('load', applyMediaQueryStyles);
window.addEventListener('resize', applyMediaQueryStyles);


(2)  method 

by using style which you did not want to use in media query make it dynamcially but on which you want
first make it in a css then apply media query their 

(3) Method  

 use setprperty()


*/



