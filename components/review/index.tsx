import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import StarRating from '../starRating';

interface ReviewProps {
  productId: number;
  setReviewProductId: any;
  setFetchReviews: any;
}

const Review = ({ productId = 0, setReviewProductId, setFetchReviews }: ReviewProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [review, setReview] = useState({ starCount: 0, message: '', productId: 0 });

  const token = useSelector((state: any) => state.user.token);

  const handleRatingChange = (newRating: number) => {
    setReview({ ...review, starCount: newRating });
    console.log(`New rating: ${newRating}`);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    setReview({ ...review, message: event.target.value, productId: productId });
  };

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/reviews/add`,
        review,
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log('setFavorites response', response);
      setReviewProductId(null);
      setFetchReviews(true);
    } catch (error) {
      setIsLoading(false);
      console.log('error fetching cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 inset-0 bg-black bg-opacity-50 w-full h-[100vh]]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white md:w-[25%] h-auto p-10">
          <div className="flex items-center justify-between border-b border-black pb-3">
            <h1 className="text-gray-500">Product Review</h1>

            <button type="button" className="w-6" onClick={() => setReviewProductId(null)}>
              <img src="/close.svg" alt="" className="w-full h-full" />
            </button>
          </div>

          <StarRating maxStars={5} onRatingChange={handleRatingChange} />

          <textarea
            rows={8}
            value={message}
            onChange={handleMessageChange}
            placeholder="Tell us what you think about the product."
            className="border p-3 text-sm w-full rounded-sm"
          ></textarea>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleProfileUpdate}
            className="bg-black py-2.5 mt-2 w-full text-center text-white"
          >
            {isLoading ? 'Loading...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
