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
      console.log("✅ User data retrieved:", data);

      // Update the UI only if elements exist
      updateUI(data);
    } else {
      console.warn("⚠️ No data found for this user.");
    }
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
  }
}

// Function to update UI elements
function updateUI(data) {
  const headerElement = document.querySelector("header h1");
  if (headerElement) {
    headerElement.textContent = data.username || "Unknown Username";
  }

 const profileParagraph = document.querySelector("#profile p");
if (profileParagraph) {
  profileParagraph.innerHTML = `Hello! <b>${data.username || "User"}</b>, Welcome to your User Page!`;
}

const contactLink = document.querySelector("#contact a");
if (contactLink) {
  contactLink.textContent = data.email || "Unknown Email";
  contactLink.setAttribute("href", `mailto:${data.email || ""}`);
}

const contactPhone = document.querySelector("#contact p:last-child");
if (contactPhone) {
  contactPhone.textContent = data.phoneNumber || "Unknown Phone Number";
}

}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("🔑 User signed in:", user.uid);
    fetchUserData(user.uid);
  } else {
    console.warn("⚠️ No user is signed in.");
  }
});


// Jumpscare logic
// Ensure script runs after the page loads
window.onload = function () {
    let idleTimer; // Timer variable
    let isLoggedIn = false; // Track login state

    function startIdleTimer() {
        if (!isLoggedIn) return; // Only start if user is logged in
        clearTimeout(idleTimer);
        console.log("⏳ Timer Reset (User Active)"); // Debugging log
        idleTimer = setTimeout(triggerJumpscare, getRandomTime(10000, 15000));
    }

    function triggerJumpscare() {
        if (!isLoggedIn) return; // Ensure jumpscare only happens when logged in

        const jumpscareDiv = document.getElementById("jumpscare");
        const scaryAudio = document.getElementById("scary-audio");

        if (jumpscareDiv && scaryAudio) {
            console.log("💀 Jumpscare triggered!");
            jumpscareDiv.style.display = "flex";
            scaryAudio.play();
        } else {
            console.error("⚠️ Jumpscare elements not found!");
        }
    }

    function getRandomTime(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function setupActivityListeners() {
        document.addEventListener("mousemove", startIdleTimer);
        document.addEventListener("keydown", startIdleTimer);
        document.addEventListener("scroll", startIdleTimer);
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("🔑 User signed in:", user.uid);
            isLoggedIn = true; // Mark user as logged in
            fetchUserData(user.uid);
            setupActivityListeners();
            startIdleTimer(); // Start idle timer only after login
        } else {
            console.warn("⚠️ No user is signed in.");
            isLoggedIn = false; // Reset login state
        }
    });
};


