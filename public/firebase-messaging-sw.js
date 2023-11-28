importScripts("https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBWbL18cBwiRksvJKvdUIGI5t6gtWoGBLM",
  authDomain: "touchwave-9c463.firebaseapp.com",
  projectId: "touchwave-9c463",
  messagingSenderId: "360427905818",
  appId: "1:360427905818:web:3d61470a8f7893486ac2a3",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notification = payload.data;
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
