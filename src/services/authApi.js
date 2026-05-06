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

// get all events
export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/event/allevents/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching events' };
    }
};

// get member details
export const getMemberDetails = async (memberId) => {
    try {
        const response = await axios.get(`${BASE_URL}/member/memberdetails/${memberId}/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching member details' };
    }
};

// update member details
export const updateMemberDetails = async (memberId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/member/updatemember/${memberId}/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// get all referrals given by a member
export const getGivenReferrals = async (memberId) => {
    try {
        const response = await axios.get(`${BASE_URL}/referral/referralgivenbyme/${memberId}/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching given referrals' };
    }
};

// get all referrals received by a member
export const getReceivedReferrals = async (memberId) => {
    try {
        const response = await axios.get(`${BASE_URL}/referral/referralreceived/${memberId}/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching received referrals' };
    }
};