import { BASE_URL } from './config';

export const getMembers = async token => {
  try {
    const response = await fetch(`${BASE_URL}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createMeeting = async (token, payload) => {
  try {
    const response = await fetch(`${BASE_URL}/schedule-meeting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};