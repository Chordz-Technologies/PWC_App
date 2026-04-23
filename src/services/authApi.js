import axios from 'axios';

const BASE_URL = 'https://pwcapi.beatsacademy.in/api';

// login users
export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/member/login/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// register users
export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/member/addmember/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// get all chapters
export const getAllChapters = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/chapter/allchapters/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching chapters' };
    }
};
