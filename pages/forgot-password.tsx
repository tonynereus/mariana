import { useState } from 'react';
import Layout from '../layouts/Main';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { registerUserSuccess, registerUserFailure } from 'store/reducers/user';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const dispatch = useDispatch(); // To dispatch actions to Redux
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('mariana-token')}`
        },
        body: JSON.stringify({ email, pswd: password })
      });

      const responseData = await response.json();

      console.log('register data', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to register');
      }

      // On success, dispatch the success action and store the token
      dispatch(registerUserSuccess({ token: responseData.token, user: responseData.user }));
      // store token in local storage
      localStorage.setItem('mariana-token', responseData.token);
      // Optionally, you can redirect the user to the home page or any other desired page
      router.push('/');
    } catch (error: any) {
      setError(error.message);
      // Handle any other errors
      dispatch(registerUserFailure(error.message));
      console.log('Error during login:', error);
    }
  };

  return (
    <Layout>
      <div className="lg:px-10 px-5 my-10">
        <Link href="/">
          <span>
            <i className="icon-left"></i> Back to store
          </span>
        </Link>
      </div>

      <section className="flex flex-col-reverse lg:flex-row flex-wrap items-start justify-between lg:justify-center gap-y-5 lg:gap-10 px-5 lg:px-10">
        <div className="w-full lg:w-[30%] flex flex-col lg:justify-normal lg:items-start justify-center items-center gap-1">
          <h2 className="text-2xl">Sign Up</h2>
          <p className="text-sm font-light mt-2 poppins lg:w-[70%]">
            Sign up for secure checkout and easy order tracking
          </p>

          <Link
            href="/register"
            className="px-32 py-3 w-fit mt-5 border border-black rounded-sm text-sm text-black poppins"
          >
            <span>Sign Up</span>
          </Link>
        </div>

        <div className="w-full lg:w-[40%] lg:px-20 border-black border-b lg:border-b-0 lg:border-l">
          <div className="">
            <h2 className="text-2xl">Forgot Password</h2>
            <p className="text-sm font-light mt-2 poppins">
              Reset your password by entering your email address
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
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="bg-black text-white text-sm w-full py-4 my-5">
                Reset
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LoginPage;
