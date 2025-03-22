// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Firebase configuration
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

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Function to fetch user details
async function fetchUserData(userId) {
  try {
    if (!userId) {
      console.error("Invalid user ID.");
      return;
    }

    // Reference user's data in the database
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("User data retrieved:", data);

      // Update the UI only if elements exist
      document.querySelector("header h1")?.textContent = data.username || "Unknown Username";
      document.querySelector("#profile p")?.innerHTML = `Hello! <b>${data.username || "User"}</b>, Welcome to your User Page!`;
      document.querySelector("#contact a")?.textContent = data.email || "Unknown Email";
      document.querySelector("#contact a")?.setAttribute("href", `mailto:${data.email || ""}`);
      document.querySelector("#contact p:last-child")?.textContent = data.phoneNumber || "Unknown Phone Number";
    } else {
      console.warn("No data found for this user.");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user.uid);
    fetchUserData(user.uid);
  } else {
    console.warn("No user is signed in.");
  }
});
