import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { useEvents } from '../context/EventContext';
import './EventForm.css';

const EventForm = () => {
  const { addEvent, data } = useEvents();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventName: '',
    category: 'hackathon',
    date: '',
    time: 'morning',
    registrations: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // const isMock = data?.dataSource && data.dataSource.includes('mock');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      await addEvent({
        eventName: form.eventName,
        category: form.category,
        date: form.date,
        time: form.time,
        registrations: Number(form.registrations)
      });
      // Redirect back to home
      navigate('/');
    } catch (err) {
      console.error('Error submitting event:', err);
      setSubmitError(err.response?.data?.error || 'Failed to submit event. Please check the fields and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* App Bar Header */}
      <header className="app-header">
        <div className="header-title">
          <h1>Add New Historical Event</h1>
          <p>Register a past event record to improve analysis calculations.</p>
        </div>
      </header>

      {/* Event Details Form */}
      <div className="form-card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          Event Details Form
        </h3>
        {submitError && (
          <div className="form-error-banner">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span>{submitError}</span>
          </div>
        )}
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input 
              type="text" 
              id="eventName"
              name="eventName"
              value={form.eventName}
              onChange={handleFormChange}
              required
              placeholder="e.g. Hackfest 2026"
              className="form-control"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select 
                id="category"
                name="category"
                value={form.category}
                onChange={handleFormChange}
                className="form-control"
              >
                <option value="hackathon">Hackathon</option>
                <option value="debate">Debate</option>
                <option value="software exhibition">Software Exhibition</option>
                <option value="workshop">Workshop</option>
                <option value="seminar">Seminar</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="time">Time of Day</label>
              <select 
                id="time"
                name="time"
                value={form.time}
                onChange={handleFormChange}
                className="form-control"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Event Date</label>
              <input 
                type="date" 
                id="date"
                name="date"
                value={form.date}
                onChange={handleFormChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="registrations">Registrations</label>
              <input 
                type="number" 
                id="registrations"
                name="registrations"
                min="0"
                value={form.registrations}
                onChange={handleFormChange}
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              disabled={submitting}
              className="btn-primary"
            >
              {submitting ? 'Adding...' : 'Add Event'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EventForm;
