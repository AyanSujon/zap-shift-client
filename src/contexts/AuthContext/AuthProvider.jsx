import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // new user register
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signin user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    // googe Signin 
    const signinGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const logOut = ()=>{
        setLoading(true);
       return signOut(auth);
    }







    useEffect(()=>{
        const unSubscrive = onAuthStateChanged(auth, (currentUser)=> {
            setUser(currentUser);
            setLoading(false);
        })
        return ()=> {
            unSubscrive();
        }
    },[]);












    const authInfo = {
        user,
        setUser,
        loading, 
        setLoading,
        registerUser,
        signInUser,
        signinGoogle,
        logOut,

    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;