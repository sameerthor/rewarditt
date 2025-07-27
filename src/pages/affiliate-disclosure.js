import MainDomainLink from '@/components/MainDomainLink';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/site-policy.css";

export default function affiliateDisclosure({ affiliateDisclosure }) {
    
  
    return (
        <>
            <NextSeo
                title="Rewarditt.com - Affiliate Disclosure"
                description="Affiliate Disclosure"
            />

            <section className="sitePolicy">            
                <div className="container">                   
                    <div className="row">
                        <h1 className="text-center">Affiliate Disclosure</h1>
                        <p>
                                At Rewarditt, transparency is our priority. Our mission is to help users save money by finding and sharing the best deals, coupons and e-gift cards from around the web. To keep our Rewarditt (the “Website”) running, we participate in affiliate marketing programs.

                        </p>
                        <p>
                                When you click any of these links listed on our platform and make purchase from a third-party retailer, we may earn a commission through an affiliate link. This commission is paid by the retailer or service provider and not by you. The prices you see are exactly the same whether you use our affiliate link or go directly to the retailer’s website. 
                        </p>
                        <p>
                                These commissions help us maintain and improve our site, cover maintenance costs and continue sharing new deals and discounts for our visitors. Also, the products you buy from the seller are completely between you and the retailer. We are just an affiliate marketing website that brings free coupons and gift cards for your convenience.
                        </p>
                        <p>
                                While we appreciate your support when you use our affiliate links, the decision to purchase any product or service is yours. You are under no obligation to click on our affiliate links or make a purchase. You are free to bypass our links and visit the retailer directly if you choose.  If you choose to shop through our links, it truly supports what we do and we appreciate it.
                        </p>
                        <p>
                                Rewarditt does not own or sell any of the products or services listed on our site. We are an independent platform that brings promo codes and gift cards from third-party retailers. We may earn commission on your purchases but our recommendations are not influenced by this. Also, we do not receive any free products or incentives for featuring online stores on our site.
                        </p>
                        <p>
                                Please note that Rewarditt does not own, guarantee, or endorse any products, services or businesses available on our website. Retailers may change or remove offers without notice and terms of use will vary depending on the store. Our team does their best to list the deals & discount codes that are accurate and up to date. But we cannot guarantee their validity at all times. 
                        </p>
                        <p>
                                We always recommend you to research before making any purchases. Read the fine print, check reviews and research before making any purchase. Any issue with your order regarding product quality or delivery should be directed to the seller from whom you made the purchase. 
                        </p>
                        <div className="h2">Got Questions? </div>
                        <p>
                                If you have any questions about our affiliate disclosure policy, feel free to contact us at <a href="https://rewarditt.com/contact">https://rewarditt.com/contact</a> and we will be happy to assist you.
                        </p>
                        <p>By using Rewarditt, you agree to this Affiliate Disclosure Policy.</p>
                    </div> 
                </div>   
            </section>        
           
        </>
    );
}
