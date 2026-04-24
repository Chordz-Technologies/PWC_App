import { BASE_URL } from './config';

export const getHomeData = async token => {
  try {
    const response = await fetch(`${BASE_URL}/home`, {
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