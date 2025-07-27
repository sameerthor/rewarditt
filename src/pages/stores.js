import { useState } from "react";
import "@/styles/a-z.css";
import { NextSeo } from "next-seo";
import Link from "next/link";
const baseDomain = "rewarditt.com"
export default function Stores({ initialStoreData }) {
    console.log(initialStoreData)
    const [storeData, setStoreData] = useState(initialStoreData);
    const [pageNumbers, setPageNumbers] = useState(
        Object.keys(initialStoreData).reduce((acc, key) => ({ ...acc, [key]: 1 }), {})
    );
    const [loading, setLoading] = useState({});
    const [hasMore, setHasMore] = useState(
        Object.keys(initialStoreData).reduce((acc, key) => ({
            ...acc,
            [key]: initialStoreData[key]?.length > 0, // Check if initial data is available
        }), {})
    );

    const alphabets = ["0-9", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))];

    const handleLoadMore = async (letter) => {
        if (!hasMore[letter]) return; // If no more data, stop fetching

        setLoading((prev) => ({ ...prev, [letter]: true }));
        try {
            const nextPage = pageNumbers[letter] + 1;
            const response = await fetch(
                `https://admin.rewarditt.com/store-page/alphabetical-filter/?letter=${letter}&page=${nextPage}`, {
                headers: {
                    'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
                },
            }
            );
            const data = await response.json();

            if (data.detail === "Invalid page.") {
                setHasMore((prev) => ({ ...prev, [letter]: false }));
            } else {
                setStoreData((prev) => ({
                    ...prev,
                    [letter]: [...prev[letter], ...(data.results || [])],
                }));
                setPageNumbers((prev) => ({ ...prev, [letter]: nextPage }));
            }
        } catch (error) {
            console.error(`Error loading more stores for ${letter}:`, error);
        } finally {
            setLoading((prev) => ({ ...prev, [letter]: false }));
        }
    };



    return (
        <>
            <NextSeo
                title="All Stores for 2025"
                description="Explore our All Stores page for the verified coupons, discount codes, and exclusive deals from top online stores. Save big on fashion, tech, travel, home goods, beauty products - all in one place. Updated regularly for maximum savings!"
            />
            <section className="allStorePage">
                <div className="container">
                    <div className="storeBox">
                        <div className="alpha-store">
                            <h1 className="text-center">Discover All Your Favorite Stores - Best Deals & Verified Coupons on rewarditt</h1>
                            <div className="catInfo">
                                <p>
                                    Welcome to the All Stores Page at rewarditt.com - your ultimate savings hub! We bring updated coupons, promo codes and deals for hundreds of popular online stores/retailers. Whether you are shopping for clothes, electronics, travel, beauty or home essentials, we help you save more with every purchase. Our goal is simple - to help our users grab discounted prices on their favorite products/services.
                                </p>
                                <h2>Why Browse Our All Stores Page?
                                </h2>
                                <p>
                                    <strong>Huge Collection of Storewide Deals</strong>
                                </p>
                                <p>
                                    Get a massive collection of discount codes, flash sales, limited-time offers, BOGO deals, clearance offers and exclusive deals. From top brands to niche favorites, our site has the latest discount deals for all. Simply put, we bring the deals and discounts for you - all in one convenient place. So, no more endless searching or guessing if a coupon works.
                                </p>
                                <p>
                                    <strong>Only Verified, Working Coupons
                                    </strong>
                                </p>
                                <p>
                                    Every coupon on rewarditt is tested and verified by our team. Our platform has only working deals that actually give you the discount you see. No expired or invalid promo codes! Here, you get working coupon codes and deals that are updated frequently.
                                </p>
                                <p>
                                    <strong>Quick Search, Easy Filters, Instant Results</strong>
                                </p>
                                <p>
                                    Finding the right coupon is easy with rewarditt. Our simple search bar and filter options let you narrow your search by store name, shopping category or keywords like “free shipping”, “today’s deals”, “first order discount”, “student discount”, etc. Whatever you are shopping for, we make it simple to discover deals that match exactly what you need. Just quick, hassle-free savings for you!
                                </p>
                                <p>
                                    <strong>Stay Ahead with Personalized Alerts
                                    </strong>
                                </p>
                                <p>
                                    Sign up for a free rewarditt account and never miss a deal again. Get instant alerts when your favorite stores drop new coupons or run sales on events like Black Friday, Cyber Monday, New Year, Christmas, Halloween, and Valentine’s Day. Be the first to grab them!
                                </p>
                                <p>
                                    <strong>Mobile-Friendly Site</strong>
                                </p>
                                <p>
                                    Shopping on the go? rewarditt is fully optimized for mobile devices. So you can browse the latest deals and coupons anytime, anywhere. Whether you are on your phone or tablet, finding discounts is simple - shop and save even while you’re on the move.
                                </p>
                                <p>
                                    Explore your favorite stores, grab verified coupons and enjoy a better way to shop! Visit rewarditt.com and start saving on every purchase you make!
                                </p>
                            </div>
                            <div>
                                <p className="all_list">
                                    {alphabets.map((c) => (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const target = document.querySelector(`#alpha${c.toUpperCase()}`);
                                                if (target) {
                                                    window.scrollTo({
                                                        top: target.offsetTop - 30,
                                                        behavior: "smooth",
                                                    });
                                                }
                                            }}
                                            className="getStore"
                                            aria-label={`Scroll to ${c.toUpperCase()} section`}
                                            key={c}
                                        >
                                            {c.toUpperCase()}
                                        </button>
                                    ))}
                                </p>
                            </div>

                            {Object.keys(storeData).map((c) => (
                                <div className="storeList" id={`alpha${c.toUpperCase()}`} key={c}>
                                    {storeData[c].length > 0 ? (
                                        <ul>
                                            {storeData[c].map((item, index) => (
                                                <li key={index}>
                                                    {/* <Image
                                                        src={item.image}
                                                        alt={`${item.title} Store Logo`}
                                                        width={25}
                                                        height={25}
                                                        className="attachment-wpcoupon_small_thumb size-wpcoupon_small_thumb"
                                                        loading="lazy"
                                                    /> */}
                                                    <Link prefetch={false} href={`/${item.slug}`}>
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="no-data-message" style={{ textAlign: "center" }}>
                                            No stores available for {c.toUpperCase()}.
                                        </p>
                                    )}
                                    {hasMore[c] && storeData[c].length > 0 && (
                                        <div className="loadMoreCoupon text-center">
                                            <button
                                                onClick={() => handleLoadMore(c)}
                                                disabled={loading[c] || !hasMore[c]}
                                                aria-live="polite"
                                                className="load-more-btn"
                                            >
                                                {loading[c] ? "Loading..." : "Load More"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getStaticProps() {
    const alphabets = ["0-9", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))];
    const storeData = {};

    try {
        const responses = await Promise.all(
            alphabets.map((letter) =>
                fetch(`https://admin.rewarditt.com/store-page/alphabetical-filter/?letter=${letter}&page=1`, {
                    headers: {
                        'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
                    },
                })
                    .then((res) => res.json())
                    .then((data) => ({ [letter]: data.results || [] }))
            )
        );

        responses.forEach((response) => {
            Object.assign(storeData, response);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return {
        props: {
            initialStoreData: storeData,
        },
        revalidate: 10,
    };
}
