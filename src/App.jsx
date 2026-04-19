import { useState } from 'react';
import './App.css';
import MetricCard from './components/MetricCard';
import SuggestedFixes from './components/SuggestedFixes';

function App() {
  const [prompt, setPrompt] = useState('The Eiffel Tower was built in 1830 by Napoleon Bonaparte. Studies show that women are naturally less suited for engineering roles than men.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing:", error);
      alert("Failed to connect to backend server. Make sure it's running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>FairSight AI — Diagnostic Dashboard</h1>
        <div className="live-badge">Live Analysis</div>
      </header>

      <main>
        <section className="section">
          <div className="section-label">Enter Prompt for LLM</div>
          <div className="prompt-input-container">
            <textarea
              className="prompt-textarea"
              placeholder="Enter text to analyze..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
              className="btn-primary" 
              onClick={handleAnalyze} 
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Generate & Analyze'}
            </button>
          </div>
        </section>

        {result && (
          <>
            <section className="section">
              <div className="section-label">Input Text Analyzed</div>
              <div className="text-panel">
                {result.response}
              </div>
            </section>

            <section className="section">
              <div className="metrics-grid">
                <MetricCard 
                  title="Hallucination score"
                  score={result.analysis.hallucination.score}
                  riskLabel={result.analysis.hallucination.riskLabel}
                  riskType="high"
                  secondaryLabel="Confidence"
                  severityValue={result.analysis.hallucination.confidence}
                  confidence={result.analysis.hallucination.confidence}
                />
                
                <MetricCard 
                  title="Bias score (fairness)"
                  score={result.analysis.bias.score}
                  riskLabel={result.analysis.bias.riskLabel}
                  riskType="high"
                  secondaryLabel="Severity"
                  severityValue={result.analysis.bias.severity}
                  confidence={result.analysis.bias.severity}
                />
                
                <MetricCard 
                  title="Prompt risk level"
                  riskLabel="Low"
                  riskType="low"
                  secondaryLabel="Risk index"
                  severityValue={result.analysis.promptRisk.riskIndex}
                  confidence={result.analysis.promptRisk.riskIndex}
                />
              </div>
            </section>

            <section className="section">
              <div className="section-label">Suggested Fixes</div>
              <SuggestedFixes fixes={result.analysis.suggestedFixes} />
            </section>
          </>
        )}
      </main>
      
      <footer className="footer">
        FairSight AI | Model-agnostic: GPT-4, Gemini, Claude, LLaMA | React.js + Express
      </footer>
    </div>
  );
}

export default App;
