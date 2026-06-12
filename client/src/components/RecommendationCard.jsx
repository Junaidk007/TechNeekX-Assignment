import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './RecommendationCard.css';
import { 
  faCalendarAlt, 
  faUsers, 
  faTrophy, 
  faCheckCircle,
  faCalendarDay,
  faClock
} from '@fortawesome/free-solid-svg-icons';

// Mapping string names to imported FontAwesome icons
const iconMap = {
  category: faTrophy,
  time: faCalendarAlt,
  registrations: faUsers,
  day: faCalendarDay,
  timeOfDay: faClock
};

const RecommendationCard = ({ type, title, value, description }) => {
  const icon = iconMap[type] || faCheckCircle;

  // Format value display based on type
  const isNumber = typeof value === 'number';
  const displayValue = isNumber ? value.toLocaleString() : value;

  return (
    <div className="insight-card">
      <div className="card-header">
        <span className="card-title">{title}</span>
        <div className="card-icon">
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
      
      <div className={`card-value ${isNumber ? 'mono-stats' : ''}`}>
        {displayValue}
      </div>

      {description && (
        <div className="card-description">
          <span>{description}</span>
        </div>
      )}
    </div>
  );
};

export default RecommendationCard;
