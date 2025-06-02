/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

const HeroCarousel = ({ images, interval = 5000, height = '' }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images?.length);
    }, interval);

    return () => clearInterval(autoScroll);
  }, [images, interval]);

  return (
    <div className={`relative w-full ${height ? height : 'h-auto'} overflow-hidden`}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images &&
          images.map((image: any, index: any) => (
            <div
              key={index}
              className={`w-full rounded-md flex-shrink-0 ${height ? height : 'h-64'}`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
