import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVX-vuHNcn4USCQoB2uCwomnFdBUUzD7Q",
  authDomain: "collage-booking-app.firebaseapp.com",
  projectId: "collage-booking-app",
  storageBucket: "collage-booking-app.firebasestorage.app",
  messagingSenderId: "1068957067915",
  appId: "1:1068957067915:web:72605ebbf44be3de5d428e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
