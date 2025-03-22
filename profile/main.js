import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB8zUSflhSfV-o312NmGzMIPIVhOiWMPNQ",
  authDomain: "dolera-17463.firebaseapp.com",
  projectId: "dolera-17463",
  storageBucket: "dolera-17463.appspot.com",
  messagingSenderId: "535352398372",
  appId: "1:535352398372:web:fd87c0ea46b73099607eb1",
  measurementId: "G-BRLNYJQXRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app);

// Function to fetch user details from Firestore
async function fetchUserDetails(userId) {
  const docRef = doc(db, "users", userId); // Replace "users" with your collection name
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data(); // Retrieve all user data
    const username = data.username; // Adjust field name for username
    const email = data.email; // Adjust field name for email

    // Update username in the HTML
    document.querySelector('header h1').textContent = username;
    document.querySelector('#profile p').innerHTML = `Hello! I'm <b>${username}</b>, a humble student with a passion for gaming and the thrill of racing.`;

    // Update email in the contact section
    document.querySelector('#contact a').textContent = email;
    document.querySelector('#contact a').href = `mailto:${email}`;
  } else {
    console.log("No such document!");
  }
}

// Monitor authentication state and fetch user details
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid; // Get the logged-in user's ID
    fetchUserDetails(userId); // Fetch both username and email
  } else {
    console.log("User is not signed in");
  }
});
