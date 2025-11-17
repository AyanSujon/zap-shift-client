import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {


    // new user register
    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // signin user
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // googe Signin 
    const signinGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const authInfo = {
        registerUser,
        signInUser,
        signinGoogle,
        

    }


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;