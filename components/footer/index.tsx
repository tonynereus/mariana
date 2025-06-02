const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__description">
            <img src="/brandLogo.svg" alt="" className="w-14 mb-2" />

            <button type="button" className="px-4 py-1 mt-2 border border-black text-sm">
              SIGN UP TO STAY IN THE KNOW
            </button>
            <ul className="site-footer__social-networks">
              <li className="w-7 hover:scale-75 duration-300 transition-all">
                <a href="#">
                  <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.5" cy="17.5" r="17.5" fill="black" />
                    <path
                      d="M19 19.5H21.5L22.5 15.5H19V13.5C19 12.47 19 11.5 21 11.5H22.5V8.14C22.174 8.097 20.943 8 19.643 8C16.928 8 15 9.657 15 12.7V15.5H12V19.5H15V28H19V19.5Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </li>
              <li className="w-7 hover:scale-75 duration-300 transition-all">
                <a href="#">
                  <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.5" cy="17.5" r="17.5" fill="black" />
                    <mask
                      id="mask0_507_8032"
                      maskUnits="userSpaceOnUse"
                      x="10"
                      y="11"
                      width="14"
                      height="14"
                    >
                      <path d="M10 11H24V25H10V11Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_507_8032)">
                      <path
                        d="M21.025 11.6562H23.172L18.482 17.0303L24 24.3442H19.68L16.294 19.9093L12.424 24.3442H10.275L15.291 18.5942L10 11.6572H14.43L17.486 15.7102L21.025 11.6562ZM20.27 23.0562H21.46L13.78 12.8772H12.504L20.27 23.0562Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </a>
              </li>
              <li className="w-7 hover:scale-75 duration-300 transition-all">
                <a href="#">
                  <svg viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.5" cy="17.5" r="17.5" fill="black" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 10C17.855 10 18.732 10.022 19.582 10.058L20.586 10.106L21.547 10.163L22.447 10.224L23.269 10.288C24.161 10.3563 25.0004 10.7369 25.6395 11.363C26.2786 11.9891 26.6764 12.8205 26.763 13.711L26.803 14.136L26.878 15.046C26.948 15.989 27 17.017 27 18C27 18.983 26.948 20.011 26.878 20.954L26.803 21.864C26.79 22.01 26.777 22.151 26.763 22.289C26.6764 23.1796 26.2784 24.0112 25.6391 24.6373C24.9999 25.2634 24.1602 25.6439 23.268 25.712L22.448 25.775L21.548 25.837L20.586 25.894L19.582 25.942C18.7218 25.9794 17.861 25.9987 17 26C16.139 25.9987 15.2782 25.9794 14.418 25.942L13.414 25.894L12.453 25.837L11.553 25.775L10.731 25.712C9.83895 25.6437 8.99955 25.2631 8.36047 24.637C7.72139 24.0109 7.32357 23.1795 7.237 22.289L7.197 21.864L7.122 20.954C7.04554 19.9711 7.00484 18.9858 7 18C7 17.017 7.052 15.989 7.122 15.046L7.197 14.136C7.21 13.99 7.223 13.849 7.237 13.711C7.32354 12.8207 7.72122 11.9894 8.36009 11.3633C8.99897 10.7373 9.83813 10.3565 10.73 10.288L11.551 10.224L12.451 10.163L13.413 10.106L14.417 10.058C15.2775 10.0206 16.1387 10.0013 17 10ZM15 15.575V20.425C15 20.887 15.5 21.175 15.9 20.945L20.1 18.52C20.1914 18.4674 20.2673 18.3916 20.3201 18.3003C20.3729 18.209 20.4007 18.1055 20.4007 18C20.4007 17.8945 20.3729 17.791 20.3201 17.6997C20.2673 17.6084 20.1914 17.5326 20.1 17.48L15.9 15.056C15.8088 15.0033 15.7053 14.9756 15.5999 14.9756C15.4945 14.9756 15.3911 15.0034 15.2998 15.0561C15.2086 15.1088 15.1329 15.1846 15.0802 15.2759C15.0276 15.3671 14.9999 15.4706 15 15.576V15.575Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="site-footer__links">
            <ul>
              <li>Legal</li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
            </ul>
            <ul>
              <li>Help & Information</li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Help & Contact</a>
              </li>
              <li>
                <a href="#">Delivery & Returns</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p className="text-sm font-medium">Mariana Secret</p>
          <h1 className="text-xs">© 2024 MarianaSecret, All Rights Reserved.</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
