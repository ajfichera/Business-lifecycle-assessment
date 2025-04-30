// BusinessLifecycleAssessment.tsx
import React, { useState } from "react";
import "./App.css";

const lifecycleStages = [
  { stage: "Startup", min: 0, max: 40, description: "You're just starting out and need foundational structure, vision clarity, and essential systems to build momentum.", services: ["Executive Coaching", "Basic Structure Implementation", "Startup Process Development"] },
  { stage: "Growth", min: 41, max: 60, description: "You're building momentum but face common scaling pitfalls like process gaps, hiring missteps, and unclear roles.", services: ["Leadership Development", "HR Optimization", "Process Scaling"] },
  { stage: "Scale", min: 61, max: 80, description: "Your business is expanding rapidly. Now is the time to solidify operations, optimize tech, and upgrade leadership.", services: ["Change Management", "Market Expansion", "Advanced Leadership Coaching"] },
  { stage: "Optimization", min: 81, max: 100, description: "You’re operating at a mature level. The focus now is on innovation, cultural evolution, and strategic repositioning.", services: ["Business Model Innovation", "Cultural Transformation", "Strategic Repositioning"] },
];

const questions = [
  { area: "Strategy", question: "How clear is your company’s vision and mission?", weight: 5 },
  { area: "Strategy", question: "How well defined is your growth plan?", weight: 5 },
  { area: "Strategy", question: "How distinct is your market positioning?", weight: 5 },
  { area: "Strategy", question: "How strong is your competitive advantage?", weight: 5 },
  { area: "Strategy", question: "How solid is your financial strategy?", weight: 5 },
  { area: "Structure", question: "How scalable is your current org structure?", weight: 5 },
  { area: "Structure", question: "Are roles and accountabilities clearly defined?", weight: 5 },
  { area: "Structure", question: "Are decision-making processes efficient?", weight: 5 },
  { area: "Structure", question: "How well are resources allocated?", weight: 5 },
  { area: "People", question: "How effective is your leadership team?", weight: 5 },
  { area: "People", question: "Do you have the right talent in place?", weight: 5 },
  { area: "People", question: "How engaged is your team?", weight: 5 },
  { area: "People", question: "How strong is your performance management system?", weight: 5 },
  { area: "Process", question: "How efficient are your operations?", weight: 5 },
  { area: "Process", question: "How well is quality controlled?", weight: 5 },
  { area: "Process", question: "How embedded are innovation practices?", weight: 5 },
  { area: "Process", question: "How proactive is your risk management?", weight: 5 },
  { area: "Technology", question: "How integrated are your systems?", weight: 5 },
  { area: "Technology", question: "How well is data utilized?", weight: 5 },
  { area: "Technology", question: "How robust is your cybersecurity and IT strategy?", weight: 5 },
];

export default function BusinessLifecycleAssessment() {
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(3));
  const [submitted, setSubmitted] = useState(false);

  const totalScore = responses.reduce(
    (acc, val, idx) => acc + val * (questions[idx].weight / 5),
    0
  );

  const currentStage = lifecycleStages.find(
    (s) => totalScore >= s.min && totalScore <= s.max
  );

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const restart = () => {
    setResponses(Array(questions.length).fill(3));
    setSubmitted(false);
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Business Lifecycle Assessment
      </h1>

      {!submitted ? (
        <form>
          {questions.map((q, idx) => (
            <div key={idx} style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: "500", marginBottom: "0.5rem" }}>{q.question}</p>
              <div>
                {[1, 2, 3, 4, 5].map((val) => (
                  <label key={val} style={{ marginRight: "1rem" }}>
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={val}
                      checked={responses[idx] === val}
                      onChange={() => {
                        const newResponses = [...responses];
                        newResponses[idx] = val;
                        setResponses(newResponses);
                      }}
                    /> {val}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleSubmit}
            style={{ padding: "0.5rem 1rem", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            View Results
          </button>
        </form>
      ) : (
        <div>
          <h2 style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
            Your Business Lifecycle Stage: <strong>{currentStage?.stage}</strong>
          </h2>
          <p style={{ marginTop: "0.5rem" }}><strong>Total Score:</strong> {totalScore.toFixed(1)} / 100</p>
          <p style={{ marginTop: "1rem" }}>{currentStage?.description}</p>
          <h3 style={{ marginTop: "1.5rem" }}>How Intuito Group Can Help:</h3>
          <ul>
            {currentStage?.services.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <div style={{ marginTop: "2rem" }}>
            <p>Ready to perform like a Business Athlete?</p>
            <a href="https://calendly.com/intuito/intuito-group" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block",
              marginTop: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "4px"
            }}>
              Schedule a Strategy Session
            </a>
          </div>
          <button
            onClick={restart}
            style={{ marginTop: "2rem", padding: "0.5rem 1rem", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
}
