// const BASE_URL = "https://car-rental-new-backend-2.onrender.com/api";
const BASE_URL = "https://car-rental-new-backend-2.onrender.com/api";
// const BASE_URL = "car-rental-new-backend-fb0ydhgal-jyatiskadey-gmailcoms-projects.vercel.app";

export const API = {
    CREATE_CITIZEN: `${BASE_URL}/citizen/register`,   // Citizen Registration
    LOGIN_CITIZEN: `${BASE_URL}/citizen/login`,       // Citizen Login
    GET_CITIZEN_PROFILE: `${BASE_URL}/citizen/profile`,// (You need to create this in backend if needed)
    UPDATE_CITIZEN_PROFILE: `${BASE_URL}/citizens/profile/update`, 
    GET_ALL_CITIZEN: `${BASE_URL}/citizen/getAllCitizens`, 

    CREATE_ADMIN: `${BASE_URL}/admins/register`,       // Admin Registration
    LOGIN_ADMIN: `${BASE_URL}/admin/login`    ,
    
    ADD_CAR: `${BASE_URL}/cars/create`       ,
    GET_CAR: `${BASE_URL}/cars/get-car-details`       ,
    DELETE_CAR: `${BASE_URL}/cars/delete`       ,

    BOOK_CAR: `${BASE_URL}/bookings/create`       ,
    CREATE_DRIVER: `${BASE_URL}/drivers/create`       ,
    GET_ALL_DRIVER: `${BASE_URL}/drivers/get-all-drivers` ,
};
