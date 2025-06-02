import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { some } from 'lodash';
import { addProduct } from 'store/reducers/cart';
import { toggleFavProduct } from 'store/reducers/user';
import { ProductStoreType } from 'types';
import { RootState } from 'store';
import Accordion from '../../accordion/Accordion';
import { AppContext } from 'context/AppContext';

type ProductContent = {
  product: {
    mainImage: any;
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    delivery: string;
    amount: number;
    title: string;
    colors: string[];
    reviews: {
      name: string;
      review: string;
      rating: number;
    }[];
    returnPolicy: string;
  };
  isFrag: string | string[] | undefined;
};

const Content = ({ product, isFrag }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>('');
  const [itemSize, setItemSize] = useState<string>('');
  const [addGiftWrap, setAddGiftWrap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onColorSet = (e: string) => setColor(e);
  const { setShowNotification, setShowLogin } = useContext(AppContext);
  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(favProducts, (productId) => productId === product.id);

  const storedToken = localStorage.getItem('mariana-token');
  const token = useSelector((state: any) => state.user.token);

  const toggleFav = async () => {
    try {
      const url = isFavourite
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/user/favorites/remove`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/user/favorites/add`;
      const method = isFavourite ? 'DELETE' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${storedToken}` // Ensure you have the auth token
        },
        body: JSON.stringify({ productId: product.id })
      });

      if (response.ok) {
        dispatch(
          toggleFavProduct({
            id: product.id
          })
        );

        setError(null);
      } else {
        setError('Error toggling favorite status');
        console.error('Failed to update favorite status');
      }
    } catch (error: any) {
      setError(error.response.data.message);
      console.error('Error toggling favorite product:', error);
    }
  };

  const addProductToCart = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/cart/add`,
        {
          productId: Number(product.id),
          quantity: count,
          size: itemSize,
          color: color
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      setError(null);
      setIsLoading(false); // Set loading stage to false
      return response;
    } catch (error: any) {
      setError(error.response.data.message);
      setIsLoading(false);
      console.log('error adding to cart', error);
      return null;
    }
  };

  const addToCart = async () => {
    const addProductToDbResponse = await addProductToCart();

    console.log('addProductToDbResponse', addProductToDbResponse);

    if (addProductToDbResponse?.status === 200) {
      const productToSave: ProductStoreType = {
        id: product.id,
        cartId: 0,
        name: product.title,
        price: product.price,
        count: count,
        quantity: count,
        color: color,
        size: itemSize,
        photo: product.mainImage,
        addGift: addGiftWrap
      };

      const productStore = {
        count,
        product: productToSave
      };

      dispatch(addProduct(productStore));
      setShowNotification(true);
    }
  };

  useEffect(() => {
    if (error == 'Unauthorized') {
      setShowLogin(true);
    }
  }, [error]);

  return (
    <section className="product-content">
      {/* --- header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b">
        <div>
          <p>{product.title}</p>
          <p className="text-xs mt-3">
            NGN {(product.price && product.price.toLocaleString()) || 0}
          </p>
        </div>

        <button
          type="button"
          onClick={toggleFav}
          className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}
        >
          <i className="icon-heart"></i>
        </button>
      </div>

      {/* ----- size */}
      <div className="my-5">
        <div className="flex justify-between items-center">
          <p className="poppins text-sm font-medium">Size{isFrag && '/Volume'}</p>
          <button type="button" className="text-xs underline poppins font-medium">
            Size Chart
          </button>
        </div>

        {isFrag ? (
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setItemSize('30ML')}
              className={`${
                itemSize === '30ML' ? 'bg-black text-white' : ''
              } w-16 h-10 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all text-[11px]`}
            >
              30ML
            </button>
            <button
              type="button"
              onClick={() => setItemSize('50ML')}
              className={`${
                itemSize === '50ML' ? 'bg-black text-white' : ''
              } w-16 h-10 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all text-[11px]`}
            >
              50ML
            </button>
            <button
              type="button"
              onClick={() => setItemSize('100ML')}
              className={`${
                itemSize === '100ML' ? 'bg-black text-white' : ''
              } w-16 h-10 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all text-[11px]`}
            >
              100ML
            </button>
            <button
              type="button"
              onClick={() => setItemSize('240ML')}
              className={`${
                itemSize === '240ML' ? 'bg-black text-white' : ''
              } w-16 h-10 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all text-[11px]`}
            >
              240ML
            </button>
            <button
              type="button"
              onClick={() => setItemSize('500ML')}
              className={`${
                itemSize === '500ML' ? 'bg-black text-white' : ''
              } w-16 h-10 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all text-[11px]`}
            >
              500ML
            </button>
            <button
              type="button"
              onClick={() => setItemSize('980ML')}
              className={`${
                itemSize === '980ML' ? 'bg-black text-white' : ''
              } w-16 h-10 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all text-[11px]`}
            >
              980ML
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setItemSize('M')}
              className={`${
                itemSize === 'M' ? 'bg-black text-white' : ''
              } w-12 h-12 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all rounded-full text-[11px]`}
            >
              M
            </button>
            <button
              type="button"
              onClick={() => setItemSize('L')}
              className={`${
                itemSize === 'L' ? 'bg-black text-white' : ''
              } w-12 h-12 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all rounded-full text-[11px]`}
            >
              L
            </button>
            <button
              type="button"
              onClick={() => setItemSize('XL')}
              className={`${
                itemSize === 'XL' ? 'bg-black text-white' : ''
              } w-12 h-12 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all rounded-full text-[11px]`}
            >
              XL
            </button>
            <button
              type="button"
              onClick={() => setItemSize('XXL')}
              className={`${
                itemSize === 'XXL' ? 'bg-black text-white' : ''
              } w-12 h-12 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all rounded-full text-[11px]`}
            >
              XXL
            </button>
            <button
              type="button"
              onClick={() => setItemSize('XXXL')}
              className={`${
                itemSize === 'XXXL' ? 'bg-black text-white' : ''
              } w-12 h-12 poppins font-medium border border-gray-400 hover:bg-black hover:text-white duration-300 transition-all rounded-full text-[11px]`}
            >
              XXXL
            </button>
          </div>
        )}
      </div>

      {/* ----- colors */}
      {product.colors && !isFrag && (
        <div className="my-5">
          <p className="poppins font-medium">Color</p>

          <div className="flex gap-7 mt-3 items-center justify-start w-full">
            {product.colors.map((colorData: any, i: number) => (
              <button
                type="button"
                key={i}
                onClick={() => onColorSet(colorData)}
                className={`w-8 h-8 p-1 hover:scale-105 duration-300 transition-all ${
                  colorData === color ? 'border border-black' : ''
                } rounded-full flex justify-center items-center bg-[${colorData}]`}
              >
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full border border-black rounded-full"
                >
                  <circle cx="20" cy="20" r="20" fill={colorData} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ----- gift */}
      <div style={{display:"none"}} className="flex items-center justify-between px-3 py-3 mt-5 w-full border border-gray-400">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            className=""
            checked={addGiftWrap}
            onChange={() => setAddGiftWrap(!addGiftWrap)}
          />
          <h1 className="text-sm">Add gift wrap to your order (NGN 2000)</h1>
        </div>

        <span className="w-5">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.0807 2.5733C9.56065 2.55996 7.10732 4.98663 8.22732 7.99996H4.00065C3.29341 7.99996 2.61513 8.28092 2.11503 8.78101C1.61494 9.28111 1.33398 9.95939 1.33398 10.6666V13.3333C1.33398 13.6869 1.47446 14.0261 1.72451 14.2761C1.97456 14.5262 2.3137 14.6666 2.66732 14.6666H14.6673V10.6666H17.334V14.6666H29.334C29.6876 14.6666 30.0267 14.5262 30.2768 14.2761C30.5268 14.0261 30.6673 13.6869 30.6673 13.3333V10.6666C30.6673 9.95939 30.3864 9.28111 29.8863 8.78101C29.3862 8.28092 28.7079 7.99996 28.0007 7.99996H23.774C25.334 3.63996 19.4673 0.559964 16.7607 4.31996L16.0007 5.3333L15.2407 4.2933C14.4007 3.10663 13.2407 2.58663 12.0807 2.5733ZM12.0007 5.3333C13.1873 5.3333 13.7873 6.7733 12.9473 7.6133C12.1073 8.4533 10.6673 7.8533 10.6673 6.66663C10.6673 6.31301 10.8078 5.97387 11.0578 5.72382C11.3079 5.47377 11.647 5.3333 12.0007 5.3333ZM20.0007 5.3333C21.1873 5.3333 21.7873 6.7733 20.9473 7.6133C20.1073 8.4533 18.6673 7.8533 18.6673 6.66663C18.6673 6.31301 18.8078 5.97387 19.0578 5.72382C19.3079 5.47377 19.647 5.3333 20.0007 5.3333ZM2.66732 16V26.6666C2.66732 27.3739 2.94827 28.0522 3.44837 28.5522C3.94846 29.0523 4.62674 29.3333 5.33398 29.3333H26.6673C27.3746 29.3333 28.0528 29.0523 28.5529 28.5522C29.053 28.0522 29.334 27.3739 29.334 26.6666V16H17.334V26.6666H14.6673V16H2.66732Z"
              fill="black"
            />
          </svg>
        </span>
      </div>

      <div className="my-2 text-xs">{error && <p className="text-red-500">{error}</p>}</div>

      {/* ----- main buttons */}
      <div className="my-5 flex items-center justify-between">
        <div className="flex gap-10 items-center justify-between w-[35%]">
          <button type="button" className="text-3xl" onClick={() => setCount(count - 1)}>
            -
          </button>
          <span className="text-xl text-center poppins font-medium w-[40%]">{count}</span>
          <button type="button" className="text-3xl" onClick={() => setCount(count + 1)}>
            +
          </button>
        </div>

        <button
          type="submit"
          onClick={() => addToCart()}
          disabled={isLoading}
          className="text-center poppins text-sm py-3 bg-black text-white w-[50%]"
        >
          {isLoading ? 'Adding...' : 'Add to cart'}
        </button>
      </div>

      <Accordion
        description={product.description}
        rating={product.reviews}
        delivery={product.returnPolicy}
      />
    </section>
  );
};

export default Content;
