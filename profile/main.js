// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8zUSflhSfV-o312NmGzMIPIVhOiWMPNQ",
  authDomain: "dolera-17463.firebaseapp.com",
  databaseURL: "https://dolera-17463-default-rtdb.firebaseio.com",
  projectId: "dolera-17463",
  storageBucket: "dolera-17463.appspot.com",
  messagingSenderId: "535352398372",
  appId: "1:535352398372:web:fd87c0ea46b73099607eb1",
  measurementId: "G-BRLNYJQXRY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Realtime Database
const db = getDatabase(app);

// Function to fetch user details from Realtime Database
async function fetchUserData(userId) {
  try {
    // Reference the user's data in Realtime Database
    const userRef = ref(db, `user/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("User data retrieved:", data); // Debugging log

      // Update HTML content dynamically
      document.querySelector("header h1").textContent = data.username || "Unknown Username";
      document.querySelector("#profile p").innerHTML = `Hello! <b>${data.username || "Unknown Username"}</b>, Welcome to your User Page!`;
      document.querySelector("#contact a").textContent = data.email || "Unknown Email";
      document.querySelector("#contact a").href = `mailto:${data.email || ""}`;
      document.querySelector("#contact p:last-child").textContent = data.phoneNumber || "Unknown Phone Number";
    } else {
      console.log("No data found for this user in the database.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid; // Logged-in user's UID
    fetchUserData(userId); // Fetch user details from database
  } else {
    console.log("No user is signed in.");
  }
});
