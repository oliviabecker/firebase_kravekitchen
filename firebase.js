// firebase.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBjoB0vwxnh6XSWF45rQu62pvTbUJmS1xc",
  authDomain: "krave-kitchen.firebaseapp.com",
  projectId: "krave-kitchen",
  storageBucket: "krave-kitchen.firebasestorage.app",
  messagingSenderId: "407928359275",
  appId: "1:407928359275:web:13a38e4ad9f05f17f5642e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Get all recipes from Firestore
async function getAllRecipesOnline() {
  const snapshot = await getDocs(collection(db, "recipes"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Add a new recipe to Firestore
async function addRecipeOnline(recipe) {
  const docRef = await addDoc(collection(db, "recipes"), recipe);
  return { ...recipe, firebaseId: docRef.id };
}

// Update a recipe in Firestore
async function updateRecipeOnline(firebaseId, recipe) {
  const recipeRef = doc(db, "recipes", firebaseId);
  await updateDoc(recipeRef, recipe);
}

// Delete a recipe from Firestore
async function deleteRecipeOnline(firebaseId) {
  const recipeRef = doc(db, "recipes", firebaseId);
  await deleteDoc(recipeRef);
}

// Export everything
export {
  db,
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getAllRecipesOnline,
  addRecipeOnline,
  updateRecipeOnline,
  deleteRecipeOnline
};
