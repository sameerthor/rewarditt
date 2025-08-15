import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/user.css";
import "@/styles/reward-history.css";
import "@/styles/reward.css";
import cookie from 'cookie';
import { parse } from 'cookie';
import BankModalForm from '@/components/BankModalForm';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import ReactSearchBox from 'react-search-box';
import { useRouter } from 'next/router';

const TYPE_LABELS = {
    earned_by_purchase: 'Earned by Purchase',
    redeem: 'Redeemed',
    adjust: 'Adjusted',
    birthday: 'Birthday Bonus',
    account_creation: 'Account Creation Bonus',
    expired: 'Expired',
};


export default function singleUser({ userData }) {


    const [filterdata, setFilterdata] = useState([]);

    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalScreenshot, setModalScreenshot] = useState('');


    useEffect(() => {
        const fetchRedeemData = async () => {
            try {
                // Fetch points
                const resPoints = await fetch('/api/redeem-points');
                const dataPoints = await resPoints.json();
                console.log(dataPoints)
                setPoints(dataPoints);

            } catch (err) {
                console.error('Failed to fetch redeem data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRedeemData();
    }, []);


    const fetchData = () => {
        Promise.all([
            axios.get("https://admin.rewarditt.com/store-search")
        ])
            .then(([storeRes]) => {


                const stores = (storeRes.data || []).map(store => ({
                    key: store.slug,
                    value: store.title,
                }));

                setFilterdata([...stores]);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };


    const [uploadedImage, setUploadedImage] = useState(null);

    // Step 2: Add event handlers
    const handleFileChange = async (e, pointId) => {
        const file = e.target.files[0];
        if (!file) return;

        // Prepare FormData to send
        const formData = new FormData();
        formData.append('proof_image', file);

        try {

            const res = await fetch(`/api/redeem-points/${pointId}/upload/`, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (res.status === 200) {
                alert('Screenshot uploaded successfully');
                // Update the data with URL from server if returned
                setPoints(prev =>
                    prev.map(p => p.id === pointId ? { ...p, proof_image: data.proof_image } : p)
                );
            } else {
                alert(data.error || 'Failed to upload screenshot');
            }
        } catch (err) {
            console.error(err);
            alert('Error uploading screenshot');
        }
    };


    const handleDelete = () => {
        setUploadedImage(null);
    };


    return (
        <>

            <NextSeo
                title="Rewards - Best Gift Card For 2025"
                description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
            />
            <MetaTags />

            <section className='usersection'>
                <div className="container">
                    <div className='userBox'>
                        <div className='userName'>Hi,{userData.username}</div>
                        <div className='points'>
                            You have <span>
                                {points
                                    ?.filter(p => p.status === 'approved')
                                    .reduce((sum, p) => sum + parseFloat(p.points), 0)
                                }
                            </span> points
                        </div>
                        <div className="expiry-warning">
                            {points?.length > 0 && (() => {
                                const approved = points
                                    .filter(p => p.status === 'approved')
                                    .reduce((latest, current) => new Date(current.created_at) > new Date(latest.created_at) ? current : latest, points[0]);

                                if (!approved) return null;

                                const expiryDate = new Date(new Date(approved.created_at).setFullYear(new Date(approved.created_at).getFullYear() + 2))
                                    .toLocaleDateString('en-GB');

                                return (
                                    <>
                                        <i>⚠</i> Your <b>{approved.points}</b> Loyalty Points will expire on <b>{expiryDate}</b>
                                    </>
                                );
                            })()}
                        </div>

                        <div class="btn-container">
                            <button data-bs-toggle="modal" data-bs-target="#reedeemModal" className="btn">Shop Now</button>
                            <button data-bs-toggle="modal" data-bs-target="#redeemPoints" className="btn">Redeem Now</button>
                            <button
                                className="btn"
                                onClick={() => document.getElementById('rewardsHistory')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Reward History
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="rewards-section redemrulesbox">
                <div className="container" style={{ borderBottom: "1px solid #ccc" }}>
                    <h2>Rules to to reedeem your reward points</h2>
                    <div className="reedeemRules">
                        <ul>
                            <li>For every 1000 points you can redeem $20</li>
                            <li>For every 2000 points you can redeem $40</li>
                            <li>For every 3000 points you can redeem $60</li>
                            <li>For every 5000 points you can redeem $200</li>
                            <li>You must use our referral link to claim points</li>
                            <li>You must have minimum 1000 points to redeem cash</li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="rewards-section">
                <div className="container" style={{ borderBottom: "1px solid #ccc" }}>
                    <h2>Ways to Earn Points</h2>
                    <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1">
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">👤</div>
                                <div className="reward-title">30 Points</div>
                                <div className="reward-desc">Create An Account</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">🛒</div>
                                <div className="reward-title">30 Points</div>
                                <div className="reward-desc">For Every verified purchase</div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">🎂</div>
                                <div className="reward-title">100 Points</div>
                                <div className="reward-desc">Happy Birthday</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">🎂</div>
                                <div className="reward-title">30 Points</div>
                                <div className="reward-desc">If our coupon code does not work (You must use our referral link to claim points)</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">🎂</div>
                                <div className="reward-title">50 Points</div>
                                <div className="reward-desc">Refer a friend </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className='rewardHistoryPage' id='rewardsHistory'>
                <div className="container">
                    <h1>Reward History</h1>

                    <div className="table-container">
                        <table >
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Action</th>
                                    <th>Points</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Purchase Screenshot</th>
                                </tr>
                            </thead>
                            <tbody>
                                {points?.map((p) => (
                                    <tr key={p.id}>
                                        <td>{new Date(p.created_at).toLocaleDateString()}</td>
                                        <td>{p.description}</td>
                                        <td className={p.points > 0 ? 'text-success' : 'text-danger'}>
                                            {p.points > 0 ? `+${p.points}` : p.points}
                                        </td>
                                        <td className={`status ${p.type === 'redeem' ? 'status-redeemed' :
                                            p.type === 'expired' ? 'status-expired' :
                                                'status-earned'
                                            }`}
                                        >
                                            {TYPE_LABELS[p.type] || p.type}
                                        </td>
                                        <td>{p.status.charAt(0).toUpperCase() + p.status.slice(1)}</td>
                                        <td>
                                            {p.type === 'earned_by_purchase' && p.status === 'pending' ? (
                                                <div className="btnBox">
                                                    {p.proof_image ? (
                                                        <>
                                                            <button
                                                                data-bs-toggle="modal"
                                                                className="showScreenShot"
                                                                data-bs-target="#showScreenShot"
                                                                aria-label="screen-shot"
                                                                title="screenshot"
                                                                onClick={() => setModalScreenshot(p.proof_image)}
                                                            >
                                                                <Image
                                                                    width={50}
                                                                    height={50}
                                                                    src={p.proof_image}
                                                                    alt="Screenshot"
                                                                />
                                                            </button>
                                                            {/* <button
                                                                className="deletebtn"
                                                                onClick={() => handleDelete(p.id)}
                                                                aria-label="delete-screenshot"
                                                                title="delete-screenshot"
                                                            >
                                                                <Image
                                                                    width={20}
                                                                    height={20}
                                                                    src="/images/trash.svg"
                                                                    alt="Delete"
                                                                />
                                                            </button> */}
                                                        </>
                                                    ) : (
                                                        <div className="upload-container">
                                                            <label htmlFor={`file-upload-${p.id}`} className="custom-upload">
                                                                Upload screenshot
                                                            </label>
                                                            <input
                                                                id={`file-upload-${p.id}`}
                                                                type="file"
                                                                className="hidden-input"
                                                                accept="image/*"
                                                                onChange={(e) => handleFileChange(e, p.id)}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </section>
            <section className="rewards-section">
                <div className="container">
                    <h2>How our reward program works ?</h2>
                    <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1">
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">
                                    <Image
                                        src="/images/join.svg"
                                        alt="join"
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="reward-title">Join</div>
                                <div className="reward-desc">Sign up and start collecting points today!</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">
                                    <Image
                                        src="/images/purchase.svg"
                                        alt="join"
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="reward-title">Qualified Purchase</div>
                                <div className="reward-desc">Get points with every qualified purchase.</div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">
                                    <Image
                                        src="/images/earn-points.svg"
                                        alt="join"
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="reward-title">Collect Points</div>
                                <div className="reward-desc">Every purchase brings you some points</div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">
                                    <Image
                                        src="/images/redeem.svg"
                                        alt="join"
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="reward-title">Redeem</div>
                                <div className="reward-desc">Instantaly convert all your points into dollars</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="subscribe-section">
                <div class="container">
                    <div class="subscribe-box">
                        <h2>🎁 Unlock Exclusive Rewards!</h2>
                        <p>Join our newsletter and start earning points, deals, and surprise perks straight to your inbox.</p>
                        <form class="subscribe-form">
                            <div>
                                <input type="email" class="form-control" placeholder="Enter your email" required />
                            </div>
                            <div>
                                <button type="submit" class="btn btn-subscribe w-100">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* search modal */}
            <div
                className="modal fade giftModal reedeemModal"
                id="reedeemModal"
                tabIndex="-1"
                aria-labelledby="redeemModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Serach Stores</h5>
                            <button
                                type="button"
                                className="closeBtn ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >x</button>
                        </div>
                        <div className="modal-body">
                            <div className="saerchBx">
                                <ReactSearchBox
                                    placeholder="Search Store"
                                    value=""
                                    className="d-flex navbarSearch"
                                    data={filterdata}
                                    onFocus={() => fetchData()}
                                    clearOnSelect={true}
                                    onSelect={(record) => {
                                        const { key } = record.item;

                                        window.location.href = `/${key}`;

                                    }}
                                    leftIcon={<svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="#2f3c97"
                                        className="bi bi-search"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* screen shot modal */}
            <div
                className="modal fade giftModal reedeemModal"
                id="showScreenShot"
                tabIndex="-1"
                aria-labelledby="redeemModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Purchase Screenshot</h5>
                            <button
                                type="button"
                                className="closeBtn ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >x</button>
                        </div>
                        <div className="modal-body">
                            <img src={`${modalScreenshot}`} style={{
                                width: '100%',       // full width of parent
                                height: '100%',      // full height of parent
                                objectFit: 'contain' // maintain aspect ratio
                            }} />
                        </div>
                    </div>
                </div>
            </div>
            {/* reedeem now modal */}
            <div
                className="modal fade giftModal "
                id="redeemPoints"
                tabIndex="-1"
                aria-labelledby="redeemModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Redeem your points</h5>
                            <button
                                type="button"
                                className="closeBtn ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >x</button>
                        </div>
                        <div className="modal-body">
                            <div className="redeeminput">
                                <label htmlFor=""> Enter how many points you want to redeem (minimum 1000 points)</label>
                                <input type="number" className='form-control' placeholder='eg 1000' />
                                <span className='errmsg'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 200C333.3 200 344 210.7 344 224L344 336C344 349.3 333.3 360 320 360C306.7 360 296 349.3 296 336L296 224C296 210.7 306.7 200 320 200zM293.3 416C292.7 406.1 297.6 396.7 306.1 391.5C314.6 386.4 325.3 386.4 333.8 391.5C342.3 396.7 347.2 406.1 346.6 416C347.2 425.9 342.3 435.3 333.8 440.5C325.3 445.6 314.6 445.6 306.1 440.5C297.6 435.3 292.7 425.9 293.3 416z" /></svg>
                                    you must have at least 1000 points to complete your reedeem.
                                </span>
                                <p className='txt'>Your amount will be transfered to your payPal account jouhn@payPal <a href="/profile">change payPal account</a></p>
                                <div className="text-center">
                                    <button>Redeem Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            },
        };
    }
    console.log("in")
    // Fetch user details from Django via your Next.js API route
    try {
        const res = await fetch(`https://admin.rewarditt.com/api/user-details`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                Cookie: context.req.headers.cookie || '',
                'x-api-key': process.env.SECRET_KEY

            },
        });

        if (res.status !== 200) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        const data = await res.json();
        // Check if bank details are incomplete
        const bank = data.bank_detail || {};
        const missingBankInfo =
            !bank.account_holder_name ||
            !bank.account_number ||      // corrected from bank_number
            !bank.bank_name ||
            !bank.ifsc_code ||
            !bank.swift_code ||
            !bank.paypal_email;
        if (missingBankInfo) {
            return {
                redirect: {
                    destination: '/profile',
                    permanent: false,
                },
            };
        }

        return {
            props: {
                userData: data,
            },
        };
    } catch (err) {
        console.log("innn")

        console.error(err);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}

