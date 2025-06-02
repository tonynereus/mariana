import axios from 'axios';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Item from './item';
import Image from 'next/image';

import { setCart } from 'store/reducers/cart';
import { RootState } from 'store';
import { numberFormat } from 'utils/functions';

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  photo: string;
  addGiftWrap?: boolean;
}

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      totalPrice = cartItems.reduce(
        (acc, item) => acc + Number(item?.price) * (item?.quantity ?? 1),
        0
      );
    }

    return totalPrice;
  };

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/cart`, {
        headers: {
          Authorization: token
        }
      });

      const formattedCart = response.data.data.map((item: CartItem) => ({
        id: item.productId,
        cartId: item.cartId || 0,
        name: item.name,
        price: Number(item.price),
        count: item.quantity,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        photo: item.photo,
        addGift: item?.addGiftWrap
      }));

      dispatch(setCart({ product: formattedCart })); // Dispatch entire cart at once
    } catch (error) {
      setIsLoading(false);
      console.log('error fetching cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [JSON.stringify(cartItems)]);

  return (
    <section className="cart">
      <div className="">
        <h3 className="font-medium text-xl border-b border-black pb-5 mb-7">My Cart</h3>

        <div className="">
          {isLoading ? (
            <div className="flex flex-col gap-4 justify-center items-center text-lg h-[50vh]">
              <Image width={250} height={250} src="/animated.svg" alt="Loading animation" />
              <p>Loading...</p>
            </div>
          ) : (
            <>
              {cartItems.length > 0 && (
                <div className="flex flex-col gap-3">
                  {cartItems.map((item) => (
                    <Item
                      key={item?.id}
                      id={item?.id}
                      productId={item?.productId}
                      thumb={item?.photo}
                      name={item?.name}
                      color={item?.color}
                      price={Number(item?.price)}
                      size={item?.size}
                      count={item?.quantity}
                      cartId={item?.cartId} // Add this line
                      quantity={item?.quantity}
                      photo={item?.photo}
                    />
                  ))}
                </div>
              )}

              {cartItems.length === 0 && <p>Nothing in the cart</p>}
            </>
          )}
        </div>

        <div className="cart-actions">
          <Link href="/" className="cart__btn-back">
            <i className="icon-left"></i> Continue Shopping
          </Link>

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">
              Total cost <strong>&#8358;{numberFormat(priceTotal(),2)}</strong>
            </p>
            {cartItems.length !== 0 && (
              <Link
                href="/cart/checkout"
                className="px-10 py-3 duration-300 transition-all hover:bg-white hover:text-black border border-black bg-black text-white text-sm"
              >
                Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
