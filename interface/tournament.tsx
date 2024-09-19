export interface ITournament {
    organizerName: string; 
    tournamentName: string;
    logo: string;
    startDate: string;
    endDate: string;
    venue: string;
    contactNumbers: string;
    rules: '';
    typeOfTournament: string; 
    dayOrNight: string;
    entryFee: number;
    prizesForPlayers: '';
};

export interface prizesForPlayers {
    prize: string; // It can be amount, any eletronics gadgets or something
    typeOfPrize: string; // It is nothing but Best Batsman, Best Bowler or Best Fielder
}

export interface contactNumbers {
    nameOfTheContactor: string;
    contactNumber: number;
    email: number;
}

export interface tournamentPrizes {
    firstPrice: number;
    secondPrice: number;
    thirdPrice: number;
}