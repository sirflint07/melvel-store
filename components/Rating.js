import React from 'react';
import Star from './Star';

const Rating = ({ rating }) => {
  const maxStars = 5;
  
  // Ensure rating is within valid range
  const validRating = Math.max(0, Math.min(Number(rating), maxStars));
  
  const fullStars = Math.floor(validRating); // Number of full stars
  const halfStar = validRating % 1 !== 0; // Check if the rating has a half star
  
  // Calculate empty stars and ensure it is non-negative
  const emptyStars = Math.max(0, maxStars - fullStars - (halfStar ? 1 : 0)); 

  return (
    <div className="flex">
      {/* Full Stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} filled={true} />
      ))}

      {/* Half Star */}
      {halfStar && <Star filled={true} half={true} />}

      {/* Empty Stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} filled={false} />
      ))}
    </div>
  );
};

export default Rating;