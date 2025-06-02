import { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb';
import ProductsFeatured from '../../components/products-featured';
import Content from '../../components/product-single/content';

import { useRouter } from 'next/router';
import NewProductItem from '../../components/product/index';
import Image from 'next/image';

interface Product {
  name: string;
  price: number;
  delivery: string;
  mainImage: string | undefined;
  extraImages: any;
  youMightAlsoLike: [
    {
      id: number;
      title: string;
      amount: number;
      colors: string[];
      image: string;
      price: number;
    }
  ];
  id: string;
  title: string;
  amount: number;
  colors: string[];
  description: string;
  reviews: {
    name: string;
    review: string;
    rating: number;
  }[];
  returnPolicy: string;
  image: string;
  moreImages: string[];
  completeLook: {
    id: any;
    title: string;
    amount: number;
    colors: [];
    image: string;
  }[];
  path?: undefined;
}

const Product = () => {
  const [currentProduct, setCurrentProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { pid, isFrag } = router.query;
  const isFragBoolean = isFrag === 'true';

  useEffect(() => {
    const fetchCategoryData = async (id: number) => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/site/product/${id}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('data', data);

        setTimeout(() => {
          setCurrentProduct(data);
          setIsLoading(false);
        }, 2);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    if (pid) {
      fetchCategoryData(Number(pid));
    }
  }, [pid, isFragBoolean]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col gap-4 justify-center items-center text-lg h-[50vh]">
          <Image width={250} height={250} src="/animated.svg" alt="Loading animation" />
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!currentProduct) {
    return (
      <Layout>
        <div className="flex flex-col gap-4 justify-center items-center text-lg h-[50vh]">
          <Image width={250} height={250} src="/animated.svg" alt="No data" />
          <div className="text-center">
            <p>Apologies, this category is still being populated,</p>
            <p>Kindly Check Back Later</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout className="px-5 md:px-10">
      <Breadcrumb title={currentProduct?.title} />

      <section className="product-single">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-14">
            <div className="lg:w-[50%] w-full overflow-hidden">
              <div
                className={`${
                  isFrag ? 'flex-col' : 'flex-col lg:flex-row'
                } flex items-start gap-1 w-full`}
              >
                <div
                  className={`${currentProduct.moreImages?.length > 0 ? 'w-[63%]' : 'w-full'} ${
                    isFrag && 'w-full'
                  } h-[40vh] md:h-[64vh] overflow-hidden`}
                >
                  <img
                    src={currentProduct.mainImage}
                    alt=""
                    className="w-full h-full hover:scale-105 duration-300 transition-all object-cover"
                  />
                </div>

                <div
                  className={`${
                    isFrag
                      ? 'flex-row w-[63%] justify-between'
                      : 'flex-col w-full lg:w-[37%] h-[64vh]'
                  } flex justify-between `}
                >
                  {currentProduct.extraImages?.length > 0 &&
                    currentProduct.extraImages.map((image: any, i: any) => (
                      <div className="h-[31.5vh] overflow-hidden">
                        <img
                          key={i}
                          src={image}
                          alt=""
                          className="w-full h-full object-cover hover:scale-105 duration-300 transition-all"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* --complete look */}

              {!isFrag &&
                currentProduct.youMightAlsoLike &&
                currentProduct?.youMightAlsoLike.length > 0 && (
                  <div className="w-full">
                    <h1 className="text-sm font-medium my-5">Complete the look</h1>
                    <div className="mt-1 grid grid-flow-col auto-cols-max overflow-x-auto max-h-[60vh] gap-3">
                      {currentProduct.youMightAlsoLike.map((data, i) => (
                        <NewProductItem
                          completeLook={true}
                          width="w-64"
                          image={data.image}
                          id={data.id}
                          title={data.title}
                          amount={data.price}
                          colors={data.colors}
                          i={i}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
            {/* <Gallery images={product.images} /> */}
            <Content product={currentProduct} isFrag={isFrag} />
          </div>
        </div>
      </section>

      <ProductsFeatured header="Matches Your Style" subHeader="You May Also Like" isFrag={isFrag} />
      <Footer />
    </Layout>
  );
};

export default Product;
