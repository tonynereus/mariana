import React, { useState } from 'react';

type RatingChangeHandler = (rating: number) => void;

const StarRating = ({
  maxStars = 5,
  onRatingChange
}: {
  maxStars?: number;
  onRatingChange?: RatingChangeHandler;
}) => {
  const [rating, setRating] = useState(0);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div className="star-rating my-4">
      {Array.from({ length: maxStars }, (_, i) => (
        <span
          key={i}
          className={`star ${rating >= i + 1 ? 'full' : 'empty'}`}
          onClick={() => handleClick(i)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
