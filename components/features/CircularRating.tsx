interface CircularRatingProps {
    rating: number; // 0-10
    size?: number;
  }
  
  export default function CircularRating({ rating, size = 60 }: CircularRatingProps) {
    const percentage = (rating / 10) * 100;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
  
    // Color based on rating
    const getColor = () => {
      if (rating >= 8) return "#22C55E"; // green
      if (rating >= 6) return "#EAB308"; // yellow
      if (rating >= 4) return "#F97316"; // orange
      return "#EF4444"; // red
    };
  
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#374151"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Rating text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-white font-bold" style={{ fontSize: size * 0.3 }}>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  