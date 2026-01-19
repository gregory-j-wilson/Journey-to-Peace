import React, { useState, useRef, useEffect } from 'react';
import StepCard from './StepCard';
import CompletionPage from './CompletionPage';
import { steps } from '../data/steps';

const MessianicComfortGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [currentInput, setCurrentInput] = useState('');
  const stepCardRef = useRef(null);
  const isInitialMount = useRef(true);

  // Scroll to step card whenever step changes (but not on initial load)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (stepCardRef.current) {
      const elementPosition = stepCardRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentInput.trim()) {
      setResponses({
        ...responses,
        [currentStep]: currentInput
      });
      setCurrentInput('');
      setCurrentStep(currentStep + 1);
      
      // Scroll to top when completing the journey
      if (currentStep === steps.length - 1) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setResponses({});
    setCurrentInput('');
    // Scroll to top on restart
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (currentStep >= steps.length) {
    return (
      <CompletionPage 
        responses={responses} 
        steps={steps} 
        onRestart={handleRestart} 
      />
    );
  }

  const step = steps[currentStep];

  return (
    <div style={{ maxWidth: '42rem', margin: '0 auto' }}>

      {/* Hero Image */}
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <img 
        src="/peace-painting.jpg" 
        alt="Peace" 
        style={{ 
          maxWidth: '400px', 
          width: '100%', 
          height: 'auto',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(180, 83, 9, 0.15)'
        }} 
      />
    </div>

      <div className="app-header">
        <h1 className="app-title">Journey to God's Comforting Presence</h1>
        <div className="title-divider"></div>
        <p className="step-counter">STEP {currentStep + 1} OF {steps.length}</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div ref={stepCardRef}>
        <StepCard
          step={step}
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          onNext={handleNext}
          isLast={currentStep === steps.length - 1}
        />
      </div>

      <div className="navigation-container">
        <button onClick={handleRestart} className="btn btn-text">
          ← Start Over
        </button>
      </div>

      <div className="footer-quote">
        <p>"Come to Me, all you who are weary and burdened, and I will give you rest." - Matthew 11:28</p>
      </div>
    </div>
  );
};

export default MessianicComfortGuide;