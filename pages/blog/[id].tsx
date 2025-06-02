import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Layout from '../../layouts/Main';
import Footer from 'components/footer';
import Image from 'next/image';

interface GetBlog {
  id: number;
  title: string;
  image: string;
  body: string;
  date: string;
  extra_images: [string];
}

const Blog = () => {
  const [blog, setBlog] = useState<GetBlog>({} as GetBlog);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const fetchBlogDetail = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/site/blogs/${id}`);
      const data = await response.json();

      setTimeout(() => {
        setBlog(data.blog as GetBlog);
      }, 2);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, []);

  return (
    <Layout className="px-5 md:px-10">
      {isLoading ? (
        <div>
          <Image width={250} height={250} src="/animated.svg" alt="" />
        </div>
      ) : (
        <section className="my-10">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center py-4">
            <p className="text-base md:text-sm">{blog.title}</p>

            <p className="text-[10px] md:text-xs mt-2 md:mt-0">
              {new Date(blog.date).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>
          </header>

          <div className="max-h-[70vh] overflow-hidden max-w-full flex justify-center items-center">
            <Image
              src={blog.image}
              alt=""
              className="w-full h-full object-cover hover:scale-105 duration-500 transition-all"
              width={200}
              height={200}
            />
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-5 items-start mt-3">
            {/* more images */}
            <div className="lg:w-[20%] md:w-[40%] w-full flex flex-col gap-2 max-h-[80vh] overflow-y-auto overflow-hidden">
              {blog.extra_images &&
                blog.extra_images.map((data, i) => (
                  <div className="h-[35vh] overflow-hidden w-full">
                    <img
                      key={i}
                      src={data}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 duration-500 transition-all"
                    />
                  </div>
                ))}
            </div>

            <div className="w-full md:w-[75%]">
              {blog.body && (
                <div className="mt-2">
                  <div
                    className="text-sm prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: blog.body }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </Layout>
  );
};

export default Blog;
