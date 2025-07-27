import MainDomainLink from '@/components/MainDomainLink';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/site-policy.css";

export default function contactPage({ contact }) {
    
  
    return (
        <>
            <NextSeo
                title="Contact - Rewarditt.com"
                description="Contact now for more details. If you have any questions just email us and we will get back to you"
            />

<section className="sitePolicy"> 
                <div className="container">                   
                    <div className="row">
                         <p><strong>Let’s Make Savings Simple (And Fun)! </strong></p>
                         <p>
                                At Rewarditt.com, we help you grab the best online deals, promo codes, and digital gift cards without the hassle. Whether you want to share an idea, ask a question or collaborate with us, send us a message. Our team is always happy to hear from you. 


                         </p>
                        <p><strong>Need Help Using Coupons? </strong></p>
                        <p>
                                Not sure how to apply a coupon code at checkout? Tried a coupon and it didn’t work? No worries - just drop us a message and we will guide you through the process. 
                        </p>
                        <p><strong>Got Suggestions or Feedback? </strong></p>
                        <p>We genuinely value your ideas! If there is something we could do better, a feature you’d like to see or even a store you wish we covered - tell us! Your feedback helps us grow and improve Rewarditt every day.</p>
                        <p><strong>Get in Touch </strong></p>
                        <p>Customer Support & General Questions: brand@rewarditt.com</p>
                        <p>Business Inquiries & Collaborations: info@rewarditt.com</p>
                        <p><strong>Stay Connected</strong></p>
                        <p><strong>Facebook:</strong> Rewarditt Facebook</p>
                        <p><strong>Twitter:</strong> @Rewarditt Twitter</p>
                        <p><strong>Instagram:</strong> @Rewarditt Instagram</p>
                        <p>We reply quickly and love hearing from our users. </p>

                    </div>
                </div>   
            </section>   
           
        </>
    );
}


