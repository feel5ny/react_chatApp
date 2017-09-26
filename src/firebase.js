import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyALYLV9OhCvuHDegHIfa-TkG_pV8OSLJc4",
  authDomain: "nayoung-chat.firebaseapp.com",
  databaseURL: "https://nayoung-chat.firebaseio.com",
  projectId: "nayoung-chat",
  storageBucket: "nayoung-chat.appspot.com",
  messagingSenderId: "190816095514"
};
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();


export const database = firebase.database()
export const storage = firebase.storage();
export const auth = firebase.auth();
