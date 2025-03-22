// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB8zUSflhSfV-o312NmGzMIPIVhOiWMPNQ",
  authDomain: "dolera-17463.firebaseapp.com",
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

// Initialize Firestore Database
const db = getFirestore(app);

// Add event listener to the submit button
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  const email = document.getElementById("email").value.trim(); // Remove extra spaces
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("cpassword").value;

  // Validate inputs
  if (!email || !password || !confirmPassword) {
    alert("Please fill in all the required fields!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match! Please check and try again.");
    return;
  }

  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save the user's details to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email, // User's email
      uid: user.uid, // User's unique ID
      timestamp: new Date().toISOString(), // Add creation timestamp for records
    });

    alert("Account successfully created and added to the database!");
    window.location.href = "index.html"; // Redirect to another page
  } catch (error) {
    console.error("Error during user registration:", error);

    // Specific error messages
    if (error.code === "auth/weak-password") {
      alert("Password is too weak. Please use a stronger password.");
    } else if (error.code === "auth/email-already-in-use") {
      alert("This email is already registered.");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email format. Please provide a valid email address.");
    } else {
      alert("An error occurred: " + error.message);
    }
  }
});
