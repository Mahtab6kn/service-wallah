import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

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
const messaging = getMessaging(firebaseApp);
const storage = getStorage(firebaseApp);

export { storage, firebaseApp, messaging };

//User password supabase m6&HK++tF8$dN%P
//JWT Secret supabase +zSTVLU9iChAlT0pXVSdRzZOg/jYbe0e4YIPttBl9N30ekQV3qLDOgLVMNrY+oImFtUjEigrhEYBe+k4ypLejw==
