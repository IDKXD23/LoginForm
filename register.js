// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

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

  // Validate if all fields are filled
  if (!email || !password) {
    alert("Please fill in all the required fields!");
    return; // Stop further execution
  }

  // Create a new user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successfully created a new user
      const user = userCredential.user;
      alert("Account successfully created!");
      window.location.href = "main.html";
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
     

      // Provide specific error alerts
      switch (errorCode) {
        case 'auth/weak-password':
          alert("Password is too weak. Please use a stronger password.");
          break;
        case 'auth/email-already-in-use':
          alert("This email is already associated with an account.");
          break;
        case 'auth/invalid-email':
          alert("Invalid email format. Please provide a valid email address.");
          break;
        default:
          alert("Error: " + errorMessage);
      }
    });
});
