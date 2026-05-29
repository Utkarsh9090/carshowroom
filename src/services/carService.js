import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { cars as defaultCars } from "../data/cars";

const COLLECTION_NAME = "cars";

export const getCars = async (filters = {}) => {
  let fetchedCars = [];
  try {
    let carsRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(carsRef);
    
    querySnapshot.forEach((doc) => {
      fetchedCars.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching cars from Firestore:", error);
  }

  // Ensure default cars are present if they haven't been added to Firestore
  const existingModels = new Set(fetchedCars.map(c => c.model));
  const missingDefaultCars = defaultCars.filter(dc => !existingModels.has(dc.model));
  
  let allCars = [...fetchedCars, ...missingDefaultCars];
  
  // Apply brand filter if requested
  if (filters.brand) {
    allCars = allCars.filter(c => c.brand.toLowerCase() === filters.brand.toLowerCase());
  }
  
  return allCars;
};

export const getCarById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
  } catch (error) {
    console.error("Error fetching car from Firestore:", error);
  }

  // Fallback to static cars
  const staticCar = defaultCars.find(c => c.id === id);
  if (staticCar) return staticCar;

  console.log("No such document!");
  return null;
};

export const getFeaturedCars = async () => {
  const cars = await getCars();
  return cars.slice(0, 3);
};

export const addCar = async (carData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...carData,
      popularity: 50 // default popularity for new cars
    });
    return { id: docRef.id, ...carData };
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

export const updateCar = async (id, carData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, carData);
    return { id, ...carData };
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return true;
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};
