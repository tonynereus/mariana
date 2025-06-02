import Head from 'next/head';
import Header from 'components/header';
import Navigation from 'components/navigation';
import { useRouter } from 'next/router';
import FragranceNavigation from '../components/fragrance/FragranceNavigation';
import MobileNavigation from '../components/mobile-navigation';
import Notification from '../components/notification';
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

import Login from '../components/authentication/login';
import Register from '../components/authentication/register';

type LayoutType = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
};

export default ({ children, title = 'Mariana Secret', className = '' }: LayoutType) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { isFrag } = router.query;

  const { showMobileNav, showNotification, showLogin, showRegister } = useContext(AppContext);

  return (
    <div className="app-main">
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      {showLogin && <Login />}
      {showRegister && <Register />}
      {showNotification && <Notification />}
      {showMobileNav && <MobileNavigation />}
      {isFrag ? <FragranceNavigation /> : <Navigation />}

      <main className={pathname !== '/' ? `main-page ${className}` : `${className}`}>
        {children}
      </main>
    </div>
  );
};
