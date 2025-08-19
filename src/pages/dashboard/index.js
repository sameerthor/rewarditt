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


export default function singleUser({ data }) {


  const router = useRouter();
  const [filterdata, setFilterdata] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const toggleBtnRef = useRef(null);

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
    
    //upload
   const [images, setImages] = useState({});

  const handleImageChange = (e, rowId) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImages((prev) => ({ ...prev, [rowId]: imgUrl }));
    }
  };

  const handleDelete = (rowId) => {
    setImages((prev) => {
      const updated = { ...prev };
      delete updated[rowId];
      return updated;
    });
  };
// =========refer and earn===========
 const [copied, setCopied] = useState(false);
  const referralLink = "https://rewarditt.com/myreward";
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
      } catch {}
    } else {
      alert("Sharing not supported on this browser. Copy the link instead.");
    }
  };
//upload ss if coupon code not work
  const [transactions, setTransactions] = useState([
    { id: 1, date: "", description: "", storeUrl: "" },
  ]);

  const [screenshots, setScreenshots] = useState({});

  const uploadScreenshot = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setScreenshots((prev) => ({
        ...prev,
        [id]: fileURL,
      }));
    }
  };

  const removeScreenshot = (id) => {
    setScreenshots((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const updateTransaction = (id, field, value) => {
    setTransactions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addTransaction = () => {
    setTransactions((prev) => [
      ...prev,
      { id: Date.now(), date: "", description: "", storeUrl: "" },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));

    // also remove screenshot if uploaded
    setScreenshots((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

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
            {/* <section className='userInfo'>
                <div className='container'>
                    <h1 className="heading">Reward &amp; Payment Info of MS Dhoni</h1>

                    <div className="dashboard">
                       
                        <div className="card">
                            <h2 className="card-title">User Information</h2>
                            <div className="info-row"><span className="info-label">UserName:</span><span className="info-value">{username}</span></div>
                            <div className="info-row"><span className="info-label">Email:</span><span className="info-value">{email}</span></div>

                        </div>

                        
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
            </section> */}
            <section className='usersection'>
                <div className="container">
                    <div className='userBox'>
                            <div className='userName'>Hi, {username}</div>
                            <div className='points'>You have <span>50</span> points</div>

                            <div class="expiry-warning">
                                <i>⚠</i> Your <b>50</b> Loyalty Points will expire on <b>06/07/2026</b>
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
                </div>
            </section>
             <section className="rewards-section redemrulesbox">
                <div className="container" style={{borderBottom: "1px solid #ccc"}}>
                    <div className='redeemRulesContainer'>
                         <div class="rules-container">
                            <h2 class="rules-title text-center">Rules to  reedeem your reward points</h2>
                            <div class="rules-list row row-cols-lg-4  row-cols-md-3  row-cols-sm-2 row-cols-1">
                                <div className='col'>
                                    <div className='li'>
                                        <div class="rule-icon">💵</div>
                                        <div class="rule-text">For every 1000 points you can redeem $20</div>
                                    </div>
                                </div>
                                 <div className='col'>
                                    <div className='li'>
                                        <div class="rule-icon">💵</div>
                                        <div class="rule-text">For every 2000 points you can redeem $40</div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='li'>
                                        <div class="rule-icon">💵</div>
                                        <div class="rule-text">For every 3000 points you can redeem $60</div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='li'>
                                        <div class="rule-icon">💵</div>
                                        <div class="rule-text">For every 5000 points you can redeem $200</div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='li'>
                                        <div class="rule-icon">💵</div>
                                        <div class="rule-text">You must use our referral link to claim points</div>
                                    </div>
                               </div>
                                <div className='col'>
                                   <div className='li'>
                                        <div class="rule-icon">💵</div>
                                        <div class="rule-text">You must have 1000 points to redeem cash</div>
                                    </div>
                                </div>
                                <div className='col'>
                                   <div className='li'>
                                        <div class="rule-icon">💵</div>
                                        <div class="rule-text">100 Points will be credited  if coupon code  does not work. </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="rewards-section">
                <div className="container" style={{borderBottom: "1px solid #ccc"}}>
                        <h2>Ways to Earn Points</h2>
                    <div className="row row-cols-lg-5 row-cols-md-2 row-cols-1">
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
                                <div className="reward-icon">👬</div>
                                <div className="reward-title">50 Points</div>
                                <div className="reward-desc">Refer a friend </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="reward-box">
                                <div className="reward-icon">🏷️</div>
                                <div className="reward-title">30 Points</div>
                                <div className="reward-desc">If our coupon code does not work <small>* You must purchase the product and use our referral link to claim points</small></div>
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
            <section className='rewardHistoryPage' id='rewardsHistory'>
                <div className="container">
                    <h2>Reward History</h2>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                <th>Date</th>
                                <th>Action</th>
                                <th>Points</th>
                                <th>Status</th>
                                <th>Purchse Screenshot</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                <td>2025-06-10</td>
                                <td>Purchase at XYZ Store</td>
                                <td>+30</td>
                                <td className="status status-earned">Earned</td>
                               
                               
                                </tr> */}
                                {/* <tr>
                                <td>2025-05-28</td>
                                <td>Redeemed for Gift Card</td>
                                <td>-20</td>
                                <td className="status status-redeemed">Redeemed</td>
                                <td>
                                    <div className='btnBox'>

                                         <div className="upload-container">
                                            <label htmlFor="file-upload" className="custom-upload">
                                                Upload screenshot
                                            </label>
                                            <input id="file-upload" type="file" className="hidden-input" accept="image/*" />
                                            </div>
                                        
                                    </div>
                                </td>
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
                                </tr> */}
                               {[1, 2, 3].map((rowId) => (
                                <tr key={rowId}>
                                    <td>2025-06-10</td>
                                    <td>Purchase at XYZ Store</td>
                                    <td>+30</td>
                                    <td className="status status-earned">Earned</td>
                                    <td>
                                        <div className="btnBox">
                                            {!images[rowId] ? (
                                            <div className="upload-container">
                                                <label htmlFor={`file-upload-${rowId}`} className="custom-upload">
                                                Upload screenshot
                                                </label>
                                                <input
                                                id={`file-upload-${rowId}`}
                                                type="file"
                                                className="hidden-input"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e, rowId)}
                                                />
                                            </div>
                                            ) : (
                                            <>
                                                <button
                                                className="showScreenShot"
                                                aria-label="screen-shot"
                                                title="screenshot"
                                                >
                                                <Image
                                                    src={images[rowId]}
                                                    width={50}
                                                    height={50}
                                                    alt="uploaded"
                                                />
                                                </button>
                                                <button
                                                className="deletebtn"
                                                onClick={() => handleDelete(rowId)}
                                                aria-label="delete-screenshot"
                                                title="delete-screenshot"
                                                >
                                                <Image src="/images/trash.svg" width={20} height={20} alt="delete" />
                                                </button>
                                            </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
             <section className='rewardHistoryPage'>
                <div className="container">
                    <h2>Upload  Screenshot if coupon code does not work.</h2>

                    <div className="table-container">
                      <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Action</th>
          <th>Store URL</th>
          <th>Purchase Screenshot</th>
          <th>
            <button type="button" onClick={addTransaction} className="addAction addrow">
              Add Row
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                    type="date"
                    value={item.date}
                    className="form-control"
                    max={new Date().toISOString().split("T")[0]}  // ⬅️ prevents future dates
                    onChange={(e) =>
                    updateTransaction(item.id, "date", e.target.value)
                    }
                />
            </td>
            <td>
              <input
                type="text"
                value={item.description}
                className="form-control"
                placeholder="Enter action"
                onChange={(e) =>
                  updateTransaction(item.id, "description", e.target.value)
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={item.storeUrl}
                className="form-control"
                placeholder="Enter store URL"
                onChange={(e) =>
                  updateTransaction(item.id, "storeUrl", e.target.value)
                }
              />
            </td>
            <td>
              <div className="btnBox">
                {!screenshots[item.id] ? (
                  <div className="upload-container">
                    <label className="custom-upload">
                      Upload screenshot
                      <input
                        type="file"
                        className="hidden-input"
                        accept="image/*"
                        onChange={(e) => uploadScreenshot(e, item.id)}
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <button
                      className="showScreenShot"
                      aria-label="screen-shot"
                      title="screenshot"
                    >
                      <Image
                        src={screenshots[item.id]}
                        width={50}
                        height={50}
                        alt="uploaded"
                      />
                    </button>
                    <button
                      className="deletebtn"
                      aria-label="delete-screenshot"
                      title="delete-screenshot"
                      onClick={() => removeScreenshot(item.id)}
                    >
                      <Image
                        src="/images/trash.svg"
                        width={20}
                        height={20}
                        alt="delete"
                      />
                    </button>
                  </>
                )}
              </div>
            </td>
            <td>
              <button
                type="button"
                className="deleteRowBtn addAction"
                onClick={() => deleteTransaction(item.id)}
              >
                Delete Row
              </button>
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
                <div className="saerchBx">
                    
                    
                </div>
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
                    <input type="number" className='form-control' placeholder='eg 1000'/>
                    <span className='errmsg'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 200C333.3 200 344 210.7 344 224L344 336C344 349.3 333.3 360 320 360C306.7 360 296 349.3 296 336L296 224C296 210.7 306.7 200 320 200zM293.3 416C292.7 406.1 297.6 396.7 306.1 391.5C314.6 386.4 325.3 386.4 333.8 391.5C342.3 396.7 347.2 406.1 346.6 416C347.2 425.9 342.3 435.3 333.8 440.5C325.3 445.6 314.6 445.6 306.1 440.5C297.6 435.3 292.7 425.9 293.3 416z"/></svg>
                        you must have at least 1000 points to complete your reedeem.
                    </span>
                    <p className='txt'>Your amount will be transfered to your payPal account jouhn@payPal <a href="/profile">change payPal account</a></p>
                    <div className="text-center">
                        <button>Redeem Cash</button>
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

