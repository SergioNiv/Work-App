import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCqIQoNEHPDTYnnUaSCMWwF03gkB274q4I',
	authDomain: 'react-app-7a7a9.firebaseapp.com',
	projectId: 'react-app-7a7a9',
	storageBucket: 'react-app-7a7a9.appspot.com',
	messagingSenderId: '353625894211',
	appId: '1:353625894211:web:e537b7f397a3c1c92113f6',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
