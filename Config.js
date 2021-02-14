import * as firebase from 'firebase'


const firebaseConfig =  {
  apiKey: "AIzaSyBOvIrhXnOyLcWRAbR62UrdjC5kFHOeHm8",
  authDomain: "shop-111.firebaseapp.com",
  databaseURL: "https://shop-111.firebaseio.com",
  projectId: "shop-111",
  storageBucket: "shop-111.appspot.com",
  messagingSenderId: "188296465674",
  appId: "1:188296465674:web:656f0ede782f8f28063ef3",
  measurementId: "G-30B9LTN5Q6"
};

 
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
