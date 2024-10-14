importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDB6LO5AUsir9MQLnUavkhF13y_koKjGUc",
  authDomain: "service-wallah-1ed8c.firebaseapp.com",
  projectId: "service-wallah-1ed8c",
  storageBucket: "service-wallah-1ed8c.appspot.com",
  messagingSenderId: "239037401868",
  appId: "1:239037401868:web:243caa96bd6234fa5f1729",
  measurementId: "G-BJR3FR8EYE",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : null;

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
