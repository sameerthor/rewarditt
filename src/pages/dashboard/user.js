import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/user.css";
import { useState, useEffect } from "react";


export default function singleUser({ }) {

    return (
        <>
            <NextSeo
                title="Rewards - Best Gift Card For 2025"
                description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
            />
            <MetaTags />
            <section className='userInfo'>
                <div className='container'>
                    <h1 className="heading">Reward &amp; Payment Info of MS Dhoni</h1>

                    <div className="dashboard">
                        {/* User Info Card */}
                        <div className="card">
                        <h2 className="card-title">User Information</h2>
                        <div className="info-row"><span className="info-label">Name:</span><span className="info-value">MS Dhoni</span></div>
                        <div className="info-row"><span className="info-label">Email:</span><span className="info-value">msd@example.com</span></div>
                        <div className="info-row"><span className="info-label">Joined Since:</span><span className="info-value">Jan 2022</span></div>
                        <div className="info-row"><span className="info-label">Points Redeemed:</span><span className="info-value">450</span></div>
                        <div className="info-row"><span className="info-label">Expired Points:</span><span className="info-value">120</span></div>
                        <div className="info-row"><span className="info-label">Points to be Redeemed:</span><span className="info-value">380</span></div>

                        <button className="transfer-btn">Transfer Amount</button>
                        
                        </div>

                        {/* Payment Info Card */}
                        <div className="card">
                        <h2 className="card-title">Payment Information</h2>
                        <div className="info-row"><span className="info-label">Bank Name:</span><span className="info-value">State Bank of India</span></div>
                        <div className="info-row"><span className="info-label">Account Name:</span><span className="info-value">Shivam Mishra</span></div>
                        <div className="info-row"><span className="info-label">Account Number:</span><span className="info-value">XXXX-XXXX-1234</span></div>
                        <div className="info-row"><span className="info-label">IFSC Code:</span><span className="info-value">SBIN0001234</span></div>
                        <div className="info-row"><span className="info-label">SWIFT Code:</span><span className="info-value">SBININBBXXX</span></div>
                        <div className="info-row"><span className="info-label">Transfer in USD:</span><span className="info-value">$38.00</span></div>
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
