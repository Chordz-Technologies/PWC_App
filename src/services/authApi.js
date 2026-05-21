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

// get all referrals converted by a member
export const getConvertedReferrals = async (memberId) => {
    try {
        const response = await axios.get(`${BASE_URL}/referral/all-converted-referrals/${memberId}/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching converted referrals' };
    }
};

// convert referral to business
export const convertReferral = async (referralId, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/referral/convert-referral/${referralId}/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// event registration
export const registerForEvent = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/event/addparticipant/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// search members by name
export const searchMemberByName = async (search) => {
    try {
        const response = await axios.get(`${BASE_URL}/member/searchName/?search_term=${search}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error searching members' };
    }
};

// search members by business category
export const searchMemberByCategory = async (search) => {
    try {
        const response = await axios.get(`${BASE_URL}/member/searchCategory/?search_term=${search}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error searching members by category' };
    }
};

// get dashboard analytics for a member
export const getDashboardAnalytics = async (memberId) => {
    try {
        const response = await axios.get(`${BASE_URL}/referral/dashboard/${memberId}/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching dashboard analytics' };
    }
};

// add clients for a member
export const addClients = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/client/addClient/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// get clients of a member
export const getClients = async (memberId) => {
    try {
        const response = await axios.get(`${BASE_URL}/client/clientDetails/${memberId}/`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching clients' };
    }
};

// update a client
export const updateClient = async (clientId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/client/updateClient/${clientId}/`, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// delete a client
export const deleteClient = async (clientId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/client/deleteClient/${clientId}/`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// add business profile for a member
export const addBusinessProfile = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/profile/addprofile/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// get business profile of a member
export const getBusinessProfile = async (memberId) => {
    try {
        const response = await axios.get(`${BASE_URL}/profile/myprofile/${memberId}/`);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// update business profile of a member
export const updateBusinessProfile = async (profileId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/profile/updateprofile/${profileId}/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else {
            throw { message: 'Network Error' };
        }
    }
};

// get members by chapter
export const getMembersByChapter = async (chapterId) => {
    try {
        const response = await axios.get(`${BASE_URL}/member/allmembers/?chapter_id=${chapterId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error fetching members by chapter' };
    }
};