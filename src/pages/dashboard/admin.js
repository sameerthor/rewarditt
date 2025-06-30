import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/admin.css";
import { useState, useEffect } from "react";


export default function AdminPage({ }) {

    return (
        <>
            <NextSeo
                title="Rewards - Best Gift Card For 2025"
                description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
            />
            <MetaTags />
            <section className='userData'>
                <div className="container">
                        <h2>Reward Dashboard</h2>
                        <table>
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Email ID</th>
                            <th>Total Points Earned</th>
                            <th>Points Redeemed</th>
                            <th>Expired Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td><a href="/user">Aarav Sharma</a></td>
                            <td>aarav@example.com</td>
                            <td>1200</td>
                            <td>800</td>
                            <td>100</td>
                            </tr>
                            <tr>
                            <td>Diya Patel</td>
                            <td>diya@example.com</td>
                            <td>950</td>
                            <td>600</td>
                            <td>50</td>
                            </tr>
                            <tr>
                            <td>Rohit Singh</td>
                            <td>rohit@example.com</td>
                            <td>1500</td>
                            <td>700</td>
                            <td>200</td>
                            </tr>
                        </tbody>
                        </table>

                        <div className="pagination">
                        <button>&laquo;</button>
                        <button className="active">1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>&raquo;</button>
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
