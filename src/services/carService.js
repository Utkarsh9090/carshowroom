import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "cars";

const mahindraCars = [
  { 
    id: 'm1', brand: 'Mahindra', model: 'XUV700', year: 2024, price: 2500000, category: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', mileage: '16.5 kmpl', power: '197 bhp', 
    image: '/assets/mahindra/mahindra_xuv700_1779912000774.png', images: ['/assets/mahindra/mahindra_xuv700_1779912000774.png'], 
    features: ['AdrenoX Connect', 'ADAS Level 2', 'Panoramic Sunroof', 'Dual 10.25" Screens'], 
    description: 'The Mahindra XUV700 is a premium SUV that brings world-class technology, exhilarating performance, and unmissable presence.', 
    popularity: 90, variants: ['MX', 'AX3', 'AX5', 'AX7', 'AX7L'],
    tagline: 'The Rush Like Never Before',
    sections: [
      { id: 'design', title: 'Unmissable Presence', content: 'Commanding front grille, striking LED DRLs, and flush door handles create an aura of sophistication and dominance on every road.', image: '/assets/mahindra/suv_design.png' },
      { id: 'performance', title: 'Exhilarating Performance', content: 'Powered by the mighty mStallion petrol and mHawk diesel engines, delivering class-leading power and torque for a thrilling drive.', image: '/assets/mahindra/suv_engine.png' },
      { id: 'technology', title: 'Sci-Fi Technology', content: 'Featuring AdrenoX with 70+ connected car features, a continuous dual 10.25" screen setup, and immersive 3D audio by Sony.', image: '/assets/mahindra/suv_interior.png' },
      { id: 'safety', title: 'Uncompromised Safety', content: 'Equipped with Advanced Driver Assistance Systems (ADAS) Level 2, 7 airbags, and a 5-star Global NCAP safety rating.', image: '/assets/mahindra/suv_interior.png' }
    ]
  },
  { 
    id: 'm2', brand: 'Mahindra', model: 'Scorpio N', year: 2024, price: 2200000, category: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', mileage: '15 kmpl', power: '172 bhp', 
    image: '/assets/mahindra/mahindra_scorpio_n_1779912016517.png', images: ['/assets/mahindra/mahindra_scorpio_n_1779912016517.png'], 
    features: ['4Xplor Terrain Mode', 'Sony 3D Audio', 'AdrenoX', 'Command Seating'], 
    description: 'The All-New Scorpio-N makes every drive an experience with its unmissable design, thrilling performance and advanced technology.', 
    popularity: 88, variants: ['Z2', 'Z4', 'Z6', 'Z8', 'Z8L'],
    tagline: 'The Big Daddy of SUVs',
    sections: [
      { id: 'design', title: 'Commanding Design', content: 'Built to dominate. The Scorpio-N sports an imposing front fascia, signature dual-barrel headlamps, and a tall, wide stance.', image: '/assets/mahindra/suv_design.png' },
      { id: 'performance', title: 'Unmatched Capability', content: 'Built on a 3rd-gen body-on-frame platform, with the intelligent 4XPLOR terrain management system to conquer any terrain.', image: '/assets/mahindra/suv_engine.png' },
      { id: 'technology', title: 'Intelligent Connectivity', content: 'Experience the highly advanced AdrenoX system, featuring Alexa integration, navigation, and seamless smartphone connectivity.', image: '/assets/mahindra/suv_interior.png' },
      { id: 'comfort', title: 'Premium Comfort', content: 'Rich coffee-black leatherette interiors, contoured seating, and immense cabin space offer a first-class experience.', image: '/assets/mahindra/suv_interior.png' }
    ]
  },
  { 
    id: 'm3', brand: 'Mahindra', model: 'XUV 3XO', year: 2024, price: 1300000, category: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', mileage: '18.8 kmpl', power: '128 bhp', 
    image: '/assets/mahindra/mahindra_xuv3xo_1779912031737.png', images: ['/assets/mahindra/mahindra_xuv3xo_1779912031737.png'], 
    features: ['Skyroof', 'Level 2 ADAS', 'Harman Kardon Audio', 'Electronic Parking Brake'], 
    description: 'The new XUV 3XO redefines the compact SUV segment with standout design, segment-first features, and exhilarating performance.', 
    popularity: 85, variants: ['MX1', 'MX2', 'AX5', 'AX7'],
    tagline: 'Everything You Want, and More.',
    sections: [
      { id: 'design', title: 'Standout Aesthetics', content: 'A striking new design language with bold LED lighting, aerodynamic lines, and a futuristic cabin layout.', image: '/assets/mahindra/suv_design.png' },
      { id: 'technology', title: 'Segment First Tech', content: 'Equipped with the largest-in-class Skyroof, Level 2 ADAS, and a premium Harman Kardon audio system.', image: '/assets/mahindra/suv_interior.png' },
      { id: 'performance', title: 'Thrilling Dynamics', content: 'Experience turbocharged performance with dynamic drive modes and precision handling that makes city driving a breeze.', image: '/assets/mahindra/suv_engine.png' }
    ]
  },
  { 
    id: 'm4', brand: 'Mahindra', model: 'Thar', year: 2024, price: 1800000, category: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', mileage: '15.2 kmpl', power: '130 bhp', 
    image: '/assets/mahindra/mahindra_thar_3door_1779912050122.png', images: ['/assets/mahindra/mahindra_thar_3door_1779912050122.png'], 
    features: ['4x4 with Low Range', 'Removable Roof', 'Washable Interior', 'Touchscreen Infotainment'], 
    description: 'The iconic Mahindra Thar is built to explore the impossible. Go anywhere, do anything with legendary 4x4 capability.', 
    popularity: 95, variants: ['AX Optional', 'LX'],
    tagline: 'Explore the Impossible',
    sections: [
      { id: 'capability', title: 'Legendary 4x4', content: 'Equipped with a shift-on-the-fly 4x4 manual transfer case, mechanical locking differential, and impressive approach/departure angles.', image: '/assets/mahindra/suv_engine.png' },
      { id: 'design', title: 'Iconic Silhouette', content: 'The unmistakable profile that turns heads everywhere. Available with hard top, soft top, or convertible roof options.', image: '/assets/mahindra/suv_design.png' },
      { id: 'interior', title: 'Built for the Wild', content: 'Washable interior floors with drain plugs, drizzle resistant switches, and a rugged yet comfortable cabin designed for adventure.', image: '/assets/mahindra/suv_interior.png' }
    ]
  },
  { 
    id: 'm5', brand: 'Mahindra', model: 'Thar Roxx', year: 2024, price: 2100000, category: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', mileage: '14.5 kmpl', power: '172 bhp', 
    image: '/assets/mahindra/mahindra_thar_roxx_1779912070874.png', images: ['/assets/mahindra/mahindra_thar_roxx_1779912070874.png'], 
    features: ['5-Door Practicality', 'Panoramic Sunroof', 'Level 2 ADAS', 'Ventilated Seats'], 
    description: 'The Thar Roxx is the SUV you need for every adventure, combining the legendary Thar off-road capability with premium comfort and technology.', 
    popularity: 92, variants: ['MX1', 'MX3', 'AX3', 'AX5', 'AX7'],
    tagline: 'The SUV You Need',
    sections: [
      { id: 'design', title: 'Uncompromising Presence', content: 'A commanding 5-door stance that blends the iconic Thar DNA with modern SUV practicality and a striking new front fascia.', image: '/assets/mahindra/suv_design.png' },
      { id: 'comfort', title: 'Premium Interiors', content: 'Experience unexpected luxury with ventilated front seats, a massive panoramic sunroof, and premium soft-touch materials.', image: '/assets/mahindra/suv_interior.png' },
      { id: 'technology', title: 'Advanced Tech & Safety', content: 'Loaded with a dual-screen digital layout, Level 2 ADAS, and advanced connectivity to keep you safe and entertained.', image: '/assets/mahindra/suv_interior.png' },
      { id: 'performance', title: 'Unstoppable Performance', content: 'The power to conquer the wilderness with advanced off-road hardware while delivering exceptional ride quality on the highway.', image: '/assets/mahindra/suv_engine.png' }
    ]
  }
];

export const getCars = async (filters = {}) => {
  let cars = [];
  try {
    let carsRef = collection(db, COLLECTION_NAME);
    const querySnapshot = await getDocs(carsRef);
    
    querySnapshot.forEach((doc) => {
      cars.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching cars from Firestore:", error);
  }

  // Ensure all 5 Mahindra cars are present
  const existingMahindraModels = new Set(cars.filter(c => c.brand === 'Mahindra').map(c => c.model));
  const missingMahindraCars = mahindraCars.filter(mc => !existingMahindraModels.has(mc.model));
  cars = [...cars, ...missingMahindraCars];

  // Client-side filtering removed as per user request
  
  return cars;
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

  // Fallback to static Mahindra cars
  const staticCar = mahindraCars.find(c => c.id === id);
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
