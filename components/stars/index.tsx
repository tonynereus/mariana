import React from 'react';

const Stars = ({ rating = 3.5, maxStars = 5 }) => {
  const getFillType = (index: number) => {
    if (rating >= index + 1) return 'full';
    if (rating > index) return 'half';
    return 'empty';
  };

  return (
    <div className="star-component">
      {Array.from({ length: maxStars }, (_, i) => (
        <span key={i} className={`stars ${getFillType(i)}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default Stars;
