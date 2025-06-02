import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NewProductItem = ({
  image,
  id,
  title,
  amount,
  colors,
  i,
  width = 'lg:w-[16%] w-[30%]',
  completeLook = true,
  isFrag = false
}: {
  image: string;
  title: string;
  id: any;
  amount?: number;
  colors?: string[];
  i: number;
  width?: string;
  completeLook?: boolean;
  isFrag?: boolean;
}) => {
  return (
    <>
      <Link
        href={isFrag ? `/product/${id}?isFrag=true` : `/product/${id}`}
        className={`${width} flex flex-col justify-start items-center text-center cursor-pointer`}
      >
        <div className="h-[40vh] w-full overflow-hidden">
          <Image
            key={i}
            src={image}
            alt="community"
            width={220}
            height={220}
            className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
          />
        </div>

        <div className="mt-2 flex flex-col justify-between">
          {isFrag ? (
            <Link
              href={`/product/${id}?isFrag=true`}
              className={`h-8 mt-5 ${completeLook ? 'text-xs' : 'text-sm'}`}
            >
              {title}
            </Link>
          ) : (
            <Link
              href={`/product/${id}`}
              className={`h-8 mb-5 ${completeLook ? 'text-xs' : 'text-sm'}`}
            >
              {title}
            </Link>
          )}
          {amount && (
            <h1
              className={`text-sm text-gray-500 mb-3 font-medium ${
                completeLook ? 'text-xs' : 'text-sm'
              }`}
            >
              NGN {amount && amount.toLocaleString()}
            </h1>
          )}
          {colors && (
            <div className="flex gap-2 items-center justify-center w-full">
              {colors.map((color, i) => (
                <span
                  key={i}
                  className={`w-4 h-4 rounded-full flex justify-center items-center border border-black bg-[${color}]`}
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill={color}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <circle cx="10" cy="10" r="8" fill={color} />
                  </svg>
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default NewProductItem;
