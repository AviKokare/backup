import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../config/firebase_config';

export const signUp = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential: UserCredential) => {
      const user = userCredential.user;
      resolve(user);
    })
    .catch((error) => {
      reject(error);
    });
  })
};

export const signIn = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        reject(error.message);
      });
  })
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    signOut(auth).then(() => {
      resolve(true);
    }).catch((error) => {
      reject(error);
    });
  })
};