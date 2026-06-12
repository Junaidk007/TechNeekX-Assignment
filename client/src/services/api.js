import axios from 'axios';

const API_BASE = 'https://techneekx-assignment.onrender.com/api';

export const fetchRecommendations = async () => {
  const response = await axios.get(`${API_BASE}/recommendations`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axios.post(`${API_BASE}/events`, eventData);
  return response.data;
};
