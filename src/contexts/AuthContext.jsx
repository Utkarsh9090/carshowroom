import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          let userData = { uid: user.uid, email: user.email, role: 'user' };
          if (userDoc.exists()) {
            userData = { ...userData, ...userDoc.data() };
          }
          
          // Hardcode admin role for the default admin account
          if (user.email === 'test@admin.com') {
            userData.role = 'admin';
          }
          
          setCurrentUser(userData);
        } catch (error) {
          console.error("Error fetching user data in auth state change:", error);
          const fallbackRole = user.email === 'test@admin.com' ? 'admin' : 'user';
          setCurrentUser({ uid: user.uid, email: user.email, role: fallbackRole });
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
