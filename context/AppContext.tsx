// context/MyContext.js
import React from 'react';
import { createContext, useState } from 'react';
export const AppContext = createContext<AppContextType>({} as AppContextType);

interface AppContextType {
  isLoggedin: boolean;
  setIsLoggedin: any;
  showMobileNav: boolean;
  setShowMobileNav: any;
  showNotification: boolean;
  setShowNotification: any;
  showRegister: boolean;
  showLogin: boolean;
  setShowLogin: any;
  setShowRegister: any;
}

const AppContextProvider = ({ children }: any) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <AppContext.Provider
      value={{
        setIsLoggedin,
        isLoggedin,
        showNotification,
        showRegister,
        showLogin,
        setShowLogin,
        setShowRegister,
        setShowNotification,
        showMobileNav,
        setShowMobileNav
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
