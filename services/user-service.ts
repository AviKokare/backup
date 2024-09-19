import { db } from '../config/firebase_config';
import { collection, addDoc, where, getDocs, query, QuerySnapshot, DocumentData, updateDoc } from "firebase/firestore";
import { IProfile } from "../interface/profile";


export const createUserProfile = async (profile: IProfile) => {
  return new Promise((resolve, reject) => {
    addDoc(collection(db, "profile"), profile).then(async (doc) => {
      const updatedDoc = await updateDoc(doc, { _id: doc.id });
      resolve(updatedDoc);
    }).catch(error => reject(error));
  })
};

export const getProfileDataOnEmail = (email: string) => {
  const profileOfUser = query(collection(db, "profile"), where("email", "==", email));
  return new Promise((resolve, reject) => {
    getDocs(profileOfUser)
      .then((querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot.docs.length > 0) {
          const newData = querySnapshot.docs
          .map((doc) => doc.data());
          resolve(newData);
        }
      }).catch(error => {
        reject(error);
      })
  });
};

export const getAllProfiles = () => {
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

export const getProfileDataOnId = (id: string | string[] | undefined) => {
  const profileOfUser = query(collection(db, "profile"), where("_id", "==", id));
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