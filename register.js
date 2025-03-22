// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Add event listener to the submit button
document.getElementById('submit').addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Retrieve input values
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('cpassword').value.trim();

  // Validate input fields
  if (!email || !password || !confirmPassword) {
    alert("Please fill in all the required fields!");
    return;
  }
  if (password !== confirmPassword) {
    alert("Passwords do not match! Please try again.");
    return;
  }

  // Create user and store their details in Firestore
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Store user details in Firestore
    await setDoc(doc(db, "users", userId), {
      email: email,
      username: "New User" // Optional: Default username
    });

    alert("Account successfully created!");
    window.location.href = "index.html"; // Redirect to the main page or login
  } catch (error) {
    // Handle Firebase errors
    switch (error.code) {
      case 'auth/weak-password':
        alert("Password is too weak. Please use a stronger password.");
        break;
      case 'auth/email-already-in-use':
        alert("This email is already in use. Try logging in.");
        break;
      case 'auth/invalid-email':
        alert("Invalid email format. Please check your email.");
        break;
      default:
        alert("Error: " + error.message);
    }
  }
});
