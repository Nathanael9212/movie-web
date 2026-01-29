interface RatingStarsProps {
    rating: number; // 0-10 dari TMDB
    showNumber?: boolean;
    size?: "sm" | "md" | "lg";
  }
  
  export default function RatingStars({ rating, showNumber = true, size = "md" }: RatingStarsProps) {
    const percentage = (rating / 10) * 100;
    const stars = Math.round((rating / 10) * 5); // Convert to 5-star system
    
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    };
  
    const textSizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    };
  
    // Color based on rating
    const getRatingColor = () => {
      if (rating >= 8) return "text-green-400";
      if (rating >= 6) return "text-yellow-400";
      if (rating >= 4) return "text-orange-400";
      return "text-red-400";
    };
  
    return (
      <div className="flex items-center gap-2">
        {/* Stars */}
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`${sizeClasses[size]} ${i < stars ? getRatingColor() : "text-gray-600"} fill-current`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          ))}
        </div>
        
        {/* Number */}
        {showNumber && (
          <span className={`font-bold ${getRatingColor()} ${textSizeClasses[size]}`}>
            {rating.toFixed(1)}
          </span>
        )}
      </div>
    );
  }
  