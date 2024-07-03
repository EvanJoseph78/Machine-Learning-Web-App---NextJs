// components/CircularProgressBar.tsx
import { cva, VariantProps } from 'class-variance-authority';
import React, { useEffect, useState } from 'react';

const buttonVariants = cva(
  "transition-colors duration-300 ease-in-out",
  {
    variants: {
      variant: {
        wrong: "text-red-500",
        correct: "text-green-500",
      },
    },
    defaultVariants: {
      variant: "correct",
    },
  }
);

interface CircularProgressBarProps extends VariantProps<typeof buttonVariants> {
  percentage: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage, variant }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-bar">
      <svg className="circular-progress" width="160" height="160">
        <circle
          className="circular-progress-bg"
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="10"
          fill="none"
        />
        <circle
          className={`circular-progress-fg ${buttonVariants({ variant })}`}
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className={`percentage-text ${buttonVariants({ variant })}`}>{progress}%</div>
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
          stroke: currentColor;
          transition: stroke-dashoffset 1s;
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
