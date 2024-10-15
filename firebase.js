import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDB6LO5AUsir9MQLnUavkhF13y_koKjGUc",
  authDomain: "service-wallah-1ed8c.firebaseapp.com",
  projectId: "service-wallah-1ed8c",
  storageBucket: "service-wallah-1ed8c.appspot.com",
  messagingSenderId: "239037401868",
  appId: "1:239037401868:web:243caa96bd6234fa5f1729",
  measurementId: "G-BJR3FR8EYE",
};

const firebaseApp = initializeApp(firebaseConfig);
let messaging;
// const messaging = getMessaging(firebaseApp);
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  // This code will only run on the client-side
  messaging = getMessaging(firebaseApp);

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // Handle the message as needed
  });
} else {
  console.log(
    "Firebase Messaging is not supported in the current environment."
  );
}
const storage = getStorage(firebaseApp);

export { storage, firebaseApp, messaging };

//User password supabase m6&HK++tF8$dN%P
//JWT Secret supabase +zSTVLU9iChAlT0pXVSdRzZOg/jYbe0e4YIPttBl9N30ekQV3qLDOgLVMNrY+oImFtUjEigrhEYBe+k4ypLejw==
