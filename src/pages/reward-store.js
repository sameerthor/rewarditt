import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/reward-store.css";
import { useState, useEffect } from "react";


export default function userInfo({ }) {

    return (
        <>
            <NextSeo
                title="Rewards - Best Gift Card For 2025"
                description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
            />
            <MetaTags />
            <section className='rewardStr'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className='banner'>
                                <Image
                                    src="/images/reward.webp"
                                    width={600}
                                    height={400}
                                    alt="Reward Image"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='pageHead'>
                                <h1>Get 100 Reward points on Fueler Store  and coupons</h1>
                                <div className="barndInfo">
                                    <div className="left">
                                      <div className="ttl">Fueler Store</div>
                                      <div className="stars">
                                        {[...Array(5)].map((_, i) => (
                                          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                          </svg>
                                        ))}
                                      </div>
                                      <div className="infoBox"></div>
                                      <div className="infoBox">
                                        <div className="infoHead">Categories</div>
                                        <div className="infoItem">Sports &amp; Outdoors</div>
                                      </div>
                                      <div className="infoBox">
                                        <div className="infoHead">Location</div>
                                        <div className="infoItem">Dubai, UAE: D-65, Dubai Production City</div>
                                      </div>
                                      <div className="infoBox">
                                        <div className="infoItem"><button data-bs-toggle='modal' data-bs-target='#redeemModal'>Read how to redeem ?</button></div>
                                      </div>
                                      <div className="infoBox">
                                        <div className="infoItem" data-bs-toggle='modal' data-bs-target='#termsCondition'><button>Terms &amp; Conditions for Fueler Store</button></div>
                                      </div>
                                    </div>

                                    <div className="right">
                                      <div className="brandLogo">
                                        <img
                                          alt="logo"
                                          loading="lazy"
                                          width="150"
                                          height="50"
                                          decoding="async"
                                          data-nimg="1"
                                          style={{ color: 'transparent' }}
                                          srcSet="/_next/image?url=https%3A%2F%2Fimg.scoopcost.com%2Ffueler-store.png&amp;w=256&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fimg.scoopcost.com%2Ffueler-store.png&amp;w=384&amp;q=75 2x"
                                          src="/_next/image?url=https%3A%2F%2Fimg.scoopcost.com%2Ffueler-store.png&amp;w=384&amp;q=75"
                                        />
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* about */}
            <section className="about-store-section">
              <div className="about-container">
                <div className="about-text">
                  <h2>About Our Store</h2>
                  <p>
                    Welcome to <strong>Fueler Store</strong> – your one-stop destination for premium products and services
                    tailored for creators, entrepreneurs, and professionals. We strive to deliver the best quality
                    and unmatched value to our customers worldwide.
                  </p>

                  <ul>
                    <li>Wide range of curated tools and resources</li>
                    <li>Trusted by 10,000+ users</li>
                    <li>Secure transactions and easy refunds</li>
                  </ul>

                  <p>Our process is simple and efficient:</p>
                  <ol>
                    <li>Browse through our store and add items to your cart</li>
                    <li>Complete the payment securely</li>
                    <li>Instant delivery via email or dashboard access</li>
                  </ol>

                  <p>
                    We're constantly updating our inventory with high-quality digital goods, productivity boosters,
                    and curated offers to help you stay ahead.
                  </p>
                </div>
              </div>
            </section>
            {/* faqs */}
            <section className="faq-section">
                <div className="container">
                      <div className="faq-header">
                        <h2>Frequently Asked Questions</h2>
                      </div>
                      <div className="faq-list">
                        <div className="faq-card">
                          <div className="faq-question">What is your return policy?</div>
                          <div className="faq-answer">
                            <p>We offer a 30-day return policy from the date of purchase.</p>
                            <ul>
                              <li>Product must be unused</li>
                              <li>Return must include original packaging</li>
                              <li>Refund issued after inspection</li>
                            </ul>
                          </div>
                        </div>
                        <div className="faq-card">
                          <div className="faq-question">How can I track my order?</div>
                          <div className="faq-answer">
                            <p>You'll receive an email with tracking info once your order is shipped.</p>
                            <ol>
                              <li>Check your inbox or spam folder</li>
                              <li>Click the tracking link</li>
                              <li>Follow the courier updates</li>
                            </ol>
                          </div>
                        </div>
                        <div className="faq-card">
                          <div className="faq-question">Do you ship internationally?</div>
                          <div className="faq-answer">
                            <p>Yes, we ship to over 50 countries worldwide. Shipping costs and times may vary.</p>
                          </div>
                        </div>
                        <div className="faq-card">
                          <div className="faq-question">Can I change my order?</div>
                          <div className="faq-answer">
                            <p>Yes, but only within 12 hours of placing the order. Contact support for changes.</p>
                          </div>
                        </div>
                      </div>
                </div>
            </section>
             <section className="topBrands brand-grid">
                <div className="container">
                    <h2 className='secHeading'>Top Rated Brands</h2>
                    <div className="row row-cols-lg-5 row-col-md-3 row-cols-2">
                        <div className="col mb-5">
                            <a class="brand-card" href='#'>
                                <Image  className='brand-logo'
                                        width={80}
                                        height={80} 
                                        src="/images/oh-baby.webp" loading="lazy" alt="oh-baby" />
                                <div class="brand-name">oh Baby</div>
                                <div class="discount-badge">Get 200 Ponits</div>
                            </a>
                        </div>
                        <div className="col mb-5">
                            <a class="brand-card" href='#'>
                                <Image  className='brand-logo'
                                        width={80}
                                        height={80} 
                                        src="/images/oh-baby.webp" loading="lazy" alt="oh-baby" />
                                <div class="brand-name">oh Baby</div>
                                <div class="discount-badge">Get 200 Ponits</div>
                            </a>
                        </div>
                        <div className="col mb-5">
                            <a class="brand-card" href='#'>
                                <Image  className='brand-logo'
                                        width={80}
                                        height={80} 
                                        src="/images/oh-baby.webp" loading="lazy" alt="oh-baby" />
                                <div class="brand-name">oh Baby</div>
                                <div class="discount-badge">Get 200 Ponits</div>
                            </a>
                        </div>
                        <div className="col mb-5">
                            <a class="brand-card" href='#'>
                                <Image  className='brand-logo'
                                        width={80}
                                        height={80} 
                                        src="/images/oh-baby.webp" loading="lazy" alt="oh-baby" />
                                <div class="brand-name">oh Baby</div>
                                <div class="discount-badge">Get 200 Ponits</div>
                            </a>
                        </div>
                        <div className="col mb-5">
                            <a class="brand-card" href='#'>
                                <Image  className='brand-logo'
                                        width={80}
                                        height={80} 
                                        src="/images/oh-baby.webp" loading="lazy" alt="oh-baby" />
                                <div class="brand-name">oh Baby</div>
                                <div class="discount-badge">Get 200 Ponits</div>
                            </a>
                        </div>
                    </div>      
                </div>
           </section>
            {/* modal */}
            <div
                className="modal fade giftModal"
                id="redeemModal"
                tabIndex="-1"
                aria-labelledby="redeemModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">How To Redeem</h5>
                            <button
                                type="button"
                                className="closeBtn ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >x</button>
                        </div>
                        <div className="modal-body">
                            <div className="listItem">
                                <span className="method">Online</span>
                                 <div className="custom-list">
                                    <ul className="custom-list">
                                      <li>Visit the store’s official website <strong>fueler.store</strong>.</li>
                                      <li>Select the product you want to purchase and add it to the cart.</li>
                                      <li>Proceed to checkout and start the payment process.</li>
                                      <li>Now enter the Gift Card/Voucher and click on ‘Apply’.</li>
                                      <li>Pay the balance amount if any using available payment modes.</li>
                                    </ul>
                                  </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div
                className="modal fade giftModal"
                id="termsCondition"
                tabIndex="-1"
                aria-labelledby="redeemModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Terms &amp; Conditions</h5>
                            <button
                                type="button"
                                className="closeBtn ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >x</button>
                        </div>
                         <div className="modal-body">
                            <div className="listItem">
                              <ul className="custom-list">
                                <li>The e-gift card can be used for payment at fueler.store.</li>
                                <li>Balance must be used within 1 year from the purchase date.</li>
                                <li>Multiple gift cards can be clubbed in a single order.</li>
                                <li>The gift card retains unspent value until it expires.</li>
                                <li>This e-gift card cannot be used to buy other gift cards.</li>
                                <li>Gift Cards cannot be redeemed for cash or credit.</li>
                                <li>No returns or refunds on e-gift cards and vouchers.</li>
                              </ul>
                            </div>
                          </div>
                    </div>
                </div>
            </div>


          
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
