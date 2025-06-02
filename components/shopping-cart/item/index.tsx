import axios from 'axios';
import { AppContext } from 'context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from 'store/reducers/cart';
import { ProductStoreType } from 'types';

const ShoppingCart = ({
  thumb,
  name,
  id,
  cartId,
  color,
  size,
  count,
  price,
  photo,
  quantity
}: ProductStoreType) => {
  const { setShowLogin } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);

  const removeProductFromCart = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/cart/remove?cartId=${Number(cartId)}`,
        {
          headers: { Authorization: token }
        }
      );
      setIsLoading(false); // Set loading stage to false
      return response;
    } catch (error: any) {
      setIsLoading(false); // Set loading stage to false
      console.log('error adding to cart', error);
      if (error.response.data.message == 'Unauthorized') {
        setShowLogin(true);
      }
      return null;
    }
  };

  const removeFromCart = async () => {
    const addProductToDbResponse = await removeProductFromCart();

    console.log('addProductToDbResponse', addProductToDbResponse);

    if (addProductToDbResponse?.status === 200) {
      dispatch(
        removeProduct({
          cartId,
          quantity,
          thumb,
          name,
          id,
          color,
          size,
          count,
          price,
          photo
        })
      );
    }
  };

  // const setProductCount = (count: number) => {
  //   if (count <= 0) {
  //     return;
  //   }

  //   const payload = {
  //     product: {
  //       thumb,
  //       name,
  //       id,
  //       color,
  //       size,
  //       count,
  //       price,
  //       image
  //     },
  //     count
  //   };

  //   dispatch(setCount(payload));
  // };

  return (
    <div className="flex flex-col md:flex-row gap-10 items-start">
      <div className="w-full md:w-[25%] h-[30vh] overflow-hidden">
        <Image
          // placeholder="blur"
          // blurDataURL=''
          width={200}
          height={200}
          src={photo}
          alt=""
          className="w-full h-full object-cover hover:scale-105 duration-300 transition-all"
        />
      </div>

      <div className="w-full md:w-[30%]">
        <Link href={`/product/${id}`} className="cart-item-before mb-3" data-label="Color">
          {name} ({quantity})
        </Link>
        <br />
        <div className="flex">
          {
            color && <>
              <span
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
              </span>/
            </>
          }
          {size && size}
        </div>

        <div className="w-full flex items-center justify-between my-5">
          {/* <div className="flex w-[50%] justify-between items-center">
            <button
              type="button"
              onClick={() => setProductCount(count - 1)}
              className="quantity-button__btn text-3xl"
            >
              -
            </button> 
            <span className="w-[60%] text-center">{count}</span>
            <button
              type="button"
              onClick={() => setProductCount(count + 1)}
              className="quantity-button__btn text-3xl"
            >
              +
            </button>
          </div> */}

          <button
            type="button"
            className="text-xs cursor-pointer underline"
            disabled={isLoading}
            onClick={() => removeFromCart()}
          >
            {isLoading ? 'Removing...' : 'Remove Item'}
          </button>
        </div>

        <h1 className="text-gray-600">NGN {price && price.toLocaleString()} X {quantity}</h1>
      </div>
    </div>
  );
};

export default ShoppingCart;
