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
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Sign in the user with email and password
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    alert("Logging in");
    window.location.href = "main.html";
  })
  .catch((error) => {
    const errorCode = error.code;

    switch (errorCode) {
      case 'auth/user-not-found':
        alert("No user found with this email. Please sign up first.");
        break;
      case 'auth/invalid-credential':
        alert("There is an issue with the provided credentials.");
        break;
      case 'auth/wrong-password':
        alert("Incorrect password. Please try again.");
        break;
      default:
        alert("Error: " + error.message);
    }
  });

});
