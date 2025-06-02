import { useEffect, useState } from 'react';
import Layout from '../layouts/Main';
import Footer from 'components/footer';
import Image from 'next/image';
import { userData } from 'data';
import NewProductItem from 'components/product';
import { RootState } from 'store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logOut } from 'store/reducers/user';
import Review from '../components/review';
import Stars from '../components/stars';
import { useRouter } from 'next/router';

interface Order {
  id: string;
  orderId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  productFee: string;
  order_date: string;
  deliveryDate: string;
  deliveryFee: string;
  totalFee: string;
  state: string;
  orderStatus: string;
  locationName: string;
  address: string;
  products: {
    productId: number;
    name: string;
    description: string;
    size: string;
    color: string;
    quantity: number;
    price: string;
    photo: string;
  }[];
}

interface Favorite {
  id: number;
  name: string;
  description: string;
  photo: string;
  colors: string[];
}

interface ReviewProduct {
  id: number;
  stars: string;
  review_message: string;
  product_title: string;
  product_description: string;
  product_price: string;
  product_image: string;
}
[];

const UserPage = () => {
  const [navigation, setNavigation] = useState('information');
  const [selectedStatus, setSelectedStatus] = useState<any>({});
  const [selectedId, setSelectedId] = useState(userData.orders[0].id);
  const [orders, setOrders] = useState<Order[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [reviewProductId, setReviewProductId] = useState<any>(null);
  const [reviewedProducts, setReviewedProducts] = useState<ReviewProduct[]>([]);
  const [fetchReviews, setFetchReviews] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);
  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/orders`, {
        headers: {
          Authorization: token
        }
      });

      console.log('response', response);
      setOrders(response.data.data);
    } catch (error) {
      setIsLoading(false);
      console.log('error fetching cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/favorites`, {
        headers: {
          Authorization: token
        }
      });

      console.log('setFavorites response', response);
      setFavorites(response.data.favorites);
    } catch (error) {
      setIsLoading(false);
      console.log('error fetching cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviewedProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/reviews`, {
        headers: {
          Authorization: token
        }
      });

      console.log('setReviewProductId response', response);
      setReviewedProducts(response.data.data);
    } catch (error) {
      setIsLoading(false);
      console.log('error fetching cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/updateProfile`,
        formData,
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log('setFavorites response', response);
    } catch (error) {
      setIsLoading(false);
      console.log('error fetching cart', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log('user', user);
    fetchOrders();
    fetchFavorites();
    fetchReviewedProducts();
  }, []);

  useEffect(() => {
    if (fetchReviews === true) {
      fetchReviewedProducts();
    }
  }, [fetchReviews]);

  return (
    <Layout>
      {reviewProductId !== null && (
        <Review
          setFetchReviews={setFetchReviews}
          productId={reviewProductId}
          setReviewProductId={setReviewProductId}
        />
      )}

      <section className="flex flex-col md:flex-row w-full px-5 md:px-10 lg:px-36 mt-10 mb-20">
        <section className="md:w-[23%] flex items-start flex-col gap-7">
          <button
            type="button"
            className={`poppins text-sm font-medium ${
              navigation === 'information' ? 'text-black' : 'text-gray-400'
            }`}
            onClick={() => setNavigation('information')}
          >
            User Information
          </button>
          <button
            type="button"
            className={`poppins text-sm font-medium ${
              navigation === 'orders' ? 'text-black' : 'text-gray-400'
            }`}
            onClick={() => setNavigation('orders')}
          >
            Orders & Returns
          </button>
          <button
            type="button"
            className={`poppins text-sm font-medium ${
              navigation === 'favorites' ? 'text-black' : 'text-gray-400'
            }`}
            onClick={() => setNavigation('favorites')}
          >
            Favorites
          </button>
          <button
            type="button"
            className={`poppins text-sm font-medium ${
              navigation === 'reviews' ? 'text-black' : 'text-gray-400'
            }`}
            onClick={() => setNavigation('reviews')}
          >
            Reviews
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(logOut());
              router.push('/');
            }}
            className="poppins text-sm font-medium text-gray-400"
          >
            Sign Out
          </button>
        </section>
        <section className="w-full md:w-[77%] mt-5 md:mt-0">
          {navigation === 'information' && (
            <div>
              <p className="text-lg">Your Details</p>

              <div className="mt-5">
                <form>
                  <div className="mb-14 flex flex-col gap-5">
                    <div className="flex items-center gap-5">
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name || ''}
                        placeholder={user.user?.first_name || 'First Name'}
                        onChange={handleInputChange}
                        className="w-2/4 py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                      />
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name || ''}
                        placeholder={user.user?.last_name || 'Last Name'}
                        onChange={handleInputChange}
                        className="w-2/4 py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                      />
                    </div>

                    <input
                      type="number"
                      name="phone_number"
                      value={formData.phone_number || ''}
                      placeholder={user.user?.phone_number || 'Phone'}
                      onChange={handleInputChange}
                      className="w-full py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                    />
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name || ''}
                      onChange={handleInputChange}
                      placeholder={user.user?.company_name || 'Company (Optional)'}
                      className="w-full py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                    />
                  </div>

                  {/* delivery details */}
                  <div className="border-t border-gray-300 pt-3">
                    <p className="text-lg mb-5">Delivery Details</p>

                    <div className="flex flex-col gap-5">
                      <input
                        type="text"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        placeholder={user.user?.address || 'Address'}
                        className="w-full py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                      />

                      <input
                        type="text"
                        name="apartment_or_floor"
                        value={formData.apartment_or_floor || ''}
                        onChange={handleInputChange}
                        placeholder={
                          user.user?.apartment_or_floor || 'Apartment, Suite, Floor etc (Optional)'
                        }
                        className="w-full py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                      />

                      <div className="flex items-center gap-5">
                        <input
                          type="text"
                          name="city"
                          value={formData.city || ''}
                          onChange={handleInputChange}
                          placeholder={user.user?.city || 'City/Region'}
                          className="w-[50%] py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                        />
                        <input
                          type="text"
                          name="state"
                          value={formData.state || ''}
                          onChange={handleInputChange}
                          placeholder={user.user?.state || 'State'}
                          className="w-[50%] py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                        />
                        {/* <input
                          type="text"
                          name="country"
                          value={formData.country || ''}
                          onChange={handleInputChange}
                          placeholder="Country"
                          className="w-[33%] py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                        /> */}
                      </div>

                      <input
                        type="text"
                        name="country"
                        value={formData.country || ''}
                        onChange={handleInputChange}
                        placeholder={user.user?.country || 'Country/Region'}
                        className="w-full py-3 px-5 border border-gray-300 placeholder:text-gray-600 text-xs placeholder:text-xs text-black"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleProfileUpdate}
                    className="py-3 text-xs border border-black rounded-sm w-[40%] mt-10 hover:scale-95 duration-500 transition-all hover:bg-black hover:text-white"
                  >
                    {isLoading ? 'Loading...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {navigation === 'orders' && (
            <div className="w-full">
              <p className="text-lg">Your Orders</p>

              <div className="mt-5 flex flex-col md:flex-row justify-between items-start">
                <section className="w-full md:w-[48%] flex flex-col gap-3 h-[40vh] md:max-h-[60vh] overflow-y-scroll overflow-hidden">
                  {orders &&
                    orders.map((order) => (
                      <section
                        onClick={() => {
                          setSelectedStatus(order);
                          setSelectedId(Number(order.id));
                        }}
                        className={`w-full cursor-pointer border-2 p-3 rounded-sm ${
                          selectedId === Number(order.id) ? 'border-[#FFC9A5]' : 'border-gray-200'
                        }`}
                      >
                        <div>
                          <h1 className="text-xs font-medium">Order ID: {order.id}</h1>
                          <div className="flex justify-between mt-1">
                            <h1 className="text-[10px] text-gray-500">
                              Order Date : {order.order_date}
                            </h1>
                            <h1 className="text-[#4FC518] text-[10px]">
                              Estimated Delivery Date : {order?.deliveryDate || 0}
                            </h1>
                          </div>
                        </div>

                        {/* ----- list of products */}
                        <div className="py-2 my-2 border-t border-b border-gray-500 flex flex-col gap-3">
                          {order.products.map((product) => (
                            <>
                              {/* ----- product container */}
                              <div className="flex gap-3 items-start">
                                <div className="w-[33%] h-[13vh] overflow-hidden">
                                  <Image
                                    src={product.photo}
                                    alt=""
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex flex-col gap-2 justify-between">
                                  <p className="text-xs">{product.name}</p>
                                  <h1 className="text-xs">
                                    {product.color} / {product.size}
                                  </h1>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>

                        <div>
                          <h1 className="text-[10px] font-medium text-gray-400">
                            Delivery Address
                          </h1>
                          <h1 className="text-xs mt-1 font-medium">{order.address}</h1>
                        </div>
                      </section>
                    ))}
                </section>

                <section className="w-full md:w-[48%] bg-[#ffdcc5] p-3">
                  <h1 className="text-sm font-medium">Order Status</h1>
                  <h1 className="text-[10px] text-gray-600 mt-1">
                    Your Order is in transit to the provided delivery address
                  </h1>

                  <div className="my-2 py-2 border-t border-b border-gray-400 flex flex-col gap-4">
                    <h1 className="mt-3 text-sm font-medium">Details</h1>

                    <div className="flex justify-between items-center">
                      <h1 className="text-xs">
                        Subtotal - {selectedStatus.products?.length} item(s)
                      </h1>
                      <h1 className="text-xs">NGN {selectedStatus.productFee}</h1>
                    </div>

                    <div className="flex justify-between items-center">
                      <h1 className="text-xs">Delivery</h1>
                      <h1 className="text-xs">NGN {selectedStatus.deliveryFee}</h1>
                    </div>

                    {/* <div className="flex justify-between items-center">
                      <h1 className="text-xs">Gift wrap</h1>
                      <h1 className="text-xs">NGN {selectedStatus.giftWrap}</h1>
                    </div>

                    <div className="flex justify-between items-center">
                      <h1 className="text-xs">Taxes</h1>
                      <h1 className="text-xs">NGN {selectedStatus.taxes}</h1>
                    </div> */}
                  </div>

                  <div className="flex justify-between items-center">
                    <h1 className="text-sm font-medium">Total</h1>
                    <h1 className="text-sm font-medium">NGN {selectedStatus.totalFee}</h1>
                  </div>
                </section>
              </div>
            </div>
          )}

          {navigation === 'favorites' && (
            <div className="w-full">
              <p className="text-lg">Your Favorites</p>

              <div className="flex flex-wrap justify-between gap-2 mt-5 w-full">
                {favorites &&
                  favorites.map((favorite, i) => (
                    <NewProductItem
                      i={i}
                      id={favorite.id}
                      image={favorite.photo}
                      colors={favorite.colors}
                      title={favorite.name}
                      width="w-full md:w-[40%] lg:w-[24%]"
                    />
                  ))}
              </div>
            </div>
          )}

          {navigation === 'reviews' && (
            <div className="flex flex-wrap gap-10 overflow-y-auto max-h-[50vh]">
              {Array.isArray(reviewedProducts) &&
                reviewedProducts.map((product: ReviewProduct) => (
                  <div className="w-full md:w-[40%]">
                    <div className="w-full flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <div className="max-w-full md:max-w-[30%] w-full overflow-hidden h-[20vh] md:h-20">
                        <Image
                          src={product.product_image}
                          width={200}
                          height={400}
                          alt={product.product_title}
                          className="w-full h-full object-cover hover:scale-110 duration-200 transition-all"
                        />
                      </div>

                      <div>
                        <h1 className="text-sm">{product.product_title}</h1>
                        <p className="text-xs">{product.product_price}</p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-start items-start">
                      <Stars rating={Number(product.stars)} />

                      <p className="text-xs text-gray-600">{product.review_message}</p>
                    </div>
                  </div>
                ))}
              {orders.map((order) => (
                <div className="w-full md:w-[40%]">
                  {order.products.map((product) => (
                    <>
                      <div className="w-full flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="max-w-full md:max-w-[30%] w-full overflow-hidden h-[20vh] md:h-20">
                          <Image
                            src={product.photo}
                            width={200}
                            height={400}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-110 duration-200 transition-all"
                          />
                        </div>

                        <div>
                          <h1 className="text-sm">{product.name}</h1>
                          <p className="text-xs">
                            {product.color}/{product.size}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setReviewProductId(product.productId)}
                        className="border w-full border-black mt-2.5 md:mt-1.5 py-2.5 text-sm"
                      >
                        Rate & Review
                      </button>
                    </>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      </section>

      <div className="px-10">
        <Footer />
      </div>
    </Layout>
  );
};

export default UserPage;
