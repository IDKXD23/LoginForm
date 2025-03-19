// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyB8zUSflhSfV-o312NmGzMIPIVhOiWMPNQ",
  authDomain: "dolera-17463.firebaseapp.com",
  projectId: "dolera-17463",
  storageBucket: "dolera-17463.appspot.com", // Corrected storageBucket URL format
  messagingSenderId: "535352398372",
  appId: "1:535352398372:web:fd87c0ea46b73099607eb1",
  measurementId: "G-BRLNYJQXRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Add event listener to the submit button
const submitButton = document.getElementById('submit');
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  const email = document.getElementById('email').value.trim(); // Remove extra spaces
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Please fill in both email and password!");
    return; // Stop further execution if fields are empty
  }

  // Sign in the user with email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Logging in successfully!");
      window.location.href = "main.html"; // Redirect to main.html
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle errors
      switch (errorCode) {
        case 'auth/user-not-found':
          alert("No user found with this email. Please sign up first.");
          break;
        case 'auth/wrong-password':
          alert("Incorrect password. Please try again.");
          break;
        case 'auth/invalid-email':
          alert("The email address is not valid. Please provide a valid email.");
          break;
        default:
          alert("Error: " + errorMessage);
      }
    });
});
