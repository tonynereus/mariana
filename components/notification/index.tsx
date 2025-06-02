/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'next/image';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const Notification = () => {
  const { setShowNotification } = useContext(AppContext);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [product, setProduct] = React.useState<any>({});

  useEffect(() => {
    const lastCartItem = cartItems.length > 0 ? cartItems[cartItems.length - 1] : null;
    setProduct(lastCartItem);

    setTimeout(() => {
      document.querySelector('.notification')?.classList.remove('notification-in');
      document.querySelector('.notification')?.classList.add('notification-out');

      setTimeout(() => {
        setShowNotification(false);
      }, 500);
    }, 2000);
  }, []);

  return (
    <div className="notification notification-in w-full md:w-[25rem] px-5 py-3 fixed top-4 md:top-16 md:right-9 border bg-white shadow-lg z-[500]">
      <h1 className="cinzel text-xs md:text-sm font-semibold">
        ({product?.quantity}) Item added to cart
      </h1>
      <div className="flex justify-between mt-3">
        <div className="w-full max-w-[10rem] h-[17vh] overflow-hidden">
          <Image
            src={product?.photo}
            alt=""
            height={100}
            width={100}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-sm candara-bold w-[10rem] uppercase">
          <h1 className="text-sm">{product?.name}</h1>

          <div className="relative pl-3 my-3 flex items-center gap-10">
            <span className="absolute -bottom-0.5 left-0">₦</span>
            <span className="text-xs">{product?.price ? product?.price.toLocaleString() : 0}</span>
          </div>
          <div className="flex items-center gap-8 cinzel text-[10px] my-1 font-medium">
            <span>Quantity:</span> <span>{product?.quantity}</span>
          </div>
          {product.color && (
            <div className="flex items-center gap-11 cinzel text-[10px] my-1 font-medium">
              <span>Color:</span>
              <span
                className={`w-8 h-8 p-1 hover:scale-105 duration-300 transition-all rounded-full flex justify-center items-center bg-[${product?.color}]`}
              >
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full rounded-full"
                >
                  <circle cx="20" cy="20" r="20" fill={product?.color} />
                </svg>
              </span>
            </div>
          )}
          <div className="flex items-center gap-16 cinzel text-[10px] my-1 font-medium">
            <span>Size:</span> <span>{product?.size}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
