import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Main';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Breadcrumb from 'components/breadcrumb';
import NewProductItem from 'components/product';
import Footer from 'components/footer';

interface Category {
  id: number;
  categoryName: string;
  subCategoryName: string;
  subCategoryDescription: string;
  categoryDescription: string;
  subCategoryImage: string;
  categoryImage: string;
  products: {
    colors: string[];
    id: number;
    title: string;
    price: number;
    image: string;
  }[];
}

const Products = () => {
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id, isFrag, isSubCat } = router.query;

  const isFragBoolean = isFrag === 'true';
  const isSubCatBoolean = isSubCat === 'true';
  let apiUrl;

  useEffect(() => {
    const fetchCategoryData = async (id: number) => {
      try {
        if (isFragBoolean) {
          apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/site/fragrance-products/${id}`;
        } else if (isSubCatBoolean) {
          apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/site/sub-category-products/${id}`;
        } else {
          apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/site/category-products/${id}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        setTimeout(() => {
          setCurrentCategory(data);
          setIsLoading(false);
        }, 2);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCategoryData(Number(id));
    }
  }, [id, isFragBoolean]);

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

  if (!currentCategory) {
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
    <Layout>
      <div className="px-5 md:px-10 my-5">
        <header
          className={`${
            isFragBoolean ? 'bg-black text-white' : 'text-black bg-[#fad1b6]'
          } w-full flex flex-col md:flex-row`}
        >
          <div className="w-full md:w-[50%] p-5 flex flex-col justify-center items-center text-center">
            <div className="flex items-center">
              <p className="text-xl md:text-lg">{currentCategory.categoryName} </p>
              {currentCategory.subCategoryName && (
                <p className="text-lg md:text-base ml-1">- {currentCategory.subCategoryName}</p>
              )}
            </div>

            <h1 className="md:max-w-[80%] text-xs md:text-sm leading-6 mt-2">
              {currentCategory.categoryDescription || currentCategory.subCategoryDescription}
            </h1>
          </div>
          <div className="w-full h-[50vh] md:w-[50%] overflow-hidden">
            <Image
              className="w-full h-full object-cover hover:scale-110 duration-500 transition-all"
              src={currentCategory.categoryImage || currentCategory.subCategoryImage}
              alt="Category"
              width={200}
              height={200}
            />
          </div>
        </header>

        <div className="flex items-center justify-between my-7 md:my-0">
          <Breadcrumb title={currentCategory.categoryName} />
          <button type="button" className="text-xs">
            Filter by
          </button>
        </div>

        <div className="mt-5 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-3 gap-y-5">
          {currentCategory.products.length > 0 &&
            currentCategory.products.map((product, i) => (
              <NewProductItem
                i={i}
                key={product.id}
                id={product.id}
                image={product.image}
                colors={product.colors}
                amount={product.price}
                title={product.title}
                width="w-full"
              />
            ))}
        </div>

        {currentCategory.products.length === 0 && (
          <div className="w-full flex flex-col gap-4 justify-center items-center text-lg h-[50vh]">
            <Image width={250} height={250} src="/animated.svg" alt="No data" />
            <div className="text-center">
              <p>Apologies, this category is still being populated,</p>
              <p>Kindly Check Back Later</p>
            </div>
          </div>
        )}

        {/* <div className="w-full flex justify-center items-center my-16">
          <button type="button" className="w-fit mx-auto px-5 py-2 border border-black">
            Load More
          </button>
        </div> */}

        <Footer />
      </div>
    </Layout>
  );
};

export default Products;
