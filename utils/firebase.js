import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

let cached = global.firebaseApp;
if (!cached) {
  cached = global.firebaseApp = connectFirebase();
}

function connectFirebase() {
  // console.log(
  //   "firebase.js: NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  //   process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  // );

  return firebase.initializeApp({
    apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: `${process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID}`,
    appId: `${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`,
    measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
  });

  // Initialize Analytics and get a reference to the service
  // const analytics = getAnalytics(firebase);

  // console.log("firebase.js: analytics", analytics);

  // return firebase;
}
