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

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll().then((matchedClients) => {
      for (let client of matchedClients) {
        if (client.url === "/") {
          return client.focus();
        }
      }
      return clients.openWindow("/");
    })
  );
});
