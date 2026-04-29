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

// get all carousel images
export const getCarouselImages = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/carousel/allimages/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching carousel images' };
    }
};

// get one-to-one meetings for a person
export const getMyMeetings = async (person1) => {
    try {
        const res = await axios.get(`${BASE_URL}/one-to-one/myMeetings/${person1}/`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// add one-to-one meeting
export const addMeeting = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/one-to-one/addMeeting/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// add referral
export const addReferral = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/referral/addreferral/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// get all members
export const getAllMembers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/member/allmembers/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching members' };
    }
};