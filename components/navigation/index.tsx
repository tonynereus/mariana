import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Category {
  image: string[];
  subCategories: {
    byFabric: [];
    featured: [];
    giftByPrice: [];
  };
  // other properties...
}

const Navigation = () => {
  const [currentCategory, setCurrentCategory] = useState<Category>({} as Category);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [categoryData, setCategoryData] = useState<any>([]);

  const handleMouseEnter = (id: any) => {
    const foundCat = categoryData.find((obj: any) => obj.id === id);
    setCurrentCategory(foundCat ?? {});
    setShowSubCategory(true);
  };

  const handleMouseLeave = () => {
    setShowSubCategory(false);
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/site/categories`);
        const data = await response.json();

        setCategoryData(data?.categories);
      } catch (error) {
        setCategoryData([]);
        console.error('Error fetching home data:', error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div className="relative">
      <div onMouseLeave={handleMouseLeave}>
        <div className="w-full overflow-hidden overflow-x-auto px-5 md:px-0 py-3 bg-[#FFC9A5]">
          <nav className="w-fit mx-auto flex items-center gap-14 text-xs md:text-sm poppins">
            {categoryData?.map((data: any, i: number) => (
              <Link
                key={i}
                href={`/products/${data.id}`}
                onClick={handleMouseLeave}
                onMouseEnter={() => handleMouseEnter(data.id)}
                className="hover:text-white text-xs cursor-pointer"
              >
                {data.name}
              </Link>
            ))}
          </nav>
        </div>

        {showSubCategory && (
          <div
            onMouseLeave={handleMouseLeave}
            className="absolute top left-0 z-[2000] bg-white w-full flex justify-between items-start pt-5 pb-10 md:px-10"
          >
            <div className="w-[45%] flex justify-between">
              <div>
                <h1 className="font-medium">All New</h1>
                <ul className="text-sm flex flex-col gap-1.5 mt-2">
                  {currentCategory?.subCategories?.byFabric?.map((data: any, i: number) => (
                    <Link
                      href={`/products/${data.sub_cat_id}?isSubCat=true`}
                      key={i}
                      className="poppins leading-7"
                    >
                      {data.name}
                    </Link>
                  ))}
                </ul>
              </div>

              <div>
                <h1 className="font-medium">Featured</h1>
                <ul className="text-sm flex flex-col gap-1.5 mt-2">
                  {currentCategory?.subCategories?.featured?.map((data: any, i: number) => (
                    <Link
                      href={`/products/${data.sub_cat_id}?isSubCat=true`}
                      key={i}
                      className="poppins leading-7"
                    >
                      {data.name}
                    </Link>
                  ))}
                </ul>
              </div>

              <div>
                <h1 className="font-medium">By Fabric</h1>
                <ul className="text-sm flex flex-col gap-1.5 mt-2">
                  {currentCategory?.subCategories?.giftByPrice?.map((data: any, i: number) => (
                    <Link
                      href={`/products/${data.sub_cat_id}?isSubCat=true`}
                      key={i}
                      className="poppins leading-7"
                    >
                      {data.name}
                    </Link>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center w-[45%]">
              {currentCategory?.image?.map((data: any, i: number) => (
                <div key={i} className="w-[48%] h-[38vh] overflow-hidden">
                  <Image
                    src={data}
                    alt=""
                    placeholder="blur"
                    // add mariana logo here
                    blurDataURL={data}
                    className="w-full h-full object-cover hover:scale-110 duration-500 transition-all"
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
