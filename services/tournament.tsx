import { db } from '../config/firebase_config';
import { collection, addDoc, where, getDocs, query, QuerySnapshot, DocumentData } from "firebase/firestore";
import { ITournament } from '../interface/tournament';

//Create a new tournament
export const createTournament = async (tournament: ITournament) => await addDoc(collection(db, "tournament"), tournament);

//get a single tournament
export const getSingleTournament = async (tournamentId: string) => {
    const singleTournament = query(collection(db, "tournament"), where("id", "==", tournamentId));
    return new Promise((resolve, reject) => {
        getDocs(singleTournament)
            .then((querySnapshot: QuerySnapshot<DocumentData>) => {
                const singleTournamentData = querySnapshot.docs
                    .map((doc) => doc.data());
                resolve(singleTournamentData);
            }).catch(error => {
                reject(error);
            })
    });
};

//Get all the tournaments
export const getAllTournaments = async () => {
    const tournaments = query(collection(db, "tournament"));
    return new Promise((resolve, reject) => {
        getDocs(tournaments)
            .then((querySnapshot) => {
                const tournamentData = querySnapshot.docs
                    .map((doc) => doc.data());
                resolve(tournamentData);
            }).catch(error => {
                reject(error);
            })
    });
};

//Get user specific tournament data
export const getUserSpecificTournament = async (userId: string) => {
    const userSpecificTournament = query(collection(db, "tournament"), where("userId", "==", userId));
    return new Promise((resolve, reject) => {
        getDocs(userSpecificTournament)
            .then((querySnapshot: QuerySnapshot<DocumentData>) => {
                const userSpecificTournamentData = querySnapshot.docs
                    .map((doc) => doc.data());
                resolve(userSpecificTournamentData);
            }).catch(error => {
                reject(error);
            })
    });
};
