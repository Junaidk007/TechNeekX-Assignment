import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faDatabase, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useEvents } from '../context/EventContext';
import RecommendationCard from './RecommendationCard';
import RecommendationsChart from './RecommendationsChart';
import EventList from './EventList';
import './Dashboard.css';

const Dashboard = () => {
  const { data, loading, error, refreshing, handleRefresh } = useEvents();

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Analyzing historical event data and calculating recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
        <h3>Connection Failed</h3>
        <p>{error}</p>
        <button onClick={handleRefresh}>
          <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '0.5rem' }} />
          Retry Connection
        </button>
      </div>
    );
  }

  const { recommendations, chartData, events, dataSource } = data;

  return (
    <>
      {/* App Bar Header */}
      <header className="app-header">
        <div className="header-title">
          <h1>Future Event Optimization Insights</h1>
          <p>Calculated data-driven guidelines based on past attendance histories.</p>
        </div>
        <div className="header-actions">
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="refresh-btn"
          >
            <FontAwesomeIcon icon={faSyncAlt} spin={refreshing} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </header>

      {/* UPPER PART: Insight Cards */}
      <div className="cards-grid">
        <RecommendationCard 
          type="category"
          title="Best Event Category"
          value={recommendations.bestCategory}
          description="Highest cumulative registrations across all historical runs."
        />
        <RecommendationCard 
          type="time"
          title="Best Time to Organize"
          value={recommendations.bestTime}
          description="Month with the highest average registrations per event."
        />
        <RecommendationCard 
          type="day"
          title="Best Day of the Week"
          value={recommendations.bestDay}
          description="Day of the week with the highest average registrations."
        />
        <RecommendationCard 
          type="timeOfDay"
          title="Best Time of Day"
          value={recommendations.bestTimeOfDay}
          description="Time of day with the highest average registrations."
        />
        <RecommendationCard 
          type="registrations"
          title="Expected Registrations"
          value={recommendations.expectedRegistrations}
          description="Average attendance of top 3 events in winning category."
        />
      </div>

      {/* MIDDLE PART: Separate Charts */}
      <RecommendationsChart data={chartData} />

      {/* LOWER PART: Historical Event Dataset Table */}
      <EventList events={events} />
    </>
  );
};

export default Dashboard;
