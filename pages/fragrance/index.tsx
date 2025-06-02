import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/Main';
import { FragranceHomePage } from 'data';
import { FragranceSlider } from '../../components/fragrance/FragranceSlider';
import NewProductItem from 'components/product';
import Image from 'next/image';
import Link from 'next/link';
import Footer from 'components/footer';
import Newsletter from 'components/newsletter';

const Fragrance = () => {
  const [zoomIn, setZoomIn] = useState(false);
  const [homeData, setHomeData] = useState<any>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/site/fragrance/homepage`);
        const data = await response.json();

        setHomeData(data.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  useEffect(() => {
    const firstZoomInTimeout = setTimeout(() => {
      setZoomIn(true);
    }, 3000);

    const interval = setInterval(() => {
      setZoomIn((prevZoomIn) => !prevZoomIn);
    }, 12000);

    return () => {
      clearTimeout(firstZoomInTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Layout>
      <section className="">
        <div className="h-[40vh] md:h-[70vh] overflow-hidden">
          <img
            src={FragranceHomePage.heroImg}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-in-out ${
              zoomIn ? 'scale-[1.5]' : 'scale-100'
            }`}
          />
        </div>
        <div className="hidden md:block">
          <FragranceSlider heroCarousel={FragranceHomePage.heroCarousel} />
        </div>
      </section>

      {/* ---- for you section */}
      <div className="p-0 md:p-10 mt-5 text-center mb-5">
        <h1 className="text-xs font-medium">For You</h1>
        <p className="text-3xl">Exclusive to You</p>

        <div className="mt-5 grid md:grid-cols-4 lg:grid-cols-6 md:gap-3 gap-y-5">
          {homeData?.forYou.map((data: any, i: number) => (
            <NewProductItem
              width="w-full"
              image={data.photo}
              id={data.id}
              title={data.title}
              amount={data.price}
              i={i}
              isFrag={true}
            />
          ))}
        </div>
      </div>

      {/* ---- sample images */}
      <div className="flex flex-col md:flex-row flex-wrap">
        {homeData?.subcategories.map((data: any, i: number) => (
          <div className="w-full md:w-[50%] overflow-hidden relative">
            <Image
              src={data.photo}
              alt=""
              key={i}
              className="w-full h-full object-cover"
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={data.photo}
            />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="w-full h-full text-white flex justify-center items-center flex-col gap-1">
                <p className="text-sm">{data.name}</p>
                <Link
                  href={`/products/${data.id}?isFrag=true`}
                  className="poppins text-sm underline"
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Newsletter />

      <Footer />
    </Layout>
  );
};

export default Fragrance;
