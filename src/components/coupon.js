import MainDomainLink from '@/components/MainDomainLink';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import FeedbackComponent from '../components/FeedbackComponent';
import { useRef } from 'react';

import {
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const stripPTags = (html) => html.replace(/^<p>|<\/p>$/g, '');

const getHeading = (title) => {
  if (!title) return "";

  // Check for percentage discount (e.g., "40% OFF")
  const percentMatch = title.match(/(\d+)%/);
  if (percentMatch) {
    return `${percentMatch[1]}% </br> OFF`;
  }

  // Check for dollar discount (e.g., "$40 OFF")
  const dollarMatch = title.match(/\$(\d+)/);
  if (dollarMatch) {
    return `$${dollarMatch[1]} </br> OFF`;
  }

  // Check for "Free Shipping"
  if (/free shipping/i.test(title)) {
    return "Free </br> Shipping";
  } else {
    return "Offer";
  }

  return "";
};
const baseDomain = 'rewarditt.com';

export default function Coupon({ expiryDate, index, coupon, storeImage, storeName, affiliateUrl, homeUrl, storeSlug, storeId, storeCreateTime, usesSubdomain }) {
  const [worked, setWorked] = useState(coupon.is_worked);
  const [totalUsed, setTotalUsed] = useState(coupon.total_used);

  const h2_heading = ["Working Storename Coupon Code", "Storename Best Discount Code", "Storename Promo Codes 2025", "Storename Coupons 2025"];

  const accordionId = `accordion-${index}`;
  const collapseId = `collapse-${index}`;
  const historyAccordionId = `historyAccordionId-${index}`;
  const historyCollapseId = `historyCollapseId-${index}`;
  const [modalOpen, setModalOpen] = useState(false);
  const [copytext, setCopyText] = useState("Copy code");
  const [isExpanded, setIsExpanded] = useState(true);
  const maxChars = 40;

  const showMore = coupon.content.length > maxChars;

  useEffect(() => {
    const runOnce = async () => {
      if (typeof window !== "undefined") {
        const urlHash = window.location.hash?.replace('#', '');
        if (urlHash === `code=${index + 1}`) {
          await setModalOpen(true);
  
          // Slight delay to ensure modal DOM is ready
          setTimeout(() => {
            const modalElement = coupon.coupon_type === "code"
              ? document.getElementById('getCode' + coupon.id)
              : document.getElementById('getDeal' + coupon.id);
  
            if (modalElement) {
              console.log("innnn");
              const modal = new bootstrap.Modal(modalElement);
              modal.show();
            }
          }, 500); // Optional delay to allow re-render
  
          localStorage.removeItem("copied_code");
        }
      }
    };
  
    runOnce();
  }, []); // runs once on mount
  


  async function trackCouponUsage(couponComponentId) {
    setTotalUsed(totalUsed + 1);
    try {
      const response = await fetch(
        `https://admin.rewarditt.com/stores/${storeSlug}/track-coupon-usage/${couponComponentId}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return await response.json();
    } catch (error) {
      console.error('Tracking failed:', error);
    }
  }

  async function isWorked(couponComponentId, is_worked) {
    setTotalUsed(totalUsed + 1);
    try {
      const response = await fetch(
        `https://admin.rewarditt.com/stores/${storeSlug}/coupon-worked/${couponComponentId}/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ is_worked }) // Pass is_worked in the request body
        }
      );

      return await response.json();
    } catch (error) {
      console.error('Tracking failed:', error);
    }
  }
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [copied, setCopied] = useState(false);



  return (
    <>
     
      <div className="costCouponBox">
        <div className='costCouponBoxInner'>
          <div className="left costItem">
              <div className="discountbox">
                <div dangerouslySetInnerHTML={{ __html: getHeading(coupon.title) }}></div>
              </div>
              <div className='isVerified'>
                     <svg
                       
                        viewBox="0 0 8 8"
                        xmlns="http://www.w3.org/2000/svg"
                        
                        aria-hidden="true"
                      >
                        <title>Verified</title>
                        <path
                         
                          fillRule="nonzero"
                          d="M7.98750827,0.375814507 L7.88350199,0.0882483424 C7.86919644,0.0498274851 7.84187102,0.0204303529 7.80831328,0.00735910207 C7.77475555,-0.00571214878 7.7381144,-0.00123097153 7.70749138,0.0196895233 L7.62588646,0.07682187 L7.56828299,0.109196871 C5.81743711,1.38888215 4.24801779,2.99067402 2.91840256,4.85499077 C2.83179974,4.97140687 2.68422041,4.98805585 2.5807822,4.89307901 L0.892680396,3.33907907 C0.836474558,3.28723834 0.757734812,3.28802586 0.702268909,3.34098349 L0.0558299262,3.95039522 C0.0228665487,3.98215581 0.00268594533,4.02898938 0.000249055104,4.07938298 C-0.00218783512,4.12977657 0.0133449937,4.17905651 0.0430291515,4.21510845 L3.16321733,7.94585092 C3.19898596,7.98885473 3.25032895,8.0079805 3.30031468,7.99692104 C3.3503004,7.98586157 3.39243831,7.94605292 3.41283238,7.89062298 C4.06887194,6.09285836 5.82417781,2.90487321 7.95230615,0.575777732 C7.99876766,0.524945513 8.01291734,0.444569252 7.98750827,0.375814507 Z"
                        />
                      </svg>
                      <span>Verified</span>
                      <span className='time'>Today</span>
                </div>
          </div>
          <div className="right costItem">
            <div className='rightItem'>
                <div className='titleBtn'>
                  <div>
                    <div className="rightLogo">
                      <Image
                        src={`${storeImage}`}
                        alt={`${storeName} Store Logo`}
                        width={128}
                        height={128}
                        loading="lazy"
                      />
                      <span> {storeName}</span>
                    </div>
                     <h2 className='title'> {coupon.title}</h2>
                  </div>
                   <div className='btns'>
                    {coupon.coupon_type === 'code' ? (
                    <button
                      onClick={async (e) => {
                        await trackCouponUsage(coupon.id);
                        localStorage.setItem('copied_code', coupon.id);
                        try {
                          await navigator.clipboard.writeText(coupon.coupon_code);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 10000);
                        } catch (err) {
                          console.error("Clipboard write failed:", err);
                        }

                        const url = usesSubdomain
                          ? `https://${storeSlug}.${baseDomain}#code=${index + 1}`
                          : `/${storeSlug}#code=${index + 1}`;

                        window.open(url, "_blank");

                        setTimeout(() => {
                          window.open(affiliateUrl, "_self");
                        }, 100);
                      }}
                      data-type="code"
                      className="angled-button"
                    > 
                      {coupon.coupon_code}

                      <span className='btn-angle'>Get Code</span>
                    </button>

                    ) : (
                    
                        <button rel="nofollow" className="angled-button" onClick={async (e) => {
                          await trackCouponUsage(coupon.id)
                          localStorage.setItem('copied_code', coupon.id)

                          const url = usesSubdomain
                            ? `https://${storeSlug}.${baseDomain}#code=${index + 1}`
                            : `/${storeSlug}#code=${index + 1}`

                          window.open(url, "_blank");
                          setTimeout(() => {
                            window.open(affiliateUrl, "_self");
                          }, 100);
                        }}
                        >
                          ********************************
                          <span className='btn-angle'>Show Code</span>
                        </button>
                    )}
                   </div>
                </div>
            </div>
            <div className='rightFooter'>
                <div>
                      <button className="showTncBox tnc tncBtns" data-bs-toggle="collapse" data-bs-target={`#${historyCollapseId}`} title="Show History">Coupon History</button>
                </div>
                <div>
                  {coupon.term_condition != "" &&
                    <button className="showTncBox tnc tncBtns" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} title="Show T &amp; C">Terms &amp; Conditions</button>
                  }
                </div>
            </div>
          </div>
        </div>
        {coupon.term_condition != "" &&
          <div id={accordionId} className="accordion">
            <div id={collapseId} className="collapse" aria-labelledby={`heading-${index}`} data-bs-parent={`#${accordionId}`}>
              <div className="card-body">
                <div className="tNcBox tNcTop">
                  <div dangerouslySetInnerHTML={{ __html: coupon.term_condition }} />
                </div>
              </div>
            </div>
          </div>
        }
         <div id={historyAccordionId} className="accordion">
          <div id={historyCollapseId} className="collapse" aria-labelledby={`heading-${index}`} data-bs-parent={`#${historyAccordionId}`}>
            <div className="card-body">
              <div className="historyBox tNcBox">
                <ul>
                  {coupon.last_used_at && coupon.coupon_type === "code" &&
                    <li>
                      '{coupon.coupon_code}' promo code was used by shoppers {formatDistanceToNow(new Date(coupon.last_used_at), { addSuffix: true })} {coupon.is_worked && (coupon.is_worked === "True" ? "and it worked." : "and it didn't work.")}
                    </li>
                  }

                  {coupon.last_used_at && coupon.coupon_type === "deal" &&
                    <li>
                      This coupon was used by shoppers {formatDistanceToNow(new Date(coupon.last_used_at), { addSuffix: true })} {coupon.is_worked && (coupon.is_worked === "True" ? "and it worked." : "and it didn't work.")}
                    </li>
                  }
                  <li>{`Added ${formatDistanceToNow(storeCreateTime, { addSuffix: true })}`} by {coupon.added_by}  - <button onClick={() => scrollToSection('scrollToScreenShot')}> Check Coupon Sreenshot History</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
       
       
        <>
          {modalOpen && coupon.coupon_type === "code" && (
            <div
              className="modal fade"
              id={`getCode${coupon.id}`}
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header" style={{ justifyContent: "space-between" }}>
                    <h5 className="modal-title" id="exampleModalLabel">
                      {coupon.title}
                    </h5>
                    <button
                      type="button"
                      className="btn btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setModalOpen(false)}
                    />
                  </div>
                  <div className="modal-body text-center">
                    <div className="modal-store-logo">
                      <a href={affiliateUrl || "#"}>
                        <img src={storeImage} alt={storeName || "Store"} />
                      </a>
                    </div>
                    <div className="modalCode">
                      <span>{coupon.coupon_code}</span>
                    </div>
                    <div
                      className="codeCopyBtn"
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.coupon_code);
                        setCopyText("Copied");
                      }}
                    >
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-scissors"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3.5 3.5c-.614-.884-.074-1.962.858-2.5L8 7.226 11.642 1c.932.538 1.472 1.616.858 2.5L8.81 8.61l1.556 2.661a2.5 2.5 0 1 1-.794.637L8 9.73l-1.572 2.177a2.5 2.5 0 1 1-.794-.637L7.19 8.61zm2.5 10a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                        </svg>
                        {copytext}
                      </button>
                    </div>
                    <div className="storeBtn">
                      <a href={affiliateUrl || "#"}>
                        Visit at {homeUrl || "Store"}
                      </a>
                    </div>

                    <FeedbackComponent />
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          )}
        </>
          {/* Coupon Pop-Up GET-deal Modal */}
        <>
          {(coupon.coupon_type == "deal" && modalOpen) &&
            <div
              className="modal fade"
              id={`getDeal${coupon.id}`}
              tabIndex={-1}
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" >
                  <div className="modal-header" style={{ justifyContent: "space-between" }}>
                    <h5 className="modal-title" id="exampleModalLabel">
                      {coupon.title}
                    </h5>
                    <button
                      type="button"
                      className="btn btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body text-center">
                    <div className="modal-store-logo">
                      <a href="#00">
                        <img
                          src={`${storeImage}`}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="modalCode d-flex align-items-center justify-content-center">
                      <span>
                        Code Activated{" "}
                        <svg
                          height={25}
                          width={25}
                          fill="#0ee032"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                      </span>
                    </div>
                    <div className="storeBtn">
                      <a href={`${affiliateUrl}`}>
                        Redeem at {homeUrl}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-chevron-double-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"
                          />
                          <path
                            fillRule="evenodd"
                            d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"
                          />
                        </svg>
                      </a>
                    </div>

                    <FeedbackComponent />
                  </div>
                  <div className="modal-footer"></div>
                </div>
              </div>
            </div>
          }
        </>
      </div>
    </>
  );
}