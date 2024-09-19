export interface IProfile {
    firstName: string;
    middleName: string;
    lastName: string;
    phone: string;
    dob: string;
    description: string;
    address: string;
    profileImage: string;
    email: string;
    city: string;
    state: string;
    gender: string;
    teamName: string;
    role: string;
};

export interface IFullName {
    firstName: string
    middleName: string;
    lastName: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IAuthentication {
    email: string;
    password: string;
    confirmPassword?: string;
}

