const BASE_URL = "http://localhost:5000/api";

export const API = {
  LOGIN_CITIZEN: `${BASE_URL}/auth/login/citizen`,
  LOGIN_ADMIN: `${BASE_URL}/auth/login/admin`,
  GET_CITIZEN_PROFILE: `${BASE_URL}/citizen/profile`,
  UPDATE_CITIZEN_PROFILE: `${BASE_URL}/citizen/profile/update`
};
