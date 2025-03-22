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
const auth = getAuth(app); // Ensure this line is present
// Initialize Realtime Database
const db = getDatabase(app);

// Example function to fetch user details
async function fetchUserData(userId) {
  try {
    const userRef = ref(db, `user/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("User data:", data); // Debugging purpose

      // Update HTML with fetched data
      document.querySelector("header h1").textContent = data.username || "Unknown Username";
      document.querySelector("#profile p").innerHTML = `Hello! <b>${data.username || "Unknown Username"}</b>, Welcome to your User Page!`;
      document.querySelector("#contact a").textContent = data.email || "Unknown Email";
      document.querySelector("#contact a").href = `mailto:${data.email || ""}`;
    } else {
      console.log("No data found for this user.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    fetchUserData(user.uid);
  } else {
    console.log("No user is logged in.");
  }
});
