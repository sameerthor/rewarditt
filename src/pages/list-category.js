import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import "@/styles/category.css";
import Link from 'next/link';
import Image from 'next/image';
export default function couponCat({ }) {

    const getHeading = (title) => {
        if (!title) return "";
    
        // Check for percentage discount (e.g., "40% OFF")
        const percentMatch = title.match(/(\d+)%/);
        if (percentMatch) {
            return `${percentMatch[1]}% OFF`;
        }
    
        // Check for dollar discount (e.g., "$40 OFF")
        const dollarMatch = title.match(/\$(\d+)/);
        if (dollarMatch) {
            return `$${dollarMatch[1]} OFF`;
        }
    
        // Check for "Free Shipping"
        if (/free shipping/i.test(title)) {
            return "Free Shipping";
        }
    
        return "";
    };



    return (
        <>
            <NextSeo
                title="Choose Category - Rewarditt.com"
                description="Choose your category between Giftcards and Coupons. We bring you different categories for both Gift card and coupons"
            />
            <MetaTags />
            <section className='categorySection'>
                    <div className="container">
                        <div className='row row-cols-2'>
                            <div className='col-lg-2 col-md-3 col-sm-4 category-box'>
                                <div className='category-item'>
                                    <div className='cat-img'>
                                        <a href="#">
                                            <Image
                                              width={100}
                                              height={100}
                                              src="/images/Placeholder.png"
                                            
                                            />
                                        </a>
                                    </div>
                                    <div className='category-title'>  
                                        <a href="#">Category Title</a>      
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-3 col-sm-4 category-box'>
                                <div className='category-item'>
                                    <div className='cat-img'>
                                        <a href="#">
                                            <Image
                                              width={100}
                                              height={100}
                                              src="/images/Placeholder.png"
                                            
                                            />
                                        </a>
                                    </div>
                                    <div className='category-title'>  
                                        <a href="#">Category Title</a>      
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-3 col-sm-4 category-box'>
                                <div className='category-item'>
                                    <div className='cat-img'>
                                        <a href="#">
                                            <Image
                                              width={100}
                                              height={100}
                                              src="/images/Placeholder.png"
                                            
                                            />
                                        </a>
                                    </div>
                                    <div className='category-title'>  
                                        <a href="#">Category Title</a>      
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-3 col-sm-4 category-box'>
                                <div className='category-item'>
                                    <div className='cat-img'>
                                        <a href="#">
                                            <Image
                                              width={100}
                                              height={100}
                                              src="/images/Placeholder.png"
                                            
                                            />
                                        </a>
                                    </div>
                                    <div className='category-title'>  
                                        <a href="#">Category Title</a>      
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-3 col-sm-4 category-box'>
                                <div className='category-item'>
                                    <div className='cat-img'>
                                        <a href="#">
                                            <Image
                                              width={100}
                                              height={100}
                                              src="/images/Placeholder.png"
                                            
                                            />
                                        </a>
                                    </div>
                                    <div className='category-title'>  
                                        <a href="#">Category Title</a>      
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-2 col-md-3 col-sm-4 category-box'>
                                <div className='category-item'>
                                    <div className='cat-img'>
                                        <a href="#">
                                            <Image
                                              width={100}
                                              height={100}
                                              src="/images/Placeholder.png"
                                            
                                            />
                                        </a>
                                    </div>
                                    <div className='category-title'>  
                                        <a href="#">Category Title</a>      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
}

export async function getStaticProps() {


    return {
        props: {
          
        },
        revalidate: 10, // ISR - revalidate every 10 seconds
    };
}
