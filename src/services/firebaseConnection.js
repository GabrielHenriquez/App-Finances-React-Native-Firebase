import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

let firebaseConfig = {
    apiKey: "AIzaSyAElduihvT3R7eFyjsOQHCbllNii58MUw8",
    authDomain: "finances-57814.firebaseapp.com",
    databaseURL: "https://finances-57814-default-rtdb.firebaseio.com",
    projectId: "finances-57814",
    storageBucket: "finances-57814.appspot.com",
    messagingSenderId: "366241606598",
    appId: "1:366241606598:web:1d160ed2628da44d85e0c7"
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
  }

  export default firebase;