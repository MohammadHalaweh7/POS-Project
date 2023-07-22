// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCvdLbfdvFU_PqP4eo3oFhi6BBh9mScKdI",
  authDomain: "pos-uploadingfile.firebaseapp.com",
  projectId: "pos-uploadingfile",
  storageBucket: "pos-uploadingfile.appspot.com",
  messagingSenderId: "431221082519",
  appId: "1:431221082519:web:c8b645d72ef15a85345cd2"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
