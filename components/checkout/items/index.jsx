import { useSelector } from 'react-redux';

const CheckoutItems = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <ul className="w-full flex flex-col gap-3">
      {cartItems.map((item, i) => (
        <li key={i} className="w-full flex flex-col md:flex-row items-start md:items-center">
          <div className="w-full md:w-[80%] items-start md:items-center flex-col md:flex-row flex gap-4">
            <div className="w-full md:w-[30%] h-[17vh] overflow-hidden">
              <img
                src={item.photo}
                className="w-full h-full object-cover hover:scale-105 duration-300 transition-all"
              />
            </div>

            <div className="checkout-item__data">
              <h3 className="text-xs md:max-w-[70%]">{item.name}</h3>
              <div className="flex mt-5">
                {
                  item?.color && <>
                    <span
                      className={`w-4 h-4 rounded-full flex justify-center items-center border border-black bg-[${item.color}]`}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill={item.color}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full"
                      >
                        <circle cx="10" cy="10" r="8" fill={item.color} />
                      </svg>
                    </span>/
                  </>
                }
                {item?.size && item.size}
              </div>
            </div>
          </div>
          <h1 className="text-xs font-medium">NGN {item.price && item.price.toLocaleString()} X {item.quantity}</h1>
        </li>
      ))}
    </ul>
  );
};

export default CheckoutItems;
