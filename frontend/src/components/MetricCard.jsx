import React from 'react';
import './MetricCard.css';

const MetricCard = ({ title, score, maxScore = 100, riskLabel, riskType, confidence, secondaryLabel, severityValue }) => {
  const isHighRisk = riskType === 'high';
  const labelClass = riskType === 'high' ? 'label-danger' : 'label-success';
  const progressBg = isHighRisk ? 'bg-danger' : 'bg-success';
  
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      
      {score !== undefined ? (
        <div className="metric-score">
          <span className="score-value">{score}</span>
          <span className="score-max">/{maxScore}</span>
        </div>
      ) : (
        <div className="metric-score-text">{riskLabel === 'Low' ? 'Low' : riskLabel}</div>
      )}
      
      <div className={`metric-label ${labelClass}`}>
        {score === undefined && riskLabel === 'Low' ? 'Safe to process' : riskLabel}
      </div>

      <div className="metric-footer">
        <span className="footer-label">{secondaryLabel}</span>
        <div className="progress-container">
          <div 
            className={`progress-bar ${progressBg}`}
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
        <span className="footer-value">{severityValue}%</span>
      </div>
    </div>
  );
};

export default MetricCard;
