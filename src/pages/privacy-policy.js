import MainDomainLink from '@/components/MainDomainLink';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/site-policy.css";

export default function privacyPolicy({ privacyPolicy }) {
    
  
    return (
        <>
            <NextSeo
                title="Rewarditt.com - Privacy Policy"
                description="Privacy Policy"
            />
            <section className="sitePolicy">            
                <div className="container">                   
                    <div className="row">
                        <h1 className='text-center'>  Privacy Policy </h1>
                        <p>
                                Rewarditt (“us”, “we”, or “our”) operates the website <a href="https://rewarditt.com/">https://rewarditt.com/</a> (the “Site” or “Service”). This Privacy Policy explains how we collect, use and protect your information when you use our website. By visiting or using Rewarditt, you agree to the terms outlined in this policy. 
                        </p>
                       <div className="h2">Information We Collect</div>
                       <p>To provide you with the best experience, we collect a few different types of information: </p>
                       <p><strong>i. Personal Data:</strong></p>
                       <p>
                            We may ask for some personal details like your name, email address or other contact information while signing up for newsletters, contacting us or interacting with some features. This data enables us to reach you or enhance how we serve you.
                       </p>
                       <p><strong>ii. Non-Personal Data:</strong></p>
                       <p>
                            If you visit Rewarditt, we automatically collect some technical information such as IP address, browser type, device information, pages visited, time on the site and more. This helps us know how our website is being used and how we can make it better.
                       </p>
                       <div className="h2">Usage of Information</div>
                       <p>We use your data to:</p>
                       <ul>
                           <li>Run and maintain the Website.</li>
                           <li>Inform you about changes or updates.</li>
                           <li>Allow you to use any interactive features we provide.</li>
                           <li>Offer customer support and service.</li>
                           <li>Examine worthwhile information to enhance the Service.</li>
                           <li>Check the site for any suspicious activity.</li>
                           <li>Fix technical issues.</li>
                       </ul>
                       <p>We don't sell your information to any third party.</p>
                       <div className="h2">Sharing Your Information</div>
                       <p>We may share your data only when necessary and in limited situations, such as:</p>
                       <ul>
                           <li>If we are required by law or government authorities.</li>
                           <li>To protect ScoopCoost’s rights, safety or property.</li>
                           <li>To investigate misuse or fraud.</li>
                           <li>With trusted third-party sites that help us operate our website (like hosting, analytics, etc.). However, they are bound to keep your data secure and confidential.</li>
                       </ul>
                       <div className="h2">Security Of Data</div>
                       <p>
                            We always try to protect your data and use reasonable security measures to do so. However, please remember that no method of internet transmission or digital storage is ever 100% secure. We do our best but we can’t guarantee its absolute security.
                       </p>
                       <div className="h2">Service Providers</div>
                       <p>
                            Rewarditt may use services or tools provided by third parties. These third-parties may have access to some of your data, but only help us run our website efficiently. They are not allowed to use your data for anything beyond the tasks they perform for us.
                       </p>
                       <div className="h2">Links to Third-Party Websites</div>
                       <p>
                            Our website contains links to other websites (usually third-party brands/retailers). Please note that we don’t control these websites and we are not responsible for their content or privacy practices. We encourage you to review their privacy policies before sharing any information with them.
                       </p>
                       <div className="h2">Children’s Privacy</div>
                       <p>Rewarditt is meant for users aged 18 and older. We do not knowingly collect personal data from anyone under the age of 18. If you believe your child has shared personal information with us, please contact us. We take steps to remove the information from our servers.</p>
                       <div className="h2">Changes To This Privacy Policy</div>
                       <p>
                            We may update this Privacy Policy from time to time. If we make changes, we’ll notify you by posting the new Privacy Policy on the site and also update the effective date at the top of this Privacy Policy. You are advised to check back our Privacy Policy occasionally for any changes.
                       </p>
                       <div className="h2">Contact Us</div>
                       <p>Have questions about our privacy practices? Reach out to us at <a href="https://rewarditt.com/contact">https://rewarditt.com/contact</a>.</p>
                       <p>By using Rewarditt, you consent to the terms mentioned in this Privacy Policy.</p>
                    </div>
                </div>   
            </section>
        </>
    );
}
