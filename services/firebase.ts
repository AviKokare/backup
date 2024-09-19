import { db } from '../config/firebase_config';
import { collection, addDoc, where, getDocs, query, QuerySnapshot, DocumentData } from "firebase/firestore";
import { IProfile } from "../interface/profile";

export const createUserProfile = async (profile: IProfile) => {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, "profile"), profile);
  })
};

export const getProfileDataOnEmail = async (email: string) => {
  const profileOfUser = query(collection(db, "profile"), where("email", "==", email));
  return new Promise((resolve, reject) => {
    getDocs(profileOfUser)
      .then((querySnapshot: QuerySnapshot<DocumentData>) => {
        const newData = querySnapshot.docs
          .map((doc) => doc.data());
        resolve(newData);
      }).catch(error => {
        reject(error);
      })
  });
};

export const getAllProfiles = async () => {
  const profileOfUser = query(collection(db, "profile"));
  return new Promise((resolve, reject) => {
    getDocs(profileOfUser)
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => doc.data());
        resolve(newData);
      }).catch(error => {
        reject(error);
      })
  });
};
