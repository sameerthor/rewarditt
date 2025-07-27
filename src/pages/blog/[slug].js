import Head from 'next/head';
import Link from "next/link";
import "@/styles/blog-details.css";
import Image from 'next/image';
import { NextSeo } from 'next-seo';

export default function BlogDetail({ post }) {
  if (!post) return <p>Blog not found</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const isUpdated = post.updated_at && post.updated_at !== post.created_at;
  const label = isUpdated ? 'Updated on' : 'Published on';
  const displayDate = formatDate(isUpdated ? post.updated_at : post.created_at);

  let categoryTitle = 'Uncategorized';
  if (post.category) {
    if (typeof post.category === 'string') {
      categoryTitle = post.category;
    } else if (typeof post.category === 'object' && post.category.title) {
      categoryTitle = post.category.title;
    }
  }

  return (
    <>
      <NextSeo title={post.meta_title} description={post.meta_description} />
      <section className="blog-details-page">
        <div className="container">
          <div className="row">
            <div className="breadcrumb">
              <ul>
                <li>
                  <Link href="/">rewarditts.com</Link> /
                </li>
                <li>{post.title}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="blogBox">
            <div className="blogdetail">
              <div className="blogContent">
                <div>
                  <h1 className="blogTitle">{post.title}</h1>
                </div>
                <div className="autorbox">
                  <div className="authorImg">
                    <Image
                      src="/images/mashma-m.webp"
                      width={38}
                      height={38}
                      alt="Blog Author"
                      title="Blog Author"
                    />
                  </div>
                  <span className="authorName">Mashma M</span>
                  <span className='date'> {label}: {displayDate}</span>
                </div>
                <div className="firstImage">
                  <Image
                    src={post.image && post.image.trim() !== "" ? post.image : "/images/placeholder.webp"}
                    alt="Featured Image"
                    width={400}
                    height={300}
                    layout="responsive"
                    priority
                  />
                </div>
                <div className="blogcontentData" dangerouslySetInnerHTML={{ __html: post.body }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const res = await fetch('https://admin.rewarditt.com/posts/', {
      headers: {
        'x-api-key': process.env.SECRET_KEY,
      },
    });

    if (!res.ok) throw new Error('Failed to fetch');

    const allPosts = await res.json();
    const post = allPosts.find((p) => p.slug === slug) || null;

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      props: {
        post: null,
      },
    };
  }
}
