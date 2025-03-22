// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zUSflhSfV-o312NmGzMIPIVhOiWMPNQ",
  authDomain: "dolera-17463.firebaseapp.com",
  projectId: "dolera-17463",
  storageBucket: "dolera-17463.firebasestorage.app",
  messagingSenderId: "535352398372",
  appId: "1:535352398372:web:fd87c0ea46b73099607eb1",
  measurementId: "G-BRLNYJQXRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore Database

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
    document.querySelector('#profile p').innerHTML = `Hello! I'm <b>${username}</b>, Welcome to User Page!`;

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
