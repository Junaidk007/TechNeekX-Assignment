import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import './EventList.css';

const EventList = ({ events }) => {
  // Helper to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Safe category tag class selector
  const getCategoryClass = (category) => {
    const formatted = category.toLowerCase().replace(/\s+/g, '-');
    const validClasses = ['hackathon', 'debate', 'software-exhibition', 'workshop', 'seminar'];
    return validClasses.includes(formatted) ? formatted : 'default';
  };

  return (
    <div className="panel-card">
      <div className="panel-header">
        <h2>
          <FontAwesomeIcon icon={faListUl} />
          Historical Event Logs
        </h2>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {events.length} records found
        </span>
      </div>

      <div className="table-container">
        {events.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            No historical event logs available.
          </p>
        ) : (
          <table className="events-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Category</th>
                <th>Date</th>
                <th>Time of Day</th>
                <th>Registrations</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td style={{ fontWeight: 500 }}>{event.eventName}</td>
                  <td>
                    <span className={`category-tag ${getCategoryClass(event.category)}`}>
                      {event.category}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {formatDate(event.date)}
                  </td>
                  <td style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
                    {event.time || 'N/A'}
                  </td>
                  <td className="mono-stats" style={{ fontWeight: 600 }}>
                    {event.registrations.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EventList;
