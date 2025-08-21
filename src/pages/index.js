import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/reward.css";
import { useState, useEffect } from "react";


export default function rewardPage({ }) {

    return (
        <>
            <NextSeo
                title="Rewards - Best Gift Card For 2025"
                description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
            />
            <MetaTags />
            <section className='rewardPage'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className='txtBox'>
                                <small className='hashTag'>#getReward</small>
                                <h1>Get Guaranteed Rewards on every <span>Qualified Purchase</span></h1>
                                <a href="/register" className='joinNow'>Join Today!</a>
                                <p>Already have an account? <a href="/login">Login Now</a></p>
                            </div>
                        </div>
                        
                        <div className="col-md-7">
                            <div className='imgBox'>
                                <Image
                                    src="/images/reward-gift.webp"
                                    alt="reward"
                                    width={650}
                                    height={400}
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='usersection'>
                <div className="container">
                    <div className='userBox'>
                            <div className='userName'>Hi there</div>
                            <div className='points'>You have <span>50</span> points</div>

                            <div class="expiry-warning">
                                <i>⚠</i> Your <b>50</b> Loyalty Points will expire on <b>06/07/2026</b>
                            </div>

                            <div class="btn-container">
                                <a href='/dashboard' class="btn">Redeem Cash</a>
                                 <a href='/reward-history' class="btn">Rewards History</a>
                            </div>
                    </div>
                </div>
            </section>
            <section className="rewards-section">
                <div className="container yelloBg" style={{ borderBottom: "1px solid #ccc" }}>
                    <h2>Ways to Earn Points</h2>
                    <div className="row row-cols-lg-5 row-cols-md-3 row-cols-1">
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">👤</div>
                                <div className="reward-title">30 Points</div>
                                <div className="reward-desc">Create An Account</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">🛒</div>
                                <div className="reward-title">50 Points</div>
                                <div className="reward-desc">For Every verified purchase</div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">🎂</div>
                                <div className="reward-title">100 Points</div>
                                <div className="reward-desc">Happy Birthday</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">🏷️</div>
                                <div className="reward-title">100 Points</div>
                                <div className="reward-desc">If our coupon code does not work <small>You must purchase the product and use our referral link to claim points</small></div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">👥</div>
                                <div className="reward-title">50 Points</div>
                                <div className="reward-desc">Refer a friend </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="rewards-section">
                <div className="container">
                     <h2>How our reward program works ?</h2>
                    <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1">
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">
                                    <Image
                                        src="/images/join.svg"
                                        alt="join"
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="reward-title">Join</div>
                                <div className="reward-desc">Sign up and start collecting points today!</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">
                                    <Image
                                        src="/images/purchase.svg"
                                        alt="join"
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="reward-title">Qualified Purchase</div>
                                <div className="reward-desc">Get points with every qualified purchase.</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">
                                    <Image
                                        src="/images/earn-points.svg"
                                        alt="join"
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="reward-title">Collect Points</div>
                                <div className="reward-desc">Every purchase brings you some points</div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">
                                    <Image
                                        src="/images/redeem.svg"
                                        alt="join"
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="reward-title">Redeem</div>
                                <div className="reward-desc">Instantaly convert all your points into dollars</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="subscribe-section">
                <div class="container">
                    <div class="subscribe-box">
                        <h2>🎁 Unlock Exclusive Rewards!</h2>
                        <p>Join our newsletter and start earning points, deals, and surprise perks straight to your inbox.</p>
                        <form class="subscribe-form">
                            <div>
                                <input type="email" class="form-control" placeholder="Enter your email" required />
                            </div>
                            <div>
                                <button type="submit" class="btn btn-subscribe w-100">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section className='topBrands brand-grid'>
                <div className="container">
                    <h2 className="secHeading"> Get Reward on Top Rated Brands</h2>
                    <div className="row row-cols-lg-5 row-col-md-3 row-cols-2">
                        <div className='col mb-5'>
                            
                            <a href="" className='brand-card'>
                                <Image
                                    className='brand-logo'
                                    src="/images/800-kicks.webp"
                                    alt="brand-logo"
                                    width={50}
                                    height={50}
                                    loading="lazy"
                                />
                                <div className="brand-name">8000Kicks</div>
                                <div className="discount-badge">Footwear</div>
                            </a>
                        </div>
                         <div className='col mb-5'>
                            
                            <a href="" className='brand-card'>
                                <Image
                                    className='brand-logo'
                                    src="/images/800-kicks.webp"
                                    alt="brand-logo"
                                    width={50}
                                    height={50}
                                    loading="lazy"
                                />
                                <div className="brand-name">8000Kicks</div>
                                <div className="discount-badge">Footwear</div>
                            </a>
                        </div>
                         <div className='col mb-5'>
                            
                            <a href="" className='brand-card'>
                                <Image
                                    className='brand-logo'
                                    src="/images/800-kicks.webp"
                                    alt="brand-logo"
                                    width={50}
                                    height={50}
                                    loading="lazy"
                                />
                                <div className="brand-name">8000Kicks</div>
                                <div className="discount-badge">Footwear</div>
                            </a>
                        </div>
                         <div className='col mb-5'>
                            
                            <a href="" className='brand-card'>
                                <Image
                                    className='brand-logo'
                                    src="/images/800-kicks.webp"
                                    alt="brand-logo"
                                    width={50}
                                    height={50}
                                    loading="lazy"
                                />
                                <div className="brand-name">8000Kicks</div>
                                <div className="discount-badge">Footwear</div>
                            </a>
                        </div>
                         <div className='col mb-5'>
                            
                            <a href="" className='brand-card'>
                                <Image
                                    className='brand-logo'
                                    src="/images/800-kicks.webp"
                                    alt="brand-logo"
                                    width={50}
                                    height={50}
                                    loading="lazy"
                                />
                                <div className="brand-name">8000Kicks</div>
                                <div className="discount-badge">Footwear</div>
                            </a>
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
        revalidate: 10, 
    };
}
