import React from 'react';
import './SuggestedFixes.css';

const SuggestedFixes = ({ fixes }) => {
  if (!fixes || fixes.length === 0) return null;

  return (
    <div className="suggested-fixes">
      <div className="fixes-header">
        <strong>{fixes.length} issues found</strong> — apply all fixes
      </div>
      <ul className="fixes-list">
        {fixes.map((fix) => (
          <li key={fix.id} className="fix-item">
            <div className={`fix-icon ${fix.type === 'hallucination' ? 'icon-green' : 'icon-orange'}`}>
              {fix.type === 'hallucination' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
            <span className="fix-description">{fix.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedFixes;
