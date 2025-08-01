import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import "@/styles/coupon-cat.css";
import Link from 'next/link';
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
            <section className='catType'>
                    <div className="container">
                    
                        {/* ✅ Category Banner */}
                            <div className="category-banner">
                                <div className="category-info">
                                <img src="/images/800-kicks.webp" alt="Fashion" className="category-logo" />
                                <div className="category-details">
                                    <div className="category-name">Fashion</div>
                                    <div className="offer-count">3 Offers Available</div>
                                </div>
                                </div>
                            </div>

                            {/* ✅ Reward Offers Grid */}
                            <div className="reward-grid">
                                <div className="reward-card">
                                <img src="/images/800-kicks.webp" alt="Brand 1" className="brand-logo" />
                                <div className="reward-title">Flat ₹500 Off</div>
                                <div className="reward-description">Use this reward on Myntra orders above ₹1999.</div>
                                <button className="claim-btn">Claim Offer</button>
                                </div>

                                <div className="reward-card">
                                <img src="/images/800-kicks.webp" alt="Brand 2" className="brand-logo" />
                                <div className="reward-title">Buy 1 Get 1 Free</div>
                                <div className="reward-description">Offer valid on selected apparel at Lifestyle stores.</div>
                                <button className="claim-btn">Claim Offer</button>
                                </div>

                                <div className="reward-card">
                                <img src="/images/800-kicks.webp" alt="Brand 3" className="brand-logo" />
                                <div className="reward-title">Extra 15% Cashback</div>
                                <div className="reward-description">Get 15% cashback on using HDFC card at Zara.</div>
                                <button className="claim-btn">Claim Offer</button>
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
