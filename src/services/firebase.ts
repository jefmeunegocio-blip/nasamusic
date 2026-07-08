import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize firestore with the custom databaseId provided in our config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
