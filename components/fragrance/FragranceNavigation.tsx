import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const FragranceNavigation = () => {
  const [categoryData, setCategoryData] = useState<any>([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/site/fragrance/homepage`);
        const data = await response.json();
        setCategoryData(data.data.subcategories_nav);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <div className="relative">
      <div>
        <div className="w-full overflow-hidden overflow-x-auto px-5 md:px-0 py-3 bg-black text-white">
          <nav className="w-fit mx-auto flex items-center gap-14 text-sm poppins">
            {categoryData.map((data: any, i: number) => (
              <Link
                key={i}
                href={`/products/${data.id}?isFrag=true`}
                className="hover:text-white text-xs cursor-pointer"
              >
                {data.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FragranceNavigation;
