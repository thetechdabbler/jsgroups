import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyADptYJUGdKlG0vp1NrXXrAHFaG9OQrvsw",
    authDomain: "react-burger-app-ffa49.firebaseapp.com",
    databaseURL: "https://react-burger-app-ffa49.firebaseio.com",
    projectId: "react-burger-app-ffa49",
    storageBucket: "react-burger-app-ffa49.appspot.com",
    messagingSenderId: "350751245718",
    appId: "1:350751245718:web:672950f4349ccd74d489b7",
    measurementId: "G-Q14B8KKR6T"
  };
firebase.initializeApp(firebaseConfig);
export default firebase;