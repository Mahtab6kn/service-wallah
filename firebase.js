import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// const messaging = async () => {
//   const supported = await isSupported();
//   return supported ? getMessaging(app) : null;
// };

// export const fetchToken = async () => {
//   try {
//     const fcmMessaging = await messaging();
//     if (fcmMessaging) {
//       const token = await getToken(fcmMessaging, {
//         vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
//       });
//       return token;
//     }
//     return null;
//   } catch (err) {
//     console.error("An error occurred while fetching the token:", err);
//     return null;
//   }
// };

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
