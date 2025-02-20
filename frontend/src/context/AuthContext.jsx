import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, sendPasswordResetEmail as firebaseSendPasswordResetEmail, confirmPasswordReset as firebaseConfirmPasswordReset } from "firebase/auth";

const AuthContext =  createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register a user
    const registerUser = async (email,password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // login the user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sing up with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    // send password reset email
    const sendPasswordResetEmail = async (email) => {
        const actionCodeSettings = {
            url: `${window.location.origin}/reset-password`,
            handleCodeInApp: false,
        };
        return await firebaseSendPasswordResetEmail(auth, email);
    }

    // confirm password reset
    const confirmPasswordReset = async (oobCode, newPassword) => {
        try {
            await firebaseConfirmPasswordReset(auth, oobCode, newPassword);
        } catch (error) {
            if (error.code === 'auth/invalid-action-code') {
                throw new Error('The password reset link has expired or has already been used. Please request a new one.');
            }
            throw error;
        }
    }

    // logout the user
    const logout = () => {
        return signOut(auth)
    }

    // manage user
    useEffect(() => {
        const unsubscribe =  onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user) {
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo: photoURL
                } 
            }
        })

        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        sendPasswordResetEmail,
        confirmPasswordReset,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
