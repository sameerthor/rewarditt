import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from "next/link";
import "@/styles/blogs.css";
import Image from 'next/image'
import { NextSeo } from 'next-seo';

export async function getStaticProps() {
  const res = await fetch('https://admin.rewarditt.com/posts/',{
  headers: {
    'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
  },
});
  const data = await res.json();

  return {
    props: {
      allPosts: data || [],
    },
    revalidate: 60, // optional: regenerate every 60s
  };
}

export default function BlogListing({ allPosts }) {
  const limit = 6; // posts per page
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const start = (pageNumber - 1) * limit;
    const end = start + limit;
    setPosts(allPosts.slice(start, end));
  }, [pageNumber, allPosts]);

  return (
    <>
      <NextSeo
         title='Blogs - rewarditt'
        description='Explore the latest articles and insights from rewarditt to grow your business.'
     />

      <section className="blog-listing-page">
        <div className="container">
          <div className="row">
            <div className="breadcrumb">
              <ul>
                <li>
                  <a href="/">rewarditts.com</a> /
                </li>
                <li>blogs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="list-blog">
            <div className="row row-cols-1 row-cols-lg-3 row-cols-md-3">
               {posts.map((item, index) => (
                  <div className="col mb-3">
                      <div className="listingItem" key={index}>
                        <h2 className="listingTitle">
                          <Link href={`/blog/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h2>
                        <div className="listingImage">
                          <Link href={`/blog/${item.slug}`}>
                            <Image 
                                  src={item.image && item.image.trim() !== "" ? item.image : "/images/placeholder.webp"}
                                  alt={item.title} 
                                  width={400} 
                                  height={200} 
                                  layout="responsive"
                                  priority 
                            />
                          </Link>
                        </div>
                        <div className="blogDesc">
                          <p>{item.meta_description || 'No description available'}</p>
                        </div>
                      </div>
                  </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <ul>
                {pageNumber !== 1 && (
                  <li>
                    <a href="javascript:void(0)" onClick={() => setPageNumber(pageNumber - 1)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                        <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                      </svg>
                    </a>
                  </li>
                )}

                {Array.from({ length: Math.ceil(allPosts.length / limit) }).map((_, i) => (
                  <li key={i}>
                    <a
                      href="javascript:void(0)"
                      className={pageNumber === i + 1 ? 'active' : ''}
                      onClick={() => setPageNumber(i + 1)}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}

                {pageNumber !== Math.ceil(allPosts.length / limit) && (
                  <li>
                    <a href="javascript:void(0)" onClick={() => setPageNumber(pageNumber + 1)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-chevron-double-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                        />
                        <path
                          fillRule="evenodd"
                          d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                        />
                      </svg>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
