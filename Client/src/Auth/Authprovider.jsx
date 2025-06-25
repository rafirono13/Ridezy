import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import AuthContext from './AuthContext';
import auth from './../Firebase/firebase.init';

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState('');

  const GoogleProvider = new GoogleAuthProvider();

  // Register user
  const register = (email, password, name, photoUrl) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(res => {
      return updateProfile(res.user, {
        displayName: name,
        photoURL: photoUrl,
      })
        .then(() => {
          setUser({ ...res.user, displayName: name, photoURL: photoUrl });
          return res;
        })
        .finally(() => setLoading(false));
    });
  };

  // Login user
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, GoogleProvider);
  };

  // Logout user
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Manage user
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        currentUser.getIdToken().then(token => {
          setIdToken(token);
          setLoading(false);
        });
      } else {
        setIdToken('');
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const authInfo = {
    user,
    loading,
    register,
    login,
    googleLogin,
    logout,
    idToken,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authprovider;
