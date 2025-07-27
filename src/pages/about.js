import MainDomainLink from '@/components/MainDomainLink';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/site-policy.css";

export default function aboutSaveright({ aboutSaveright }) {
    
  
    return (
        <>
            <NextSeo
                title="About - Rewarditt.com"
                description="Read how Rewarditt was formed and more information related to the company. How Rewarditt help with Gift cards and coupons."
            />

            <section className="sitePolicy">            
                <div className="container">                   
                    <div className="row">
                        <h1 className="text-center">About Suproffer</h1>
                        <p>
                                Rewarditt is your trusted platform for real, working coupon codes, discounts, and daily deals. But that’s not all - our platform is also offering digital gift cards to make your savings more flexible and fun! Whether you are gifting someone or treating yourself, these gift cards make it easy to save money on your online purchase. 
                        </p>
                        <p>
                                From clothing and electronics to home goods and travel, we help you shop smarter and save more. You will find exclusive freebies, free shipping deals, and promo codes from top brands and trusted stores. All our offers are regularly updated, verified and easy to redeem - so you don’t waste time or money.
                        </p>
                        <p>We update our site regularly to bring you:</p>
                        <ul>
                            <li>Seasonal sales and holiday discounts</li>
                            <li>Buy-one-get-one-free offers</li>
                            <li>Free shipping codes</li>
                            <li>Limited-time price drops</li>
                            <li>100% verified discount codes</li>
                            <li>Working gift cards</li>
                        </ul>
                        <div className="whyTrustus">
                                <div className="container">
                                    <div className="row g-4">
                                    {/* Left Column */}
                                    <div className="col-md-6 mb-3 zeroMobPadding">
                                        <div className="card-custom">
                                        <div className="founder">
                                            <div className="img">
                                            <img src="/images/co-founder.webp" alt="Rudresh Dubey" />
                                            </div>
                                            <div className="name">
                                            <p>
                                                Rudresh{" "}
                                                <a
                                                href="https://www.linkedin.com/in/rudreh-dubey-86426b1a2/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="LinkedIn"
                                                >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="#0077B5"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
                                                </a>
                                            </p>
                                            <span> The Person Behind Rewarditt.com</span>
                                            </div>
                                        </div>
                                        <div className="founderNote">
                                            <p>
                                                    Rudresh Dubey is an experienced affiliate marketer with more than 10 years of experience in digital marketing. His journey in the coupon industry started with a simple idea - to help people save money when they shop online. He started Rewarditt.com that only features tested & verified coupons as well as working gift cards. What began as a small business has now become a trusted name for online discounts and digital gift vouchers.
                                            </p>
                                            <p>
                                                    Rudresh’s goal is to make online shopping affordable and fun for everyone. He wanted to build a space where people wouldn’t have to waste time trying fake or expired codes. With this aim in mind, he formed a dedicated team. Today, Rewarditt is run by a team of 6 hardworking people who work tirelessly to find the best discounts across different shopping categories. Whether it’s fashion, electronics, travel or software, the team makes sure that every coupon or gift card on the site actually works.
                                            </p>
                                        </div>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="col-md-6 zeroMobPadding">
                                        <div className="card-custom ourExpert">
                                        <div className="expHead">Meet Our Coupon Experts</div>
                                        <div className="expertPara">
                                            <p>The team at Rewarditt consists of 6 members. Their job is to check and upload the best offers for users. They search through various sources to pick out promo codes and e-gift cards that are genuine & active. Before any offer goes live on the site, it is properly checked by the team. This helps users save time and get the latest deals every time they shop. </p>
                                            <p>
                                                At Rewarditt, the user is very important. The team works hard to keep the site simple and easy to use. Every page has a comment section where users can share feedback. If a coupon code or gift card doesn’t work or has any issues, the team makes sure to fix it. 

                                            </p>
                                            <p>If in case you find something that isn’t right on our website, you can report the issue to us and we’ll address it as soon as possible.</p>
                                        </div>
                                        <div className="listExpert">
                                            <ul>
                                            <li>
                                                <small>
                                                    <img src="/images/dinesh-v.webp" alt="dinesh" />
                                                    <p>Dinesh</p>
                                                </small>
                                                <span className="exp">8 Years</span>
                                            </li>
                                            <li>
                                                <small>
                                                <img src="/images/mashma-m.webp" alt="mashma" />
                                                <p>Mashma</p>
                                                </small>
                                                <span className="exp">6 Years</span>
                                            </li>
                                            <li>
                                                <small>
                                                <img src="/images/tanay-s.webp" alt="tanay" />
                                                <p>Tanay</p>
                                                </small>
                                                <span className="exp">6 Years</span>
                                            </li>
                                            <li>
                                                <small>
                                                <img src="/images/sikha.webp" alt="sikha" /> 
                                                <p>Sikha</p>
                                                </small>
                                                <span className="exp">5 Years</span>
                                            </li>
                                            <li>
                                                <small>
                                                <img src="/images/yash-c.webp" alt="yash" /> 
                                                <p>Yash</p>
                                                </small>
                                                <span className="exp">4 Years</span>
                                            </li>
                                            <li>
                                                <small><img src="/images/yunush.webp" alt="Yusuf" /> 
                                                <p>Yusuf</p>
                                                
                                                </small>
                                                
                                                <span class="exp">3 Years</span>
                                            </li>
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                        </div>
                        <div className='h2'>
                        How We Work? 
                        </div>
                        <p>
                                Rewarditt runs on an affiliate model. When you find a coupon or gift card and click on it, you are redirected to the brand’s official website. If you make a purchase there using our affiliate link, the retailer gives us a small commission. And the best part is - it doesn't cost you anything extra.
                        </p>
                        <p>
                                This commission helps us keep Rewarditt running - from checking and updating coupons & gift cards to discovering new deals every day. Our platform is completely free to use, bringing savings opportunities across all shopping categories including fashion, beauty, tech, groceries, and more.
                        </p>
                       
                       <div className='h2'>
                          What We Offer? 
                       </div>
                       <p>Here’s what you’ll find on our site:</p>
                       <ul>
                            <li><strong>Gift Cards:</strong> We have a wide range of gift cards that are easy to send and receive. From shopping and food to travel and electronics, we cover many categories to suit every person and occasion.</li>
                            <li><strong>Coupons & Promo Codes:</strong> We bring the best deals so you don’t have to jump from site to site. Our team checks and updates coupon codes regularly to make sure they actually work. No invalid coupons or fake deals - Rewarditt only has real savings.</li>
                            <li><strong>Seasonal Offers:</strong> We organize special deals around all major events and holidays like Black Friday, Christmas, Halloween, Cyber Monday, New Year, etc. </li>
                            <li><strong>Brand Highlights:</strong> Not sure where to shop? Our featured brand section gives you popular, trending stores and what discounts they are currently offering.</li>
                       </ul>
                       
                       <div className='h2'>
                       Why Shop With Us? 
                       </div>
                        <p>
                                We simplify your savings journey by gathering verified, updated deals and discount codes in one place. Also, with the added option of <strong>discounted gift cards,</strong> you have even more flexibility and ways to save.
                        </p>
                       
                       <p>
                           No matter what you are looking for, Rewarditt makes sure you get it at the best possible price. So go ahead - explore, shop, and save more on every purchase!

                       </p>
                       
                       
                      <div className='h2'>
                          Get in Touch

                      </div>
                      <p>For any questions or suggestions, please contact us at <a href="https://rewarditt.com/contact">https://rewarditt.com/contact</a></p>   
                    </div> 
                </div>   
            </section>        
           
        </>
    );
}
