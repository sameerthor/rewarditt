import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import "@/styles/choose-cat.css";
import Link from 'next/link';
export default function catType({ categories,topRatedStores,featuredStores,topOnlineStores }) {

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
                        <div className="row row-cols-md-4">
                            <div className="col">
                                <Link href="/coupon/category" class="card">
                                    <div className="card-icon">🎟️</div>
                                    <h2>Coupons</h2>
                                    <p>Browse exclusive discounts and deals on top brands.</p>
                                </Link>
                            </div>
                            <div className='col'>
                                <Link href="/gift-card/category" class="card">
                                    <div className="card-icon">🎁</div>
                                    <h2>Gift Cards</h2>
                                    <p>Shop gift cards for any occasion, any brand.</p>
                                </Link>
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
