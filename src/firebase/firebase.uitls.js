import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkdPLEHuBIi3MYDxFd4xnprFh9670Kj_Q",
  authDomain: "notes-e6407.firebaseapp.com",
  projectId: "notes-e6407",
  storageBucket: "notes-e6407.appspot.com",
  messagingSenderId: "297173523784",
  appId: "1:297173523784:web:5a23d523bff8b8c104677d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const addDocument = async (note, collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, note);
    await setDoc(
      doc(db, collectionName, docRef.id),
      { id: docRef.id },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
  }
};

export const getFromFirestore = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs;
  } catch (error) {
    console.error(error);
  }
};

export const updateDocument = async (note, id) => {
  try {
    await setDoc(doc(db, "Notes", id), note);
  } catch (error) {
    console.error(error);
  }
};

export const deletDocument = async (id, collectionName) => {
  try {
    await deleteDoc(doc(db, "Notes", id));
  } catch (error) {
    console.error(error);
  }
};

// import { Data } from "../pages/dashboard/dumydata";
// export const addToFirestore = () => {
//   try {
//     const notesCollection = collection(db, "Notes");
//     Data.map(async (note) => {
//       const docRef = await addDoc(notesCollection, note);
//       await setDoc(
//         doc(db, "Notes", docRef.id),
//         { id: docRef.id },
//         { merge: true }
//       );
//       console.log(docRef.id);
//     });
//     console.log("successs");
//   } catch (error) {
//     console.error(error);
//   }
// };
