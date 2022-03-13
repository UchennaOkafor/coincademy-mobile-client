import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, initializeAuth, getAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { firebase } from "./appsettings.json";

// Initialize Firebase
const firebaseConfig = {
	apiKey: firebase.apiKey,
	authDomain: firebase.authDomain,
	projectId: firebase.projectId,
	storageBucket: firebase.storageBucket,
	messagingSenderId: firebase.messagingSenderId,
	appId: firebase.appId,
	measurementId: firebase.measurementId,
};

let firebaseApp: FirebaseApp;
let firebaseAuth: Auth;

if (getApps().length < 1) {
	firebaseApp = initializeApp(firebaseConfig);
	firebaseAuth = initializeAuth(firebaseApp, {
		persistence: getReactNativePersistence(AsyncStorage),
	});
} else {
	firebaseApp = getApp();
	firebaseAuth = getAuth();
}

export { firebaseApp, firebaseAuth }