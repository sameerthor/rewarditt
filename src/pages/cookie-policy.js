import MainDomainLink from '@/components/MainDomainLink';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/site-policy.css";

export default function cookiePolicy({ cookiePolicy }) {
    
  
    return (
        <>
            <NextSeo
                title="Rewarditt.com - Cookie Policy"
                description="Cookie Policy"
            />
            <section className="sitePolicy">            
                <div className="container">                   
                    <div className="row">
                        <h1 className="text-center">Cookie Policy</h1>
                        <p>
                                At Rewarditt, we use cookies to offer you a faster, smoother, and more personalized browsing experience. This Cookie Policy explains how Rewarditt (the “Website”, “we”, “our”, “us”) uses cookies and similar technologies to gather information when you visit our site. It also outlines how you can manage or control your cookie preferences. 
                        </p>
                        <div className="h2">What are Cookies?</div>
                        <p>
                                Cookies are small data files that are stored on your device (computer, phone, tablet) by a website when you visit it. They include an anonymous unique identifier and allow the site’s systems to recognize your web browser and remember certain kinds of information. 
                        </p>
                        <div className="h2">Types of Cookies We Use</div>
                        <p>
                                <strong>Session Cookies:</strong> We use Session Cookies to operate our website smoothly.
                        </p>
                        <p>
                            <strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences and various settings like language or location. 
                        </p>
                        <p>
                                <strong>Security Cookies:</strong> We use Security Cookies to identify and prevent security risks, protecting your data and our services.
                        </p>
                        <div className="h2">Third-Party Cookies</div>
                        <p>
                                In addition to our cookies, we may use cookies provided by trusted third parties. These include analytics services, advertising platforms or affiliate networks. These third party cookies may track your activity across multiple websites. Please note Rewarditt does not control these cookies and is not responsible for how third-parties handle your data. We recommend you to review their respective privacy and cookie policies for details. 

                        </p>
                        <div className="h2">How to Manage Your Cookie Preferences</div>
                        <p>
                                You can choose to accept or reject cookies through your browser settings. Most browsers let you:
                        </p>
                        <ul>
                            <li>Block all cookies.</li>
                            <li>Allow only specific cookies.</li>
                            <li>Get alerts before a cookie is saved.</li>
                            <li>Delete existing cookies. </li>
                        </ul>
                        <p>
                            Here’s how you can manage cookies:

                        </p>
                        <ul>
                            <li>Go to browser settings under ‘Privacy’ or ‘Security’ tab.</li>
                            <li>Use ‘Incognito’ or ‘Private Browsing’ mode to limit cookie storage.</li>
                            <li>Install browser extensions or plugins that manage tracking and cookies.</li>

                        </ul>
                        <p>
                               <strong> Note:</strong> Disabling or blocking some cookies may affect how certain features or pages on Rewarditt work. 
                        </p>
                        <div className="h2">Updates to this Cookie Policy</div>
                        <p>
                                We may update this Cookie Policy from time to time to make changes in our cookie practices, new legal requirements or improvements in technology. When we make any changes, we’ll revise the “effective date” at the top and post the new policy on this page. We advise you to review this page periodically so you are always informed about how cookies are used on our platform. 
                        </p>
                        <div className="h2">Contact Us</div>
                        <p>
                                If you have any questions or concerns about our Cookie Policy, reach out to us at <a href='https://rewarditt.com/contact'>https://rewarditt.com/contact</a>.

                        </p>
                        <p>
                                By using Rewarditt, you consent to use cookies as described in this Cookie Policy.
                        </p>
                   </div> 
                </div>   
            </section>
        </>
    );
}
