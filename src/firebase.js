import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAngNAc_yuctPiIN3YuTEYAVrYKx2rhMgI',
  authDomain: 'todoapp-78787.firebaseapp.com',
  projectId: 'todoapp-78787',
  storageBucket: 'todoapp-78787.appspot.com',
  messagingSenderId: '748437696829',
  appId: '1:748437696829:web:bd6e992510633a6cbb9554',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
