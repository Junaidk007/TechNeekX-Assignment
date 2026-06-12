import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../services/api';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getLatestData = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const res = await api.fetchRecommendations();
      setData(res);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard recommendations:', err);
      setError('Unable to fetch recommendations. Please ensure the backend server is running on port 5000.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const addEvent = async (eventData) => {
    await api.createEvent(eventData);
    // Refresh calculations silently
    await getLatestData(false);
  };

  useEffect(() => {
    getLatestData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    getLatestData(false);
  };

  return (
    <EventContext.Provider value={{
      data,
      loading,
      error,
      refreshing,
      handleRefresh,
      addEvent,
      getLatestData
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
