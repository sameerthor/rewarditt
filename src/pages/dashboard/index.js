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

const MIN_REDEEM = parseInt(process.env.NEXT_PUBLIC_MIN_REDEEM_POINTS || "1000");

export default function singleUser({ userData }) {


    const [filterdata, setFilterdata] = useState([]);

    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalScreenshot, setModalScreenshot] = useState('');
    const [redeemPoints, setRedeemPoints] = useState("");
    const [error, setError] = useState("");


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



    const handleChange = (e) => {
        const val = parseInt(e.target.value) || 0;
        var availablePoints = points
            ?.filter(p => p.status === 'approved')
            .reduce((sum, p) => sum + parseFloat(p.points), 0)

        setRedeemPoints(val);
        if (val < MIN_REDEEM) {
            setError(`You must have at least ${MIN_REDEEM} points to redeem.`);
        } else if (val > availablePoints) {
            setError(`You cannot redeem more than your available points (${availablePoints}).`);
        } else {
            setError("");
        }
    };

    const handleRedeem = async () => {
        if (error || !redeemPoints) return;

        try {
            const res = await fetch("/api/redeem-points/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ points: redeemPoints })
            });

            const data = await res.json();
            if (res.status === 200) {
                alert("Redeem request submitted successfully!");
                setRedeemPoints("");
            } else {
                alert(data.error || "Failed to submit redeem request.");
            }
        } catch (err) {
            console.error(err);
            alert("Error submitting redeem request.");
        }
    };
    // =========refer and earn===========
    const [copied, setCopied] = useState(false);
    const referralLink = `https://rewarditt.com?ref=${userData.referral_link}`;
    const [stats, setStats] = useState({
        total: 8,
        pending: 2,
        confirmed: 6,
        earned: 450,
    });

    // Progress bar widths
    const [bars, setBars] = useState(["0%", "0%", "0%"]);
    useEffect(() => {
        const total = stats.total;
        setBars([
            Math.min((total / 10) * 100, 100) + "%",
            total <= 10 ? "0%" : Math.min(((total - 10) / 40) * 100, 100) + "%",
            total <= 50 ? "0%" : Math.min(((total - 50) / 50) * 100, 100) + "%",
        ]);
    }, [stats]);

    // Copy to clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    // Share handler
    const handleShare = (type) => {
        const link = encodeURIComponent(referralLink);
        const text = encodeURIComponent(
            "Join me on YourRewards and grab your signup bonus!"
        );
        const map = {
            whatsapp: `https://wa.me/?text=${text}%20${link}`,
            telegram: `https://t.me/share/url?url=${link}&text=${text}`,
            x: `https://x.com/intent/tweet?text=${text}&url=${link}`,
            email: `mailto:?subject=Join%20YourRewards&body=${text}%0A${link}`,
        };
        window.open(map[type], "_blank", "noopener,noreferrer");
    };

    // Web Share API
    const inviteContacts = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "YourRewards",
                    text: "Join me on YourRewards and earn bonuses!",
                    url: referralLink,
                });
            } catch { }
        } else {
            alert("Sharing not supported on this browser. Copy the link instead.");
        }
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
                        <div className='userName'>Hi, {userData.username}</div>
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
                            <button data-bs-toggle="modal" data-bs-target="#redeemPoints" className="btn">Redeem Cash</button>
                            <button
                                className="btn"
                                onClick={() => document.getElementById('rewardsHistory')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Reward History
                            </button>
                        </div>
                    </div>
                    <div class="recent-stores">
                        <h2>Recently Visited Stores</h2>
                        <div class="store-list">
                            <a href="#" class="store-link">Amazon</a>
                            <a href="#" class="store-link">Flipkart</a>
                            <a href="#" class="store-link">Myntra</a>
                            <a href="#" class="store-link">Ajio</a>
                            <a href="#" class="store-link">Snapdeal</a>
                            <a href="#" class="store-link">Tata Cliq</a>

                        </div>
                    </div>
                </div>
            </section>
            {/* <section class="recent-stores">
                <div class="recent-stores">
                  <h2>Recently Visited Stores</h2>
                  <div class="store-list">
                    <a href="#" class="store-link">Amazon</a>
                    <a href="#" class="store-link">Flipkart</a>
                    <a href="#" class="store-link">Myntra</a>
                    <a href="#" class="store-link">Ajio</a>
                    <a href="#" class="store-link">Snapdeal</a>
                    <a href="#" class="store-link">Tata Cliq</a>
                    <a href="#" class="store-link">Paytm Mall</a>
                    <a href="#" class="store-link">Nykaa</a>
                  </div>
                </div>
            </section> */}
            <section className='rewardHistoryPage' id='rewardsHistory'>
                <div className="container">
                    <h2>Reward History</h2>

                    <div className="table-container">
                        <table >
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Action</th>
                                    <th>Points</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Purchase Screenshot <br /> <small>(Upload only if coupon code <br />does not work)</small></th>
                                    <th>Order Id</th>
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
                                            {p.type === 'earned_by_purchase' || p.type === 'coupon_not_worked' ? (
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
                                        <td>
                                            {p.type === 'earned_by_purchase' || p.type === 'coupon_not_worked' ? (
                                                <input type="text" value={p.order_id} onBlur={async (e) => {
                                                    const newOrderId = e.target.value;

                                                    if (!newOrderId || newOrderId === p.order_id) return;

                                                    await fetch("/api/redeem-points/update-order-id", {
                                                        method: "PATCH",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({ id: p.id, order_id: newOrderId }),
                                                    });
                                                }} className='form-control' placeholder='Enter Order Id' />) : ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </section>
            <section className="rewards-section">
                <div className="container yelloBg" style={{ borderBottom: "1px solid #ccc" }}>
                    <h2>Ways to Earn Points</h2>
                    <div className="row row-cols-lg-5 row-cols-md-3 row-cols-1">
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
                                <div className="reward-title">50 Points</div>
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
                                <div className="reward-icon">🏷️</div>
                                <div className="reward-title">100 Points</div>
                                <div className="reward-desc">If our coupon code does not work <small>You must purchase the product and use our referral link to claim points</small></div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">👥</div>
                                <div className="reward-title">50 Points</div>
                                <div className="reward-desc">Refer a friend </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="rewards-section redemrulesbox">
                <div className="container">
                    <div className='redeemRulesContainer'>
                        <div className="reward-container">
                            <h2>Rules to redeem your reward points</h2>
                            <div className="reward-rules">
                                <div className="rule-box">

                                    <p>For every 1000 points you can redeem <span className="redeem">$60</span></p>
                                </div>
                                <div className="rule-box">

                                    <p>For every 2000 points you can redeem <span className="redeem">$100</span></p>
                                </div>
                                <div className="rule-box">

                                    <p>For every 3000 points you can redeem <span className="redeem">$200</span></p>
                                </div>
                                <div className="rule-box">

                                    <p>For every 5000 points you can redeem <span className="redeem special">$500</span></p>
                                </div>
                                <div className="rule-box">

                                    <p>100 Points will be credited if coupon code does not work. <span className="redeem">100</span></p>
                                </div>
                                <div className="rule-box">

                                    <p>You must use our referral link to claim points</p>
                                </div>
                                <div className="rule-box">

                                    <p>You must have 1000 points to redeem cash</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="wrap referAndErn" id='referAndEarn'>
                <div className="container">
                    <div className="hero">
                        <h2>Refer &amp; Earn</h2>
                        <p>
                            Invite friends to <strong>YourRewards</strong>. They get a signup
                            bonus; you earn cashbacks + bonus multipliers. No limits.
                        </p>

                        {/* Referral Box */}
                        <div className="ref-box">
                            <div className="ref-input">
                                <code>{referralLink}</code>
                            </div>
                            <div className="row">
                                <button className="btn" onClick={handleCopy}>
                                    Copy Link
                                </button>
                                {copied && <span className="copied">Copied!</span>}
                            </div>

                            <div className="share-row">
                                <button className="share-chip" onClick={() => handleShare("whatsapp")}>
                                    Share on WhatsApp
                                </button>
                                <button className="share-chip" onClick={() => handleShare("telegram")}>
                                    Share on Telegram
                                </button>
                                <button className="share-chip" onClick={() => handleShare("x")}>
                                    Share on X
                                </button>
                                <button className="share-chip" onClick={() => handleShare("email")}>
                                    Share via Email
                                </button>
                                <span className="spacer"></span>
                                <button className="btn secondary" onClick={inviteContacts}>
                                    Invite Contacts
                                </button>
                            </div>
                        </div>

                        <div className="grid">
                            {/* Left Column */}
                            <div className="card">
                                <h3>How it works</h3>
                                <div className="steps">
                                    <div className="step">
                                        <span className="badge">Step 1</span>
                                        <b>Share your link</b>
                                        <p className="muted">Send it to friends via WhatsApp, Telegram, X, or email.</p>
                                    </div>
                                    <div className="step">
                                        <span className="badge">Step 2</span>
                                        <b>Friend signs up</b>
                                        <p className="muted">They join using your link and complete their first action.</p>
                                    </div>
                                    <div className="step">
                                        <span className="badge">Step 3</span>
                                        <b>You both earn</b>
                                        <p className="muted">You get cashback + bonus, your friend gets a signup reward.</p>
                                    </div>
                                </div>


                            </div>
                        </div>
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
                            <h5 className="modal-title">Redeem your points</h5>
                            <button type="button" className="closeBtn ms-auto" data-bs-dismiss="modal">x</button>
                        </div>
                        <div className="modal-body">
                            <div className="redeeminput">
                                <label>
                                    Enter how many points you want to redeem (minimum {MIN_REDEEM} points)
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder={`eg ${MIN_REDEEM}`}
                                    value={redeemPoints}
                                    onChange={handleChange}
                                />
                                {error && <span className="errmsg">{error}</span>}
                                <p className="txt">
                                    Your amount will be transferred to your PayPal account {userData.paypal_email}{" "}
                                    <a href="/profile">change PayPal account</a>
                                </p>
                                <div className="text-center">
                                    <button onClick={handleRedeem} disabled={!!error || !redeemPoints}>
                                        Redeem Cash
                                    </button>
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
