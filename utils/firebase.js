// import * as firebase from "firebase";
import firebase from "firebase/app";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/firestore";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCjze4IehE7lRzPjGWiMdjPYNRgUICulPg",
	authDomain: "signalish-clone.firebaseapp.com",
	projectId: "signalish-clone",
	storageBucket: "signalish-clone.appspot.com",
	messagingSenderId: "549884888076",
	appId: "1:549884888076:web:f1e4e9aea461fb86501a29",
	measurementId: "G-HH88MVGQ59",
};

let app;
if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
