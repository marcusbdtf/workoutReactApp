import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBND1kKh8nwse08Z7KATCbMTqJwef03ySM',
  authDomain: "workoutlog-947f7.firebaseapp.com",
  projectId: "workoutlog-947f7",
  storageBucket: "workoutlog-947f7.appspot.com",
  messagingSenderId: "359166816090",
  appId: "1:359166816090:web:c953708362e6b592a78d63"
};

const defaultProject = initializeApp(firebaseConfig);

const db = getFirestore(defaultProject);

export { db };
