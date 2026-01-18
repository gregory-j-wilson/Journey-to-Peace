import React from 'react';
import { Download, Home } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

const CompletionPage = ({ responses, steps, onRestart }) => {
  const handleDownload = () => {
    generatePDF(responses, steps);
  };

  return (
    <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
      <div className="completion-header">
        <h1 className="completion-title">Your Journey is Complete</h1>
        <div className="completion-divider"></div>
        <p className="completion-verse">
          "The LORD is close to the brokenhearted and saves those who are crushed in spirit."
        </p>
        <p className="completion-reference">- Psalm 34:18</p>
      </div>

      <div className="reflections-container">
        <h2 className="reflections-title">Your Reflections</h2>
        {steps.map((step, index) => (
          responses[index] && (
            <div key={index} className="reflection-item">
              <h3 className="reflection-title">{step.title}</h3>
              <p className="reflection-verse">"{step.verse}" - {step.reference}</p>
              <p className="reflection-response">{responses[index]}</p>
            </div>
          )
        ))}
      </div>

      <div className="action-buttons">
        <button onClick={handleDownload} className="btn btn-primary">
          <Download size={20} />
          Download PDF
        </button>
        <button onClick={onRestart} className="btn btn-secondary">
          <Home size={20} />
          Start New Journey
        </button>
      </div>

      <div className="final-blessing">
        <p>May His peace rest upon you all the days of your life.</p>
        <p className="shalom-text">SHALOM</p>
      </div>
    </div>
  );
};

export default CompletionPage;