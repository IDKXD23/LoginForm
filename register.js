import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase configuration
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
const auth = getAuth(app);

// Add event listener to the submit button
document.getElementById("submit").addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default form submission

  // Retrieve input values
  const email = document.getElementById("email").value.trim();
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
    // Create a new user
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account successfully created! Please log in.");

    // Redirect to login page
    setTimeout(() => {
      window.location.href = "index.html"; // Redirects to login page
    }, 500);

  } catch (error) {
    const errorCode = error.code;
    let errorMessage = "An error occurred. Please try again.";

    switch (errorCode) {
      case "auth/weak-password":
        errorMessage = "Password is too weak. Please use a stronger password.";
        break;
      case "auth/email-already-in-use":
        errorMessage = "This email is already in use.";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email format. Please provide a valid email address.";
        break;
      default:
        errorMessage = error.message;
    }

    alert(errorMessage);
  }
});
