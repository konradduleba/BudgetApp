import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBhIqmB__r5b040HwihCiGLNCF48GU9bVY",
    authDomain: "budget-app-62a0d.firebaseapp.com",
    databaseURL: "https://budget-app-62a0d.firebaseio.com",
    projectId: "budget-app-62a0d",
    storageBucket: "budget-app-62a0d.appspot.com",
    messagingSenderId: "926025550868",
    appId: "1:926025550868:web:997267f1206d261aa72b01",
    measurementId: "G-Q2YRBJQLPN"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();