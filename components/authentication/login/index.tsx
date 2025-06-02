import Link from 'next/link';
import { useDispatch } from 'react-redux';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../context/AppContext';
import { registerUserSuccess, registerUserFailure } from '../../../store/reducers/user';

const Login = () => {
  const dispatch = useDispatch();
  const { setIsLoggedin, setShowLogin, setShowRegister } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pswd: password })
      });

      const responseData = await response.json();

      console.log('register data', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to register');
      }

      const updatedResponseData = { ...responseData, email: email };

      // On success, dispatch the success action and store the token
      dispatch(registerUserSuccess({ token: responseData.token, user: updatedResponseData }));
      // store token in local storage
      localStorage.setItem('mariana-token', responseData.token);
      setIsLoggedin(true);
      setShowLogin(false);
    } catch (error: any) {
      setError(error.message);
      // Handle any other errors
      dispatch(registerUserFailure(error.message));
      console.log('Error during login:', error);
    }
  };

  return (
    <div className="fixed z-[3000] top-0 left-0 bg-black bg-opacity-50 inset-0 flex justify-center items-center">
      <section className="bg-white w-[90%] h-[90vh]">
        <div className="flex md:justify-end my-10 px-5 md:px-20">
          <button onClick={() => setShowLogin(false)}>
            <img src="/close.svg" className="w-5" alt="" />
          </button>
        </div>

        <section className="flex flex-col-reverse lg:flex-row flex-wrap items-start justify-between lg:justify-center gap-y-5 lg:gap-10 px-5 lg:px-10">
          <div className="w-full lg:w-[40%] flex flex-col lg:justify-normal lg:items-start justify-center items-center gap-1">
            <h2 className="text-2xl">Create Account</h2>
            <p className="text-sm font-light mt-2 poppins lg:w-[70%]">
              Sign up for secure checkout and easy order tracking
            </p>

            <button
              onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
              className="md:px-32 py-3 w-full md:w-fit mt-5 border border-black rounded-sm text-center text-sm text-black poppins"
            >
              Sign Up
            </button>
          </div>

          <div className="w-full lg:w-[50%] lg:px-20 border-black border-b lg:border-b-0 lg:border-l">
            <div className="">
              <h2 className="text-2xl">Sign In</h2>
              <p className="text-sm font-light mt-2 poppins">
                Sign into your account for easy checkout
              </p>

              <form className="form my-5" onSubmit={handleSubmit}>
                <div className="form__input-row">
                  <input
                    className="form__input placeholder:text-sm"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error === 'required' && <p className="message message--error">{error}</p>}
                </div>

                <div className="form__input-row">
                  <input
                    className="form__input placeholder:text-sm"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <Link href="/forgot-password" className="poppins text-sm">
                  Forgot Password
                </Link>

                <button type="submit" className="bg-black text-white text-sm w-full py-4 my-5">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Login;
