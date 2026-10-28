
import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

console.log("MediQueue JavaScript loaded");

console.log("Firebase Authentication:", auth);
console.log("Firestore Database:", db);

// Check Firebase authentication status
onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log("User logged in:", user.uid);
    } else {
        console.log("No user logged in");
    }

});
