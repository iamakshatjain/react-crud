import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC9tigXuBvBROewxTt7XWMPEkcMb2z17kQ",
  authDomain: "react-crud-a8aed.firebaseapp.com",
  databaseURL: "https://react-crud-a8aed.firebaseio.com",
  projectId: "react-crud-a8aed",
  storageBucket: "react-crud-a8aed.appspot.com",
  messagingSenderId: "19120377402",
  appId: "1:19120377402:web:8be2ed66569efda2"
};

firebase.initializeApp(firebaseConfig);

export default firebase;