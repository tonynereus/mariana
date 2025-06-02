import React from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({
  description,
  rating,
  delivery,
}: {
  description: string;
  rating: Array<{ name: string; rating: number; review: string }>;
  delivery: string;
}) => {
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className='w-full'>
      <AccordionItem title='Description'>{description}</AccordionItem>
      <AccordionItem title='Reviews & Ratings'>
        {rating &&
          rating.map((review, index) => (
            <div key={index} className='mb-4 flex gap-5 items-center'>
              <h1
                style={{ backgroundColor: getRandomColor() }}
                className='p-4 w-12 rounded-full text-xs text-white flex items-center justify-center'>
                {review.name.charAt(0)}
              </h1>

              <div className='w-[80%]'>
                <p className='font-bold'>{review.name}</p>
                <p className='poppins text-xs leading-5'>"{review.review}"</p>
              </div>

              <p>{'⭐'.repeat(review.rating)}</p>
            </div>
          ))}
      </AccordionItem>
      <AccordionItem title='Delivery & Returns'>{delivery}</AccordionItem>
    </div>
  );
};

export default Accordion;
