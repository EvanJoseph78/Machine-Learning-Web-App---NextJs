// components/CircularProgressBar.tsx
import React, { useEffect, useState } from 'react';

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar = ({ percentage }: CircularProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-bar">
      <svg className="circular-progress" width="120" height="120">
        <circle
          className="circular-progress-bg"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          fill="none"
        />
        <circle
          className="circular-progress-fg"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="percentage-text">{progress}%</div>
      <style jsx>{`
        .circular-progress-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .circular-progress {
          transform: rotate(-90deg);
        }
        .circular-progress-bg {
          stroke: #e6e6e6;
        }
        .circular-progress-fg {
          stroke: #00aaff;
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
        .percentage-text {
          position: absolute;
          font-size: 1.5em;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default CircularProgressBar;

