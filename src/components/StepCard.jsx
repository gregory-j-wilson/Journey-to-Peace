import React from 'react';
import { ChevronRight } from 'lucide-react';

const StepCard = ({ step, currentInput, setCurrentInput, onNext, isLast }) => {
  return (
    <div className="step-card">
      <h2 className="step-title">{step.title}</h2>
      
      <div className="verse-box">
        <p className="verse-text">"{step.verse}"</p>
        <p className="verse-reference">- {step.reference}</p>
      </div>

      <p className="instruction-text">{step.instruction}</p>

      <div className="input-section">
        <label className="input-label">
          {step.prompt}
        </label>
        <textarea
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          className="input-textarea"
          rows="6"
          placeholder="Take your time... pour out your heart to Him"
        />
      </div>

      <button
        onClick={onNext}
        disabled={!currentInput.trim()}
        className="btn btn-primary"
      >
        {isLast ? 'Complete Journey' : 'Continue'}
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default StepCard;