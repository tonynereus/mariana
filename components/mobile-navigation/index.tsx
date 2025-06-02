import Logo from 'assets/icons/logo';
import { AppContext } from 'context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const MobileNavigation = () => {
  const router = useRouter();
  const token = useSelector((state: any) => state.user.token);
  const { setShowMobileNav } = useContext(AppContext);
  const { isFrag } = router.query;
  const { cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className="fixed px-3 py-2 top-0 left-0 w-full h-[100vh] z-[2000] bg-white">
      <div className="flex items-center justify-between">
        <Link href="/" className=" w-1 md:w-auto">
          <Logo width="120" />
        </Link>

        <button type="button" onClick={() => setShowMobileNav(false)} className="w-8">
          <img src="/close.svg" alt="" className="w-full h-full" />
        </button>
      </div>

      <div className="mt-5 w-full h-full flex flex-col gap-6 items-start">
        <Link
          href={`/`}
          onClick={() => setShowMobileNav(false)}
          className={`cursor-pointer text-center border-white border-b-4 ${
            !isFrag && 'text-[#FFC9A5] poppins font-semibold'
          }`}
        >
          Mariana Secret
        </Link>

        <Link
          href={`/fragrance?isFrag=true`}
          onClick={() => setShowMobileNav(false)}
          className={`cursor-pointer text-center border-white border-b-4 ${
            isFrag && 'text-[#FFC9A5] poppins font-semibold'
          }`}
        >
          Fragrance by Mariana
        </Link>

        <Link href="/favorites" onClick={() => setShowMobileNav(false)}>
          Favorites
        </Link>

        {token ? (
          <Link onClick={() => setShowMobileNav(false)} href="/user">
            User
          </Link>
        ) : (
          <Link onClick={() => setShowMobileNav(false)} href="/login">
            Login
          </Link>
        )}
        <Link onClick={() => setShowMobileNav(false)} href="/cart">
          <button className="btn-cart block">
            <i className="icon-cart"></i>
            {cartItems.length > 0 && <span className="btn-cart__count">{cartItems.length}</span>}
          </button>
        </Link>

        <input
          type="text"
          className="px-3 py-4 w-full text-sm placeholder:text-sm"
          placeholder="Enter the product name"
        />
      </div>
    </div>
  );
};

export default MobileNavigation;
