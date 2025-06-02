import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure
} from '../../../store/reducers/user';
import { AppContext } from '../../../context/AppContext';

const Register = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: any) => state.user);
  const { setIsLoggedin, setShowLogin, setShowRegister } = useContext(AppContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(registerUserRequest());

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/signup`, {
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
      localStorage.setItem('mariana token', responseData.token);
      setIsLoggedin(true);
      setShowRegister(false);
    } catch (error: any) {
      // On failure, dispatch the failure action and store the error message
      dispatch(registerUserFailure(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-[3000] top-0 left-0 bg-black bg-opacity-50 inset-0 flex justify-center items-center">
      <section className="bg-white w-[90%] h-[90vh]">
        <div className="flex md:justify-end my-10 px-5 md:px-20">
          <button onClick={() => setShowRegister(false)}>
            <img src="/close.svg" className="w-5" alt="" />
          </button>
        </div>

        <section className="flex flex-col lg:flex-row items-start justify-center gap-14 px-5">
          <div className="pr-0 lg:pr-20 lg:border-r w-full md:w-full lg:w-[40%]">
            <div className="w-full">
              <h2 className="text-2xl">Create Account</h2>
              <p className="text-sm font-light mt-2 poppins">
                Sign up for secure checkout and easy order tracking
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

                <div>
                  <p className="poppins text-sm font-light">
                    By clicking “Create Account”, you agree to Mariana Secret Terms & Conditions and
                    Privacy Policy.
                  </p>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white text-sm w-full py-4 my-5"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </form>
            </div>
          </div>

          <div className="lg:w-[30%] w-full flex justify-center items-center lg:justify-normal lg:items-start flex-col gap-1">
            <h2 className="text-2xl">Sign In</h2>
            <p className="text-sm font-light mt-2 poppins">
              Sign into your account for easy checkout
            </p>

            <button
              onClick={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
              className="md:px-32 py-3 w-full md:w-fit mt-5 border border-black rounded-sm text-center text-sm text-black poppins"
            >
              Sign Up
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Register;
