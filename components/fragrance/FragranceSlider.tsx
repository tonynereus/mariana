import { useState } from 'react';

export const FragranceSlider = ({ heroCarousel }: { heroCarousel: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, heroCarousel.length - 4); // Maximum scrollable index to keep 4 containers in view

  return (
    <div className="relative overflow-hidden w-full bg-gray-200">
      {/* Carousel Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-[40vh]"
        style={{
          transform: `translateX(-${currentIndex * 25}%)`, // Each slide occupies 25% width
          width: `${heroCarousel.length * 20}%` // Total width based on the number of slides
        }}
      >
        {heroCarousel.map((slide) => (
          <div
            key={slide.id}
            className="w-[25%] flex-shrink-0 h-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.img}')` }}
          >
            <p className="text-sm text-white">{slide.text}</p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="w-5 disabled:opacity-50"
        >
          <svg viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="40"
              y="80"
              width="40"
              height="80"
              transform="rotate(-180 40 80)"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.5849 41.4132C14.2104 41.0382 14 40.5299 14 39.9999C14 39.4699 14.2104 38.9615 14.5849 38.5865L22.1262 31.0425C22.5014 30.6675 23.0102 30.4569 23.5407 30.457C23.8034 30.4571 24.0635 30.5089 24.3061 30.6095C24.5488 30.71 24.7692 30.8574 24.9549 31.0432C25.1406 31.229 25.2879 31.4495 25.3883 31.6922C25.4888 31.9349 25.5405 32.195 25.5404 32.4577C25.5403 32.7203 25.4885 32.9804 25.388 33.2231C25.2874 33.4657 25.14 33.6862 24.9542 33.8719L18.8276 39.9999L24.9556 46.1279C25.1467 46.3123 25.2991 46.5329 25.4041 46.7768C25.509 47.0208 25.5643 47.2832 25.5667 47.5488C25.5692 47.8143 25.5187 48.0777 25.4182 48.3236C25.3178 48.5694 25.1694 48.7928 24.9817 48.9806C24.794 49.1685 24.5708 49.3171 24.325 49.4178C24.0793 49.5185 23.8159 49.5692 23.5504 49.567C23.2848 49.5648 23.0224 49.5098 22.7783 49.4051C22.5342 49.3004 22.3135 49.1481 22.1289 48.9572L14.5822 41.4132L14.5849 41.4132Z"
              fill="black"
            />
          </svg>
        </button>
        <button
          onClick={() => setCurrentIndex(Math.min(maxIndex, currentIndex + 1))}
          disabled={currentIndex === maxIndex}
          className="w-5 disabled:opacity-50"
        >
          <svg viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="80" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.4151 38.5868C25.7896 38.9618 26 39.4701 26 40.0001C26 40.5301 25.7896 41.0385 25.4151 41.4135L17.8738 48.9575C17.4986 49.3325 16.9898 49.5431 16.4593 49.543C16.1966 49.5429 15.9365 49.4911 15.6939 49.3905C15.4512 49.29 15.2308 49.1426 15.0451 48.9568C14.8594 48.771 14.7121 48.5505 14.6117 48.3078C14.5112 48.0651 14.4595 47.805 14.4596 47.5423C14.4597 47.2797 14.5115 47.0196 14.612 46.7769C14.7126 46.5343 14.86 46.3138 15.0458 46.1281L21.1724 40.0001L15.0444 33.8721C14.8533 33.6877 14.7009 33.4671 14.5959 33.2232C14.491 32.9792 14.4357 32.7168 14.4333 32.4512C14.4308 32.1857 14.4813 31.9223 14.5818 31.6764C14.6822 31.4306 14.8306 31.2072 15.0183 31.0194C15.206 30.8315 15.4292 30.6829 15.675 30.5822C15.9207 30.4815 16.1841 30.4308 16.4496 30.433C16.7152 30.4352 16.9776 30.4902 17.2217 30.5949C17.4657 30.6996 17.6865 30.8519 17.8711 31.0428L25.4178 38.5868L25.4151 38.5868Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
