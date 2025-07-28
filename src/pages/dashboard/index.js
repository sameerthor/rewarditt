import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/user.css";
import "@/styles/reward-history.css";
import { useState, useEffect } from "react";
import cookie from 'cookie';
import { parse } from 'cookie';
import BankModalForm from '@/components/BankModalForm';
import Cookies from 'js-cookie';


export default function singleUser({ }) {
    const [showModal, setShowModal] = useState(false);
    const [bankDetail, setBankDetail] = useState({});
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');



    useEffect(() => {
        const checkBankDetails = async () => {
            const token = Cookies.get("auth_token");

            try {
                const res = await fetch("/api/user-profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setEmail(data.email)
                setUsername(data.username)
                if (!data.bank_detail) {
                    setShowModal(true);
                } else {

                    setBankDetail(data.bank_detail)
                }

            } catch (err) {
                console.error("Failed to fetch user info:", err);
            }
        };

        checkBankDetails();
    }, []);


    return (
        <>
            <BankModalForm
                show={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={() => setShowModal(false)}
            />
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
                            <div className="info-row"><span className="info-label">UserName:</span><span className="info-value">{username}</span></div>
                            <div className="info-row"><span className="info-label">Email:</span><span className="info-value">{email}</span></div>

                        </div>

                        {/* Payment Info Card */}
                        <div className="card">
                            <h2 className="card-title">Payment Information</h2>
                            {bankDetail && (
                                <>
                                    <div className="info-row">
                                        <span className="info-label">Bank Name:</span>
                                        <span className="info-value">{bankDetail.bank_name}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Account Name:</span>
                                        <span className="info-value">{bankDetail.account_holder_name}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Account Number (IBAN):</span>
                                        <span className="info-value">{bankDetail.iban}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">SWIFT Code:</span>
                                        <span className="info-value">{bankDetail.swift_code}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">PayPal Email:</span>
                                        <span className="info-value">{bankDetail.paypal_email}</span>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </section>
            {/* <section className='rewardHistoryPage'>
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
            </section> */}
         
        </>
    );
}

export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const token = cookies.auth_token || null;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        };
    }

    // Fetch user data if needed here using token

    return {
        props: {
            token,
        },
    };
}

