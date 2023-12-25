// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { envs } from "../plugins/envs";

const firebaseConfig = {
  apiKey: envs.FIREBASE_api_Key,
  authDomain: envs.FIREBASE_authDomain,
  projectId: envs.FIREBASE_projectId,
  storageBucket: envs.FIREBASE_storageBucket,
  messagingSenderId: envs.FIREBASE_messagingSenderId,
  appId: envs.FIREBASE_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const storageRef = ref(storage, '/article/image.jpg');

const metadata = {
  contentType: 'image/jpg',
};

const file = fs.readFileSync('./no-img.jpg');

uploadBytes(storageRef, file, metadata).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});

const downloadURL = await getDownloadURL(storageRef);

console.log(downloadURL);
