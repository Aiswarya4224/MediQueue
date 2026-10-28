// firebase-config.js
// Shared Firebase init for pages that import it (patient-dashboard.html).
// Other pages keep their own inline config because they are opened directly
// and do not share a bundler.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth }      from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCc9N5SFCQdkm-WvLBBDtY5TadztcT1I6E",
  authDomain: "mediqueue-88ee8.firebaseapp.com",
  projectId: "mediqueue-88ee8",
  storageBucket: "mediqueue-88ee8.firebasestorage.app",
  messagingSenderId: "673881042044",
  appId: "1:673881042044:web:012f9cc55e2472399a6df9",
  measurementId: "G-30HED1L2WH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);