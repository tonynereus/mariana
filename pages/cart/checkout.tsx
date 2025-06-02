import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

import CheckoutItems from '../../components/checkout/items';
import { RootState } from 'store';
import Link from 'next/link';
import Logo from 'assets/icons/logo';
import { useEffect,  useState } from 'react';
import axios from 'axios';

import { useRouter } from 'next/router';
import { clearCart } from 'store/reducers/cart';
// import { Modal } from 'antd';
// const Modal = dynamic(() => import('antd/es/modal'), { ssr: false });
const PaystackPaymentWrapper = dynamic(
  () => import('../../components/paystack/PaystackPaymentWrapper'),
  {
    ssr: false
  }
);

interface City {
  id: number;
  location_name: string;
  delivery_fee: number;
}

interface Wraps {
  id: number;
  wrap_name: string;
  wrap_price: number;
}

function getSelectedWrap(wraps: Wraps[], id: number): Wraps | undefined {
  return wraps.find(wrap => wrap.id == id);
}

function getSelectedCity(cities: City[], id: number): City | undefined {
  return cities.find(city => city.id == id);
}

const CheckoutPage = () => {
  let deliveryFee = 5000;
  let tax = 50;

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  const token = useSelector((state: any) => state.user.token);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState(0);
  const [cities, setCities] = useState<City[]>([]);
  const [wraps, setWraps] = useState<Wraps[]>([]);
  const [addGiftWrap, setAddGiftWrap] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [slatedOrderEnabled, setSlatedOrderEnabled] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    apartment_or_floor: '',
    phone_number: '',
    country: 'Nigeria',
    state: 'Lagos',
    company_name: '',
    location_id: 0,
    recipient_name: '',
    recipient_contact: '',
    relationship: '',
    intended_delivery_date: '',
    is_slated: 0,
    wrap_id: 0
  });

  const getGiftPrice = () => getSelectedWrap(wraps, formData.wrap_id)?.wrap_price ?? 0;
  const getDeliveryFee = () => getSelectedCity(cities, formData.location_id)?.delivery_fee ?? 0;

  const handleToggleSlatedOrder = () => {
    setSlatedOrderEnabled(prev => !prev);
  };

  useEffect(
    () => {
      setFormData(prev => ({ ...prev, is_slated: Number(slatedOrderEnabled) }))
    }, [slatedOrderEnabled]
  )

  // const [formData, setFormData] = useState({
  //   first_name: '',
  //   last_name: '',
  //   address: '',
  //   apartment_or_floor: '',
  //   phone_number: '',
  //   country: 'Nigeria',
  //   state: 'Lagos',
  //   company_name: '',
  //   location_id: 0
  // });

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getCities = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/site/lagos-locations`, {
        headers: {
          Authorization: token
        }
      });
      console.log(response);

      if (response.status === 200) {
        setCities(response.data.data);
        setWraps(response.data.giftWraps);
      }
    } catch (error: any) {
      setError(error.response.data.message);
      console.error('Error fetching cities:', error);
    }
  };

  const handlePayment = async () => {
    // Validate required fields manually
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.address ||
      !formData.phone_number ||
      formData.location_id === 0
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsDisabled(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/order/create`,
        { ...formData, wrap_id: addGiftWrap ? formData.wrap_id : undefined },
        {
          headers: {
            Authorization: token
          }
        }
      );
      console.log('orderResponse', response);

      if (response.status === 200) {
        const newOrderId = response.data.data.order_id; // Get the orderId from the response
        const newAmount = response.data.data.total_pay;
        setOrderId(newOrderId);
        setAmount(newAmount);
        setIsDisabled(false);
        setError(null);
        dispatch(clearCart());

        // new era
        setShowModal(true);
      }
    } catch (error: any) {
      setError(error?.response?.data?.message);
      console.error('Checkout error:', error);
      setIsDisabled(false); // Re-enable the button in case of an error
    }
  };

  function formatAmount(amount: number) {
    const formattedAmount = amount.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `NGN ${formattedAmount}`;
  }

  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;

    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  });

  useEffect(() => {
    let sum: number = priceTotal + Number(getDeliveryFee()) + tax;
    if (addGiftWrap) {
      sum += Number(getGiftPrice())
    }
    setTotalPrice(sum);
  }, [priceTotal, deliveryFee, tax, formData.wrap_id, addGiftWrap, formData.location_id]);

  useEffect(() => {
    getCities();
  }, []);

  // useEffect(() => {
  //   AntdModal.info({
  //     title: "🎉 New Feature Available!",
  //     content: (
  //       <div>
  //         <p>You can now schedule orders to be delivered to your loved ones by selecting an intended delivery date!</p>
  //         <p>Give it a try below.</p>
  //       </div>
  //     ),
  //     okText: "Awesome!",
  //   });
  // }, []);

  useEffect(() => {
    // Use next tick to ensure client render
    import('antd/es/modal').then((AntdModal) => {
      AntdModal.default.info({
        title: '🎉 New Feature Available!',
        content: (
          <div>
            <p>You can now schedule orders to be delivered to your loved ones by selecting an intended delivery date!</p>
            <p>Give it a try below.</p>
          </div>
        ),
        okText: 'Awesome!',
      });
    });
  }, []);



  return (
    <section className="w-full flex flex-col md:flex-row px-5 lg:pl-10 h-[100vh]">
      {showModal && (
        <PaystackPaymentWrapper
          amount={amount}
          orderId={orderId}
          email={user.user.email}
          onSuccess={() => {
            router.push('/');
          }}
          onClose={() => {
            console.log('Payment closed');
            dispatch(clearCart());
          }}
        />
      )}

      <div className="w-full md:w-[50%] pt-2 lg:pr-10">
        <div className="flex justify-between items-center">
          <Link href="/" className="md:scale-75 scale-50 w-1 md:w-auto">
            <Logo />
          </Link>

          <div>
            <Link href="/" className="text-xs underline poppins font-medium">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* --- header */}
        <div className="flex flex-col md:flex-row gap-y-5 justify-between items-center my-5">
          <h3 className="">Delivery Details</h3>
          {!token && (
            <Link href={`/login`} className="text-xs font-medium underline poppins">
              Sign in / Sign up to Complete Checkout
            </Link>
          )}
          {/* <CheckoutStatus step='checkout' /> */}
        </div>

        <div className="">
          <form className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <input
                type="text"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-[49%] border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
              />
              <input
                type="text"
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-[49%] border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
              />
            </div>

            <input
              type="text"
              name="address"
              required
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
            />

            <input
              type="text"
              name="apartment_or_floor"
              value={formData.apartment_or_floor}
              onChange={handleInputChange}
              placeholder="Apartment, Suite, Floor etc (Optional)"
              className="w-full border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
            />

            <div className="flex justify-between items-center">
              <select
                name="location_id"
                required
                value={formData.location_id}
                onChange={handleInputChange}
                className="w-[32%] border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
              >
                <option value={0}>City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.location_name} ({formatAmount(city.delivery_fee)})
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                disabled={true}
                className="w-[32%] border cursor-not-allowed border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
              />
              <input
                type="text"
                name="country"
                required
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="w-[32%] border cursor-not-allowed border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
              />
            </div>

            <input
              type="number"
              name="phone_number"
              required
              value={formData.phone_number}
              onChange={handleInputChange}
              placeholder="Phone"
              className="w-full border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
            />
          </form>
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={slatedOrderEnabled}
                onChange={handleToggleSlatedOrder}
              />
              Slate this order for a loved one
            </label>

            {slatedOrderEnabled && (
              <div className="mt-3 flex flex-col gap-3">
                <input
                  type="text"
                  name="recipient_name"
                  value={formData.recipient_name}
                  onChange={handleInputChange}
                  placeholder="Recipient's Full Name"
                  className="w-full border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
                />
                <input
                  type="text"
                  name="relationship"
                  value={formData.relationship}
                  onChange={handleInputChange}
                  placeholder="Relationship with Recipient"
                  className="w-full border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient contact
                  </label>
                  <input
                    type="tel"
                    name="recipient_contact"
                    value={formData.recipient_contact}
                    onChange={handleInputChange}
                    placeholder="+23444171295"
                    className="w-full border border-gray-400 text-gray-600 px-5 py-2 text-sm placeholder:text-xs poppins"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Intended Delivery Date
                  </label>
                  <input
                    type="date"
                    name="intended_delivery_date"
                    value={formData.intended_delivery_date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-400 text-gray-600 px-5 py-2 text-sm poppins"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-7">
            <p className="text-sm mb-2">Delivery method</p>

            <div className="px-3 py-5 bg-[#fdd4b9]">
              <div className="flex justify-between items-center mb-2">
                <h1 className="font-semibold text-xs">Express Courier</h1>
                <h1 className="font-semibold text-xs">NGN 5,000.00</h1>
              </div>

              <p className="text-[11px]">3 - 5 Business Days</p>
              <p className="text-[11px] mt-1">Prepayment of duties and taxes supported</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[50%] bg-[#fdd4b9] h-auto py-5 px-7 overflow-auto">
        <div className="">
          <div className="h-[30vh] overflow-hidden overflow-y-auto">
            <CheckoutItems />
          </div>

          <div className="flex gap-2 w-full mt-5">
            <input
              type="text"
              className="bg-white w-[80%] px-3 py-3 text-xs placeholder:text-xs outline-none poppins"
              placeholder="Discount Code"
            />
            <button type="button" className="py-2.5 bg-black text-white w-[20%]">
              Apply
            </button>
          </div>

          <div className="flex items-center justify-between px-3 py-3 mt-5 w-full border border-gray-400">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className=""
                checked={addGiftWrap}
                onChange={() => setAddGiftWrap(!addGiftWrap)}
              />
              <div>
                <h1 className="text-sm">Add gift wrap to your order</h1>
                <select
                  name="wrap_id"
                  required
                  value={formData.wrap_id}
                  onChange={handleInputChange}
                  className=" border bg-white border-gray-400 text-gray-600 px-3 text-sm placeholder:text-xs poppins"
                >
                  <option value={0}>--Select wrap--</option>
                  {wraps.map((wrap) => (
                    <option key={wrap.id} value={wrap.id}>
                      {wrap.wrap_name} ({formatAmount(wrap.wrap_price)})
                    </option>
                  ))}
                </select>
              </div>
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

          <div className="mt-3 pt-2 flex items-center justify-between">
            <h1 className="font-medium">Subtotal - {cartItems.length} Item(S)</h1>
            <h1 className="font-medium">{formatAmount(priceTotal)}</h1>
          </div>

          <div className="mt-3 pt-2 flex items-center justify-between">
            <h1 className="font-medium">Delivery</h1>
            <h1 className="font-medium">{formatAmount(getDeliveryFee())}</h1>
          </div>

          {
            addGiftWrap && <div className="mt-3 pt-2 flex items-center justify-between">
              <h1 className="font-medium">Gift wrap</h1>
              <h1 className="font-medium">{formatAmount(getSelectedWrap(wraps, formData.wrap_id)?.wrap_price ?? 0)}</h1>
            </div>
          }

          <div className="mt-3 pt-2 flex items-center justify-between">
            <h1 className="font-medium">Taxes</h1>
            <h1 className="font-medium">{formatAmount(tax)}</h1>
          </div>

          <div className="mt-3 pt-2 flex items-center justify-between border-b pb-5 border-black">
            <h1 className="font-medium text-lg">Total cost</h1>
            <h1 className="font-medium text-lg">{formatAmount(totalPrice)}</h1>
          </div>
        </div>

        {error && <p className="text-red-500 text-xs my-3">{error}</p>}

        <button
          type="button"
          disabled={isDisabled}
          onClick={() => handlePayment()}
          className="py-2.5 bg-black text-white w-full mt-3"
        >
          {isDisabled ? 'processing' : 'Pay'}
        </button>
      </div>
    </section>
  );
};

export default CheckoutPage;
