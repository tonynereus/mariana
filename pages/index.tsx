import Image from 'next/image';

import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro';
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { homePageData } from 'data';
import Link from 'next/link';
import ProductItem from '../components/product/index';
import Newsletter from 'components/newsletter';

interface Blog {
  id: any;
  title: string;
  created_at: string;
  image: string;
  moreImages: [];
  text: string;
}
[];

interface FeaturedProduct {
  id: any;
  path: string;
  image: string;
  title: string;
}
[];

const IndexPage = () => {
  const [homeData, setHomeData] = useState<any>(null);
  const [firstTwo, setFirstTwo] = useState<FeaturedProduct[]>([]);
  const [lastTwo, setLastTwo] = useState<FeaturedProduct[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchHomeData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/site/home-data`);
      const data = await response.json();
      setHomeData(data);

      const first = data.featuredProducts.slice(0, 2);
      const last = data.featuredProducts.slice(-2);

      setFirstTwo(first);
      setLastTwo(last);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/site/blogs`);
      const data = await response.json();

      setBlogs(data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    // Fetch data on component mount

    fetchBlogs();
    fetchHomeData();
  }, []);

  return (
    <Layout>
      <PageIntro images={homeData?.heroSection} height="h-[20vh] md:h-[70vh]" />

      <section className="px-5 md:px-10 text-center">
        <div className="my-10">
          <h1 className="text-xs font-medium">Explore our Trending Products</h1>
          <p className="text-3xl">Featured Product</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 justify-between items-start w-full md:h-[65vh]">
          <div className="w-full h-full md:w-[35%] flex flex-col gap-3 justify-between">
            {firstTwo.map((data: any, i: number) => (
              <div key={i} className="relative w-full h-[30vh] md:h-[50%] overflow-hidden">
                <Image
                  key={i}
                  width={300}
                  height={100}
                  className="w-full h-full object-cover"
                  placeholder="blur" // add mariana logo here
                  blurDataURL={data.image}
                  alt={data.title}
                  src={`${data.image}`}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50 z-5"></div>

                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-10">
                  <div className="text-white">
                    <p>{data.title}</p>
                    <Link href={`/product/${data.id}`} className="underline text-xs mt-3">
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-full md:w-[65%] flex flex-col md:flex-row gap-3 justify-between">
            {lastTwo.map((data: any, i: number) => (
              <div key={i} className="relative w-full h-[30vh] md:h-auto md:w-[50%]">
                <Image
                  key={i}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  placeholder="blur" // add mariana logo here
                  blurDataURL={data.image}
                  alt={data.title}
                  src={`${data.image}`}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50 z-5"></div>
                {/* text container */}
                <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-10">
                  {/* main container */}
                  <div className="text-white">
                    <p>{data.title}</p>
                    <Link href={`/product/${data.id}`} className="underline text-xs mt-3">
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fregrance Ad */}
      <div className="my-5 md:my-10 w-full h-[35vh] md:h-[80vh] object-cover">
        <Link href={`/fragrance?isFrag=true`}>
          <Image
            width={1000}
            height={1000}
            src={homePageData.fregranceAd}
            alt="fregrance-ad"
            className="w-full h-full"
          />
        </Link>
      </div>

      {/* for you */}
      <div className="lg:p-10 p-5 md:p-8 mt-5 text-center border-b mb-5">
        <h1 className="text-xs font-medium">For You</h1>
        <p className="text-3xl">Handpicked For You</p>

        <div className="mt-5 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 md:gap-3 gap-y-5">
          {homeData?.forYouProducts.map((data: any, i: number) => (
            <ProductItem
              image={data.image}
              id={data.id}
              title={data.title}
              amount={data.price}
              colors={data.colors}
              i={i}
              key={i}
              width="w-full"
            />
          ))}
        </div>
      </div>

      {/* --- newsletter */}
      <Newsletter />

      {/* --- community Ad */}
      <div className="py-10 mt-5 bg-[#FFC9A5] text-center">
        <h1 className="text-xs font-medium">#MarianaSecret</h1>
        <p className="text-3xl">Join Our Community</p>

        <div className="mt-5 flex flex-col md:flex-row items-center w-full">
          {homePageData.communityAd.map((data, i) => (
            <div key={i} className="relative w-full group">
              {/* Image */}
              <Image
                src={data}
                alt="community"
                width={250}
                height={250}
                placeholder="blur"
                blurDataURL={data}
                className="w-full h-full object-cover"
              />

              {/* Overlay (Hidden by default) */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link
                  className="w-10 hover:scale-75 transition-all duration-500"
                  href="/instagram.com"
                >
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.3993 2.66699H21.5993C25.866 2.66699 29.3327 6.13366 29.3327 10.4003V21.6003C29.3327 23.6513 28.5179 25.6183 27.0676 27.0686C25.6174 28.5189 23.6504 29.3337 21.5993 29.3337H10.3993C6.13268 29.3337 2.66602 25.867 2.66602 21.6003V10.4003C2.66602 8.34932 3.48078 6.38231 4.93106 4.93203C6.38134 3.48175 8.34834 2.66699 10.3993 2.66699ZM10.1327 5.33366C8.85964 5.33366 7.63874 5.83937 6.73857 6.73955C5.8384 7.63972 5.33268 8.86062 5.33268 10.1337V21.867C5.33268 24.5203 7.47935 26.667 10.1327 26.667H21.866C23.1391 26.667 24.36 26.1613 25.2601 25.2611C26.1603 24.3609 26.666 23.14 26.666 21.867V10.1337C26.666 7.48033 24.5193 5.33366 21.866 5.33366H10.1327ZM22.9993 7.33366C23.4414 7.33366 23.8653 7.50925 24.1779 7.82181C24.4904 8.13437 24.666 8.5583 24.666 9.00033C24.666 9.44235 24.4904 9.86628 24.1779 10.1788C23.8653 10.4914 23.4414 10.667 22.9993 10.667C22.5573 10.667 22.1334 10.4914 21.8208 10.1788C21.5083 9.86628 21.3327 9.44235 21.3327 9.00033C21.3327 8.5583 21.5083 8.13437 21.8208 7.82181C22.1334 7.50925 22.5573 7.33366 22.9993 7.33366ZM15.9993 9.33366C17.7675 9.33366 19.4632 10.036 20.7134 11.2863C21.9636 12.5365 22.666 14.2322 22.666 16.0003C22.666 17.7684 21.9636 19.4641 20.7134 20.7144C19.4632 21.9646 17.7675 22.667 15.9993 22.667C14.2312 22.667 12.5355 21.9646 11.2853 20.7144C10.0351 19.4641 9.33268 17.7684 9.33268 16.0003C9.33268 14.2322 10.0351 12.5365 11.2853 11.2863C12.5355 10.036 14.2312 9.33366 15.9993 9.33366ZM15.9993 12.0003C14.9385 12.0003 13.9211 12.4218 13.1709 13.1719C12.4208 13.922 11.9993 14.9395 11.9993 16.0003C11.9993 17.0612 12.4208 18.0786 13.1709 18.8288C13.9211 19.5789 14.9385 20.0003 15.9993 20.0003C17.0602 20.0003 18.0776 19.5789 18.8278 18.8288C19.5779 18.0786 19.9993 17.0612 19.9993 16.0003C19.9993 14.9395 19.5779 13.922 18.8278 13.1719C18.0776 12.4218 17.0602 12.0003 15.9993 12.0003Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- blog posts */}
      {blogs.length > 0 && (
        <div className="py-10 mt-5 text-center">
          <h1 className="text-xs font-medium">Lifestyle</h1>
          <p className="text-3xl">Blog Posts</p>

          <div className="mt-5 flex flex-col md:flex-row justify-evenly items-center">
            {blogs.map((data: any, i: number) => (
              <div key={i} className="relative w-full">
                <Image
                  key={i}
                  src={data.image}
                  alt="community"
                  width={320}
                  height={320}
                  placeholder="blur"
                  blurDataURL={data.image}
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 w-full h-1/3 text-white bg-black bg-opacity-70 flex flex-col justify-start items-start p-7 z-10">
                  <p className="text-[10px]">{data.created_at}</p>
                  <Link href={`/blog/${data.id}`} className="text-sm text-left mt-2">
                    {data.title}
                  </Link>
                  <p className="text-[10px] text-left mt-2">
                    {new Date(data.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <ProductsFeatured />
      <Subscribe /> */}
      <Footer />
    </Layout>
  );
};

export default IndexPage;
