import { useState, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import useOnClickOutside from 'use-onclickoutside';
import Logo from '../../assets/icons/logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RootState } from 'store';
import { AppContext } from 'context/AppContext';

const Header = () => {
  const router = useRouter();
  const token = useSelector((state: any) => state.user.token);
  const { setShowMobileNav, setShowLogin } = useContext(AppContext);
  const { isFrag } = router.query;
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const [, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  return (
    <header ref={navRef} className="flex justify-between items-center md:px-10 px-5">
      {/*  */}
      <div className="gap-3 w-[18%] hidden md:flex">
        <Link
          href={`/`}
          className={`cursor-pointer text-xs text-center w-[50%] mb-1 border-white border-b-4 ${
            !isFrag && 'border-b-[#FFC9A5] poppins font-semibold'
          }`}
        >
          Mariana Secret
        </Link>
        <div className="h-full py-3.5 w-[1px] bg-gray-200 border" />
        <Link
          href={`/fragrance?isFrag=true`}
          className={`cursor-pointer text-xs text-center pl-2 w-[50%] pb-2 border-white border-b-4 ${
            isFrag && 'border-b-black poppins font-semibold'
          }`}
        >
          Fragrance by Mariana
        </Link>
      </div>

      <Link href="/" className="md:scale-75 scale-50 w-1 md:w-auto">
        <Logo />
      </Link>

      <div className="site-header__actions flex justify-between items-start w-[15%]">
        <button
          ref={searchRef}
          className={`search-form-wrapper hidden md:block ${
            searchOpen ? 'search-form--active' : ''
          }`}
        >
          <form className={`search-form`}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="icon-cancel"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <path
                d="M17.4003 0.613143C17.2769 0.489539 17.1304 0.391475 16.9691 0.324567C16.8078 0.257658 16.6349 0.223218 16.4603 0.223218C16.2857 0.223218 16.1128 0.257658 15.9515 0.324567C15.7902 0.391475 15.6436 0.489539 15.5203 0.613143L9.0003 7.11981L2.4803 0.59981C2.35686 0.476367 2.21031 0.378447 2.04902 0.31164C1.88774 0.244834 1.71487 0.210449 1.5403 0.210449C1.36572 0.210449 1.19286 0.244834 1.03157 0.31164C0.870288 0.378447 0.723741 0.476367 0.600298 0.59981C0.476855 0.723252 0.378935 0.8698 0.312129 1.03109C0.245322 1.19237 0.210937 1.36524 0.210938 1.53981C0.210938 1.71438 0.245322 1.88725 0.312129 2.04853C0.378935 2.20982 0.476855 2.35637 0.600298 2.47981L7.1203 8.99981L0.600298 15.5198C0.476855 15.6433 0.378935 15.7898 0.312129 15.9511C0.245322 16.1124 0.210938 16.2852 0.210938 16.4598C0.210937 16.6344 0.245322 16.8072 0.312129 16.9685C0.378935 17.1298 0.476855 17.2764 0.600298 17.3998C0.723741 17.5233 0.870288 17.6212 1.03157 17.688C1.19286 17.7548 1.36572 17.7892 1.5403 17.7892C1.71487 17.7892 1.88774 17.7548 2.04902 17.688C2.21031 17.6212 2.35686 17.5233 2.4803 17.3998L9.0003 10.8798L15.5203 17.3998C15.6437 17.5233 15.7903 17.6212 15.9516 17.688C16.1129 17.7548 16.2857 17.7892 16.4603 17.7892C16.6349 17.7892 16.8077 17.7548 16.969 17.688C17.1303 17.6212 17.2769 17.5233 17.4003 17.3998C17.5237 17.2764 17.6217 17.1298 17.6885 16.9685C17.7553 16.8072 17.7897 16.6344 17.7897 16.4598C17.7897 16.2852 17.7553 16.1124 17.6885 15.9511C17.6217 15.7898 17.5237 15.6433 17.4003 15.5198L10.8803 8.99981L17.4003 2.47981C17.907 1.97314 17.907 1.11981 17.4003 0.613143Z"
                fill="black"
              />
            </svg>

            <input type="text" name="search" placeholder="Enter the product name" />
          </form>

          <svg
            onClick={() => setSearchOpen(!searchOpen)}
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5"
          >
            <path
              d="M19.6667 19.6667L25 25M1 11.6667C1 14.4956 2.12381 17.2088 4.12419 19.2091C6.12458 21.2095 8.83769 22.3333 11.6667 22.3333C14.4956 22.3333 17.2088 21.2095 19.2091 19.2091C21.2095 17.2088 22.3333 14.4956 22.3333 11.6667C22.3333 8.83769 21.2095 6.12458 19.2091 4.12419C17.2088 2.12381 14.4956 1 11.6667 1C8.83769 1 6.12458 2.12381 4.12419 4.12419C2.12381 6.12458 1 8.83769 1 11.6667Z"
              stroke="#212121"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <Link href="/favourites">
          <button className="btn-cart hidden md:block">
            <svg
              width="27"
              height="24"
              viewBox="0 0 27 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5"
            >
              <path
                d="M19.6307 1.92C20.3296 1.91941 21.0217 2.05837 21.6662 2.32872C22.3108 2.59907 22.8949 2.99537 23.3843 3.4944C24.3927 4.51813 24.9579 5.89743 24.9579 7.3344C24.9579 8.77137 24.3927 10.1507 23.3843 11.1744L13.4387 21.2448L3.49309 11.1744C2.48469 10.1507 1.91945 8.77137 1.91945 7.3344C1.91945 5.89743 2.48469 4.51813 3.49309 3.4944C3.98278 2.99573 4.56692 2.59963 5.2114 2.32924C5.85589 2.05885 6.54779 1.91959 7.24669 1.91959C7.94559 1.91959 8.63749 2.05885 9.28197 2.32924C9.92646 2.59963 10.5106 2.99573 11.0003 3.4944L13.4387 5.9904L15.8675 3.5136C16.3554 3.00863 16.9401 2.60723 17.5867 2.33342C18.2333 2.0596 18.9285 1.91899 19.6307 1.92ZM19.6307 2.57554e-06C18.6761 -0.000806436 17.7309 0.188984 16.8506 0.558244C15.9703 0.927505 15.1726 1.4688 14.5043 2.1504L13.4387 3.2256L12.3731 2.1504C11.7039 1.47003 10.906 0.929675 10.0259 0.560825C9.14574 0.191975 8.20099 0.00201353 7.24669 0.00201353C6.29239 0.00201353 5.34764 0.191975 4.4675 0.560825C3.58737 0.929675 2.78946 1.47003 2.12029 2.1504C0.758893 3.53628 -0.00390625 5.40131 -0.00390625 7.344C-0.00390625 9.2867 0.758893 11.1517 2.12029 12.5376L13.4387 24L24.7571 12.5376C26.1185 11.1517 26.8813 9.2867 26.8813 7.344C26.8813 5.40131 26.1185 3.53628 24.7571 2.1504C24.0878 1.4701 23.2899 0.929654 22.4098 0.560487C21.5297 0.191319 20.5851 0.000798333 19.6307 2.57554e-06Z"
                fill="#212121"
              />
            </svg>

            {/* {cartItems.length > 0 && (
              <span className='btn-cart__count'>{cartItems.length}</span>
            )} */}
          </button>
        </Link>

        {token ? (
          <Link href="/user">
            <button className="site-header__btn-avatar hidden md:block">
              <i className="icon-avatar"></i>
            </button>
          </Link>
        ) : (
          <button onClick={() => setShowLogin(true)}>
            <span className="site-header__btn-avatar hidden md:block">
              <i className="icon-avatar"></i>
            </span>
          </button>
        )}
        <Link href="/cart">
          <button className="btn-cart hidden md:block">
            <i className="icon-cart"></i>
            {cartItems.length > 0 && <span className="btn-cart__count">{cartItems.length}</span>}
          </button>
        </Link>
        <button
          onClick={() => setShowMobileNav(true)}
          className="site-header__btn-menu md:hidden block"
        >
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H16.75M1 5.875H16.75M1 10.75H16.75"
              stroke="black"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
