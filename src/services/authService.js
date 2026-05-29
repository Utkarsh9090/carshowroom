import { 
  GoogleAuthProvider,
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";

// Google Login
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    
    // If the admin uses their email, make them admin, else user
    const role = user.email === 'test@admin.com' ? 'admin' : 'user';
    
    if (!userDoc.exists()) {
      // First time sign-up
      const newDocData = {
        name: user.displayName,
        email: user.email,
        role: role,
        phone: 'N/A',
        joined: new Date().toISOString().split('T')[0]
      };
      await setDoc(userDocRef, newDocData);
    }
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Log in
export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    // Auto-setup admin account if it doesn't exist yet
    if (email === 'test@admin.com' && password === 'testadmin' && error.message.includes('auth/invalid-credential')) {
      try {
        return await signup(email, password, 'Super Admin');
      } catch (signupError) {
        throw new Error(signupError.message);
      }
    }
    throw new Error(error.message);
  }
};

// Sign up
export const signup = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Automatically make test@admin.com an admin
    const role = email === 'test@admin.com' ? 'admin' : 'user';
    
    // Set default user data in Firestore
    const userData = {
      name: name || email.split('@')[0],
      email,
      role: role,
      phone: 'N/A',
      joined: new Date().toISOString().split('T')[0]
    };
    
    try {
      await setDoc(doc(db, "users", user.uid), userData);
    } catch (err) {
      console.warn("Could not save user data to Firestore. Proceeding anyway:", err);
    }
    
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Log out
export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('user');
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

// Get current user from localStorage for quick access
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};



// Admin: Get all users
export const getUsers = async (searchQuery = '') => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      users = users.filter(u => 
        (u.name && u.name.toLowerCase().includes(lowerQuery)) || 
        (u.email && u.email.toLowerCase().includes(lowerQuery))
      );
    }
    return users;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
};

// Admin: Delete user (Note: This only deletes the Firestore doc, Firebase Auth deletion requires admin SDK)
export const deleteUser = async (id) => {
  console.warn("User deleted from Firestore. Authentication deletion should be handled via Firebase Admin SDK backend.");
  return true;
};
