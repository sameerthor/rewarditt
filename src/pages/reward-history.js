import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/reward-history.css";
import { useState, useEffect } from "react";


export default function rewardHistory({ }) {

    return (
        <>
            <NextSeo
                title="Rewards - Best Gift Card For 2025"
                description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
            />
            <MetaTags />
            <section className='rewardHistoryPage'>
                    <div className="container">
                        <h1>Reward History</h1>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                    <th>Date</th>
                                    <th>Action</th>
                                    <th>Points</th>
                                    <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>2025-06-10</td>
                                    <td>Purchase at XYZ Store</td>
                                    <td>+30</td>
                                    <td className="status status-earned">Earned</td>
                                    </tr>
                                    <tr>
                                    <td>2025-05-28</td>
                                    <td>Redeemed for Gift Card</td>
                                    <td>-20</td>
                                    <td className="status status-redeemed">Redeemed</td>
                                    </tr>
                                    <tr>
                                    <td>2025-03-14</td>
                                    <td>Referral Bonus</td>
                                    <td>+10</td>
                                    <td className="status status-earned">Earned</td>
                                    </tr>
                                    <tr>
                                    <td>2024-12-30</td>
                                    <td>Unused Points</td>
                                    <td>-15</td>
                                    <td className="status status-expired">Expired</td>
                                    </tr>
                                </tbody>
                            </table>
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
