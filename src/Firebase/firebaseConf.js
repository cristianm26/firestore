import firebase from 'firebase/app';
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyAdCVTfgFgtsMvD-NEmRb-zLNko2csmr1E",
    authDomain: "pruebasreact-6c5cf.firebaseapp.com",
    projectId: "pruebasreact-6c5cf",
    storageBucket: "pruebasreact-6c5cf.appspot.com",
    messagingSenderId: "277463668271",
    appId: "1:277463668271:web:e27468d2ab15d203d4d8da"
};
// Initialize Firebase
const fireb = firebase.initializeApp(firebaseConfig);
const store = fireb.firestore();

export { store }