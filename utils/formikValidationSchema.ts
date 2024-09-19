import * as yup from 'yup';
export const signInValidationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const signUpvalidationSchema = yup.object({
    firstName: yup.string(),
    middleName: yup.string(),
    lastName: yup.string(),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
});


export const profileValidationSchema = yup.object({
    firstName: yup.string().required("Please enter first name"),
    middleName: yup.string(),
    lastName: yup.string().required("Please enter last name"),
    dob: yup.date().required("Please enter the date of birth"),
    role: yup.string().required("Please select role"),
    phone: yup.string().matches(/^[6-9]\d{9}$/, { message: "Please enter valid number.", excludeEmptyString: false }),
    email: yup.string().email('Enter a valid email').required('Enter a valid email'),
    address: yup.string().required("Please enter your address").min(10),
    description: yup.string(),
    city: yup.string(),
    state: yup.string(),
    gender: yup.string(),
    teamName: yup.string(),
});

// export const tournamentValidationSchema = yup.object({
//     organizerName: yup.string().required("Please enter the Organizer Name"),
//     logo: yup.string(),
//     startDate: yup.date().required("Please enter start date of tournament"),
//     endDate: yup.date().required("Please enter end date of tournament"),
//     venue: yup.string().required("Please enter the venue of the tournament"),
//     contactNumbers: yup.string().required("Please enter contact numbers"),
//     prizes: yup.array().of(yup.number().required("Please enter the prizes")),
//     rules: yup.array().of(yup.string().required("Please enter the rules")),
//     typeOfTournament: yup.string().required("Please enter the Organizer Name"),
//     dayOrNight: yup.string(),
//     entryFee: yup.number().required("Please enter the entry fee"),
//     prizesForPlayers: yup.array().of(yup.string()),
// });

export const tournamentValidationSchema = yup.object({
    organizerName: yup.string().required("Please enter the Organizer Name"),
    logo: yup.string(),
    startDate: yup.date().required("Please enter start date of tournament"),
    endDate: yup.date().required("Please enter end date of tournament"),
    venue: yup.string().required("Please enter the venue of the tournament"),
    contactNumbers: yup.string().required("Please enter contact numbers"),
    prizes: yup.array().of(yup.number().required("Please enter the prizes")),
    rules: yup.string().required("Please enter the rules"),
    typeOfTournament: yup.string().required("Please enter the Organizer Name"),
    dayOrNight: yup.string(),
    entryFee: yup.number().required("Please enter the entry fee"),
    // prizesForPlayers: yup.array().of(yup.string()),
});