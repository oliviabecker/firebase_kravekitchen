// IndexedDB
const DB_NAME = 'kraveKitchenDB';
const DB_VERSION = 1;
const STORE_NAME = 'recipes';

let db;

// Open the IndexedDB database
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('title', 'title', { unique: false });
      }
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      resolve(db);
    };

    request.onerror = (e) => reject(e);
  });
}

// Add a recipe to IndexedDB
export async function addRecipe(recipe) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(recipe);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e);
  });
}

// Get a single recipe by ID
export async function getRecipe(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(Number(id));

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e);
  });
}

// Get all recipes
export async function getAllRecipes() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e);
  });
}

// Update a recipe
export async function updateRecipe(recipe) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(recipe);

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e);
  });
}

// Delete a recipe
export async function deleteRecipe(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(Number(id));

    request.onsuccess = () => resolve(request.result);
    request.onerror = (e) => reject(e);
  });
}

// Clear all recipes
export async function clearAllRecipes() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.clear();

    request.onsuccess = () => resolve(true);
    request.onerror = (e) => reject(e);
  });
}
