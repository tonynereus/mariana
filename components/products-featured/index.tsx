import { FragranceHomePage, products } from 'data';
// import ProductsCarousel from './carousel';
import NewProductItem from 'components/product';

const ProductsFeatured = ({
  isFrag,
  header = 'For You',
  subHeader = 'Handpicked For You'
}: any) => {
  return (
    <section className="mb-20">
      <header className="p-5 text-center w-full">
        <h1 className="text-xs font-medium">{header}</h1>
        <p className="text-3xl">{subHeader}</p>
      </header>

      {isFrag ? (
        <div className="mt-5 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-3 gap-y-5">
          {FragranceHomePage.forYou.map((data, i) => (
            <NewProductItem
              image={data.image}
              id={data.id}
              title={data.title}
              amount={data.amount}
              i={i}
              isFrag={isFrag}
              width="w-full"
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-3 gap-y-5">
          {products.map((data, i) => (
            <NewProductItem
              image={data.image}
              id={data.id}
              title={data.title}
              amount={data.amount}
              colors={data.colors}
              i={i}
              isFrag={isFrag}
              width="w-full"
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsFeatured;
