import MainDomainLink from '@/components/MainDomainLink';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/site-policy.css";

export default function termsOfUse({ termsOfUse }) {
    
  
    return (
        <>
            <NextSeo
                title="Rewarditt.com - terms of use"
                description="Terms of Use - Rewarditt.com"
            />
            <section className="sitePolicy">            
                <div className="container">                   
                    <div className="row">
                        <h1 className="text-center">Terms of Use</h1>
                        <p>Welcome to Rewarditt! </p>
                        <p>
                            Before you explore the deals, discounts, and third-party offers we have on our platform, please take a few minutes to read our ‘Terms of Use’. By using our website, you agree to the terms outlined below. 
                        </p>
                        <div className='h2'>
                            Agreement of Terms
                        </div>
                        <p>
                            When you visit or use Rewarditt (the ‘Website’), you are confirming that you have read, understood and agreed to everything stated in this Terms of Use. If you don’t agree with any section, we kindly ask you not to use the site. Continued use of Rewarditt means you accept and are bound by these terms and conditions.
                        </p>
                        <div className='h2'>
                             Use of the Website
                        </div>
                        <p>
                            To use Rewarditt, you must agree to the following: 
                        </p>
                        <ul>
                            <li>You must be at least 18 years old to agree to this agreement and use the site.</li>
                            <li>You can browse and use the site for your own, non-commercial purposes only. </li>
                            <li>You may not copy, distribute, or reuse any part of the site for business purposes without written permission.</li>
                            <li>Avoid anything that could harm the site, disrupt its operation or violate the privacy of other users.</li>
                            <li>Bots, crawlers or automated tools are not allowed to collect information from our website unless we have approved it. </li>
                        </ul>
                        <div className='h2'>
                           Accuracy of Coupons and Gift Cards
                        </div>
                        <p>
                                We do our best to provide only valid promo codes and digital gift cards. However, 

                        </p>
                        <ul>
                            <li>All offers on Rewarditt come from external websites and brands.</li>
                            <li>We can’t guarantee that a deal will work or give the exact discount promised. </li>
                            <li>Coupons may expire, change or be withdrawn at any time by the merchant.</li>
                            <li>If you run into issues with a discount, it’s best to contact the retailer directly. Rewarditt isn’t responsible for any errors or misrepresentations involved in transactions or offer’s terms.</li>
                        </ul>
                        <p>
                                We also reserve the right to update, change or remove any coupon or e-gift card from our site at any time with or without notice.
                        </p>
                        <div className="h2">Intellectual Property</div>
                        <p>
                                All content on Rewarditt including name, logo, design, images, and text are protected under copyright and trademark laws. You may not:
                        </p>
                        <ul>
                                <li>Copy or reuse our content without permission.</li>
                                <li>Use our name or branding for your own project or business. </li>
                        </ul>
                        <div className="h2">Third-Party Links</div>
                        <p>
                                At Rewarditt, you will find links that lead you to third-party websites. These include retailer homepages, product pages, or checkout pages for deals. Please make sure to carefully consider the terms and conditions of any third-party websites listed on Rewarditt. We are not responsible for any errors, outdated information, misleading content or issues related to the products, services, or policies of those external sites. Rewarditt does not guarantee the accuracy, availability, or quality of any offers, prices or services provided by third-party parties. Use them at your own discretion. 
                        </p>
                        <div className="h2">Limitation Of Liability</div>
                        <p>
                                Rewarditt is provided on an “as-is” basis. While we work hard to keep things smooth and error-free:
                        </p>
                        <ul>
                                <li>We don’t make guarantees about every coupon/gift card accuracy or availability.</li>
                                <li>We can’t ensure that the website will always be running or error-free.</li>
                                <li>We are not responsible for any inaccuracies, misrepresentations, product or service liability, viruses or other computer problems resulting from use of such sites.</li>
                        </ul>
                        <div className="h2">Indemnification</div>
                        <p>
                                By using Rewarditt, you agree to take full responsibility for your actions. If something you do causes legal issues or costs for us, you agree to cover those expenses (including legal fees). Specifically, you agree to defend, indemnify and hold Rewarditt and our team harmless from any claims, damages, losses or expenses that result from:
                        </p>
                        <ul>
                            <li>Your use of the Rewarditt website.</li>
                            <li>Any violation of these Terms of Use.</li>
                            <li>Content you submit, share, or publish on our platform.</li>
                        </ul>
                        <div className="h2">Termination of Use</div>
                        <p>
                             We hold the right to suspend or terminate your access at any time, especially if we believe you’ve violated these terms or misused our platform. This can happen with or without prior notice. Our goal is to keep Rewarditt safe and helpful for everyone, so please use the site responsibly.
                        </p>
                        <div className="h2">Changes to These Terms</div>
                        <p>
                                We may update these Terms of Use from time to time to reflect changes in our services, legal requirements or policies. Whenever we do, the updated version will be posted right here. Continued use of Rewarditt after changes means you accept and agree to the updated terms. We recommend checking this page occasionally to stay informed.
                        </p>
                        <div className="h2">Contact Us</div>
                        <p>
                                We are here to help to solve your queries or concerns. Head to our <a href="https://rewarditt.com/contact">Contact Page</a> and reach out to us! 
                        </p>
                        <p>
                                By using Rewarditt, you confirm that you have read, understood and agreed these Terms of Use. 
                        </p>
                    </div> 
                </div>   
            </section>
        </>
    );
}
