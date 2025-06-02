import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Main';
import Image from 'next/image';
import Breadcrumb from 'components/breadcrumb';
import NewProductItem from 'components/product';
import Footer from 'components/footer';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import axios from 'axios';

interface Category {
  favorites: any;
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

interface Favorite {
  id: number;
  name: string;
  description: string;
  photo: string;
  colors: string[];
}

const Favorites = () => {
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const token = useSelector((state: any) => state.user.token);

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

  const fetchCategoryData = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/user/favorites`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `${localStorage.getItem('mariana-token')}`
        }
      });
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

  useEffect(() => {
    fetchCategoryData();
    fetchFavorites();
  }, []);

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
            <p>You haven't liked any product yet</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-5 md:px-10 my-5">
        <div className="flex items-center justify-between my-7 md:my-0">
          <Breadcrumb title="Favorites" />
          <button type="button" className="text-xs">
            Filter by
          </button>
        </div>

        <div className="flex gap-9 justify-start gap-y-10 md:gap-y-3 flex-wrap">
          {favorites &&
            favorites.map((product: any, i: number) => (
              <Link href={`/product/${product.id}`} className="md:w-[22%] w-full">
                <NewProductItem
                  i={i}
                  key={product.id}
                  id={product.id}
                  image={product.photo}
                  colors={product.colors}
                  title={product.name}
                  width="w-full"
                />
              </Link>
            ))}
        </div>

        <div className="w-full flex justify-center items-center my-16">
          <button type="button" className="w-fit mx-auto px-5 py-2 border border-black">
            Load More
          </button>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};

export default Favorites;
