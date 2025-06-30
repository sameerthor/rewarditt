import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/giftcard.css";
import MainDomainLink from '@/components/MainDomainLink';
import { useMemo } from 'react';
import { useState, useRef, useEffect } from 'react';
import ResponsiveCarousel from "@/components/ResponsiveCarousel";
import ResponsiveRender from '@/components/ResponsiveRender';
import CustomSelect from '@/components/CustomSelect';
import moment from 'moment';
import { JSDOM } from 'jsdom';

export default function GiftCardPage({ gift_card, faqs,toprated }) {
    console.log(faqs)
    const options = [
        { value: 'udemy', label: 'Udemy', image: '/images/udemy.svg' },
        { value: 'coursera', label: 'Coursera', image: '/images/coursera.svg' },
        { value: 'edx', label: 'edX', image: '/images/edx.svg' },
    ];
    const [selectedAmount, setSelectedAmount] = useState('20');

    const giftAmounts = ['20', '25', '30', '35'];

    const handleClick = (amount) => {
        setSelectedAmount(amount);
    };

    const firstCarousel = [
        <div className="imgItem">
            <div className='overLay'>
                <div className='overLayBox'>
                    <div className='title'>
                        ScoopCost
                    </div>
                    <div className='brandName'>
                        {gift_card.store_name} Gift Card
                    </div>

                </div>
                <Image
                    width={600}
                    height={300}
                    src="/images/giftcard-2.webp" loading="lazy" alt="giftcard" />
            </div>
        </div>,
        <div className="imgItem">
            <div className='overLay'>
                <div className='overLayBox'>
                    <div className='title'>
                        ScoopCost
                    </div>
                    <div className='brandName'>
                        {gift_card.store_name} Gift Card
                    </div>

                </div>
                <Image
                    width={600}
                    height={300}
                    src="/images/giftcard.webp" loading="lazy" alt="giftcard" />
            </div>
        </div>,

    ];


    ;



    const getHeading = (title) => {
        if (!title) return "";

        // Check for percentage discount (e.g., "40% OFF")
        const percentMatch = title.match(/(\d+)%/);
        if (percentMatch) {
            return `${percentMatch[1]}% OFF`;
        }

        // Check for dollar discount (e.g., "$40 OFF")
        const dollarMatch = title.match(/\$(\d+)/);
        if (dollarMatch) {
            return `$${dollarMatch[1]} OFF`;
        }

        // Check for "Free Shipping"
        if (/free shipping/i.test(title)) {
            return "Free Shipping";
        }

        return "";
    };
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <>
            <NextSeo
                title={gift_card.seo_title}
                description={gift_card.seo_description}
            />
            <MetaTags />

            <section className='firstSec'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 topCarousel">
                            <ResponsiveCarousel
                                items={firstCarousel}
                                idPrefix="firstCarousel"
                                responsiveConfig={{ xs: 1, sm: 1, md: 1 }}
                            />
                            <ResponsiveRender
                                mobile={
                                    <>
                                        <div className="checkOutContainer">
                                            <div className='headFlex'>
                                                <div>
                                                    <h1 className='brandName'>{gift_card.store_name} Gift Card</h1>
                                                    <div className='brandCat'>
                                                        <Link href={`/gift-card/category/${gift_card.category?.slug}`}>{gift_card.category.title}</Link>
                                                    </div>
                                                    
                                                </div>
                                                <div className='brandImg'>
                                                    <Image
                                                        width={150}
                                                        height={50}
                                                        src={`${gift_card.image}`} loading="lazy" alt="logo" />
                                                </div>
                                            </div>
                                            <form action="#">
                                                <div className="giftValues">
                                                    {giftAmounts.map((amount) => (
                                                        <button
                                                            key={amount}
                                                            className={selectedAmount === amount ? 'active' : ''}
                                                            onClick={() => handleClick(amount)}
                                                            type='button'
                                                        >
                                                        ${amount}
                                                        </button>
                                                    ))}
                                                </div>

                                                <div className="inputBox">
                                                    <input
                                                        type="text"
                                                        id="cardAmount"
                                                        className="form-control amtInput"
                                                        value={selectedAmount}
                                                        onChange={(e)=>setSelectedAmount(e.target.value)}
                                                    />
                                                </div>

                                                <div className="inputBox">
                                                    <label htmlFor="paymentMethod">Payment method</label>
                                                    <CustomSelect />
                                                </div>
                                                <div className="inputBox">
                                                    <label htmlFor="paymentMethod">Billing Address</label>
                                                    <input type="text" className='form-control' placeholder='Address' />
                                                </div>
                                                <div className="inputBox">
                                                    <label htmlFor="paymentMethod">Email Address where Gift Card to be send</label>
                                                    <input type="email" className='form-control' placeholder='Email' />
                                                </div>
                                                <div>
                                                    <button
                                                        className="promobtn"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#showInput"
                                                        aria-expanded="false"
                                                        aria-controls="showInput"
                                                    >
                                                        Have a promo code? Apply here
                                                    </button>
                                                </div>
                                                <div
                                                    id="showInput"
                                                    className="accordion-collapse collapse"
                                                    aria-labelledby="headingOne"
                                                    data-bs-parent="#accordionExample"
                                                >
                                                    <div className="accordion-body">
                                                        <div className='promoInputBox'>
                                                            <input type="text" className='form-control' placeholder='Eg. SCOOP20' />
                                                            <button>Apply Here</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="payAmt">You pay only</label>
                                                    <div className='finalAmt'>
                                                        <span>${selectedAmount}</span>
                                                    </div>
                                                </div>
                                                <div className='payBtn'>
                                                    <div className='btnGrp d-none'>
                                                        <button type='submit' disabled>Proceed to pay</button>
                                                        <button className='cartBtn'>Add to Card <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" /></svg></button>
                                                    </div>
                                                    
                                                    {gift_card.affiliate_url ? (
                                                        <a
                                                            href={gift_card.affiliate_url}
                                                            target="_blank"
                                                            className="outOfStock"
                                                            style={{
                                                                width: '100%'
                                                            }}
                                                        >
                                                            Buy Now
                                                        </a>
                                                    ) : (
                                                        <div className="outOfStock">
                                                            This Gift Card is Out Of Stock!
                                                        </div>
                                                    )}
                                                </div>
                                                {/* <div className='pgateway'>
                                                    <span>Safe & Secure payment by razorpay</span>
                                                    <Image
                                                        width={150}
                                                        height={50}
                                                        src="/images/razorpay.svg" loading="lazy" alt="logo" />
                                                </div> */}
                                            </form>
                                        </div>
                                    </>
                                }
                                desktop={
                                    <>
                                    
                                    </>
                                }
                            />
                            <div className='FlexBtns'>
                                <button data-bs-toggle='modal' data-bs-target='#redeemModal'>How To Redeem</button>
                                <button data-bs-toggle='modal' data-bs-target='#termsCondition'>Terms &amp; Conditions</button>
                            </div>
                            <div className='imp'>
                                <h2>Important Points</h2>
                            </div>
                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="icon-box">
                                        💻
                                    </div>
                                    <div className="feature-text">
                                        <h4>Pay Online</h4>
                                        <p>Use it on apps and websites securely.</p>
                                    </div>
                                </div>

                                <div className="feature-card">
                                    <div className="icon-box">
                                        🔁
                                    </div>
                                    <div className="feature-text">
                                        <h4>Multi Use</h4>
                                        <p>Spend in parts until balance is used.</p>
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <div className="icon-box">
                                        💳
                                    </div>
                                    <div className="feature-text">
                                        <h4>Multi Card Acceptable</h4>
                                        <p>Multiple Cards are acceptable for payment</p>
                                    </div>
                                </div>


                                <div className="feature-card">
                                    <div className="icon-box">
                                        📅
                                    </div>
                                    <div className="feature-text">
                                        <h4>Valid for 4 Years</h4>
                                        <p>Redeemable up to 4 years after purchase.</p>
                                    </div>
                                </div>

                                <div className="feature-card">
                                    <div className="icon-box">
                                        🎁
                                    </div>
                                    <div className="feature-text">
                                        <h4>Clubbed with Offers</h4>
                                        <p>Combine with discounts and promos.</p>
                                    </div>
                                </div>
                                <div className="feature-card">
                                    <div className="icon-box">
                                        <Image
                                            width={40}
                                            height={40}
                                            src='/images/non-refundable.svg' loading="lazy" alt="logo" />
                                    </div>
                                    <div className="feature-text">
                                        <h4>Non Refundable</h4>
                                        <p>Gift card once purchased, can't be refunded.</p>
                                    </div>
                                </div>



                            </div>
                           
                            <div className='barndInfo'>
                                <div className='left'>
                                    <div className='ttl'>   {gift_card.store_name}</div>
                                    <div className='stars'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                        </svg>
                                    </div>
                                    <div className='infoBox'>
                                        {gift_card.phone_no && <div className='infoItem'>
                                            {gift_card.phone_no}
                                        </div>}
                                    </div>
                                    <div className='infoBox'>
                                        <div className='infoHead'>
                                            Categories
                                        </div>
                                        <div className='infoItem'>
                                            {gift_card.category.title}
                                        </div>
                                    </div>
                                    {gift_card.location && <div className='infoBox'>
                                        <div className='infoHead'>
                                            Location
                                        </div>
                                        <div className='infoItem'>
                                            {gift_card.location}
                                        </div>
                                    </div>}

                                </div>
                                <div className='right'>
                                    <div className="brandLogo">
                                        <Image
                                            width={150}
                                            height={50}
                                            src={`${gift_card.image}`} loading="lazy" alt="logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <ResponsiveRender
                                mobile={
                                    <>
                                    
                                    </>
                                }
                                desktop={
                                    <>
                                             <div className="checkOutContainer">
                                                <div className='headFlex'>
                                                    <div>
                                                        <h1 className='brandName'>{gift_card.store_name} Gift Card</h1>
                                                        <div className='brandCat'>
                                                            <Link href={`/gift-card/category/${gift_card.category?.slug}`}>{gift_card.category.title}</Link>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className='brandImg'>
                                                        <Image
                                                            width={150}
                                                            height={50}
                                                            src={`${gift_card.image}`} loading="lazy" alt="logo" />
                                                    </div>
                                                </div>
                                                <form action="#">
                                                    <div className="giftValues">
                                                        {giftAmounts.map((amount) => (
                                                            <button
                                                                key={amount}
                                                                className={selectedAmount === amount ? 'active' : ''}
                                                                onClick={() => handleClick(amount)}
                                                                type='button'
                                                            >
                                                            ${amount}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <div className="inputBox">
                                                        <input
                                                            type="text"
                                                            id="cardAmount"
                                                            className="form-control amtInput"
                                                            value={selectedAmount}
                                                            onChange={(e)=>setSelectedAmount(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="inputBox">
                                                        <label htmlFor="paymentMethod">Payment method</label>
                                                        <CustomSelect />
                                                    </div>
                                                    <div className="inputBox">
                                                        <label htmlFor="paymentMethod">Billing Address</label>
                                                        <input type="text" className='form-control' placeholder='Address' />
                                                    </div>
                                                    <div className="inputBox">
                                                        <label htmlFor="paymentMethod">Email Address where Gift Card to be send</label>
                                                        <input type="email" className='form-control' placeholder='Email' />
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="promobtn"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#showInput"
                                                            aria-expanded="false"
                                                            aria-controls="showInput"
                                                        >
                                                            Have a promo code? Apply here
                                                        </button>
                                                    </div>
                                                    <div
                                                        id="showInput"
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="headingOne"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="accordion-body">
                                                            <div className='promoInputBox'>
                                                                <input type="text" className='form-control' placeholder='Eg. SCOOP20' />
                                                                <button>Apply Here</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="payAmt">You pay only</label>
                                                        <div className='finalAmt'>
                                                            <span>${selectedAmount}</span>
                                                        </div>
                                                    </div>
                                                    <div className='payBtn'>
                                                        <div className='btnGrp d-none'>
                                                            <button type='submit' disabled>Proceed to pay</button>
                                                            <button className='cartBtn'>Add to Card <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" /></svg></button>
                                                        </div>
                                                        
                                                        {gift_card.affiliate_url ? (
                                                            <a
                                                                href={gift_card.affiliate_url}
                                                                target="_blank"
                                                                className="outOfStock"
                                                                style={{
                                                                    width: '100%'
                                                                }}
                                                            >
                                                                Buy Now
                                                            </a>
                                                        ) : (
                                                            <div className="outOfStock">
                                                                This Gift Card is Out Of Stock!
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* <div className='pgateway'>
                                                        <span>Safe & Secure payment by razorpay</span>
                                                        <Image
                                                            width={150}
                                                            height={50}
                                                            src="/images/razorpay.svg" loading="lazy" alt="logo" />
                                                    </div> */}
                                                </form>
                                            </div>
                                    </>
                                }
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className='abtGiftcard'>
                <div className="container">
                    <div className="about-giftcard-section">
                        <h2 className="section-title">About {gift_card.store_name}</h2>
                        <div dangerouslySetInnerHTML={{ __html: gift_card.about }}></div>
                    </div>

                </div>
            </section>
            <section className='checkOutgift'>
               <div className="container">
                    <a className="promo-card purple-gradient" href=''>
                        <div className="promo-icon">🏷️</div>
                        <div className="promo-text">Checkout {gift_card.store_name} Coupon Code</div>
                        <div className="promo-arrow">→</div>
                    </a>
               </div>
            </section>
            <section className='faqssec'>
                <div className="container py-5">
                    <h2 className="mb-4 text-center secHeading">Frequently Asked Questions About {gift_card.store_name} Gift Cards</h2>

                    <div className="accordion" id="giftCardFaq">
                        {faqs.map((faq, index) => {
                            const faqId = `faq${index + 1}`;
                            const collapseId = `collapse${index + 1}`;
                            const isFirst = index === 0;

                            return (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={faqId}>
                                        <button
                                            className={`accordion-button ${!isFirst ? 'collapsed' : ''}`}
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${collapseId}`}
                                            aria-expanded={isFirst ? 'true' : 'false'}
                                            aria-controls={collapseId}
                                        >
                                            {faq.question}
                                        </button>
                                    </h2>
                                    <div
                                        id={collapseId}
                                        className={`accordion-collapse collapse ${isFirst ? 'show' : ''}`}
                                        aria-labelledby={faqId}
                                        data-bs-parent="#giftCardFaq"
                                    >
                                        <div
                                            className="accordion-body"
                                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>
            <section className="topBrands brand-grid">
                <div className="container">
                    <h2 className='secHeading'>Top Rated Gift Cards</h2>
                    <div className="row row-cols-lg-5 row-col-md-3 row-cols-2">
                        {toprated.map(item=> <div className="col mb-5">
                            <a class="brand-card" href={`/gift-card/${item.slug}`}>
                                <Image className='brand-logo'
                                    width={80}
                                    height={80}
                                    src={`${item.image}`} loading="lazy" alt={`${item.store_name}`} />
                                <div class="brand-name">{item.store_name}</div>
                                <div class="discount-badge">{item.category?.title}</div>
                            </a>
                        </div>)}
                       
                    </div>
                </div>
            </section>
            {/* modals */}
            <div
                className="modal fade giftModal"
                id="redeemModal"
                tabIndex="-1"
                aria-labelledby="redeemModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">How To Redeem</h5>
                            <button
                                type="button"
                                className="closeBtn ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >x</button>
                        </div>
                        <div className="modal-body">
                            <div className="listItem">
                                <span className="method">Online</span>
                                <div
                                    className="custom-list"
                                    dangerouslySetInnerHTML={{ __html: gift_card.how_to_redeem }}
                                ></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* terms */}
            <div
                className="modal fade giftModal"
                id="termsCondition"
                tabIndex="-1"
                aria-labelledby="redeemModal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Terms &amp; Conditions</h5>
                            <button
                                type="button"
                                className="closeBtn ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >x</button>
                        </div>
                        <div className="modal-body">
                            <div className='listItem' dangerouslySetInnerHTML={{ __html: gift_card.terms_and_conditions }}>

                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


export async function getStaticPaths() {
    const res = await fetch('https://admin.scoopcost.com/gift-cards/',{
  headers: {
    'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
  },
});
    const gift_cards = await res.json();

    const paths = gift_cards.map(store => ({
        params: { slug: store.slug },
    }));

    return { paths, fallback: "blocking" };
}

function parseHtmlToFaqs(htmlString) {
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;

    const questionRegex = /^[A-Z].+\?$/;
    const faqs = [];

    // Check if there are <p> tags — preferred parsing
    const paragraphs = document.querySelectorAll('p');
    if (paragraphs.length > 0) {
        // Parse by <p> blocks
        for (const p of paragraphs) {
            const innerHtml = p.innerHTML.trim();
            const [firstLine, ...rest] = innerHtml.split(/<br\s*\/?>/i);
            const question = firstLine?.trim();
            const answer = rest.join('<br />').trim();

            if (question && questionRegex.test(question) && answer) {
                faqs.push({ question, answer });
            }
        }
    } else {
        // Fallback: parse whole text by splitting on double <br><br>
        const rawHtml = document.body.innerHTML;

        // Split by 2 or more <br> tags
        const blocks = rawHtml
            .split(/(<br\s*\/?>\s*){2,}/i)
            .map(block => block.trim())
            .filter(Boolean);

        for (const block of blocks) {
            // Replace <br> with newline for splitting lines
            const cleanBlock = block.replace(/<br\s*\/?>/gi, '\n');
            const lines = cleanBlock.split('\n').map(l => l.trim()).filter(Boolean);

            if (lines.length > 0 && questionRegex.test(lines[0])) {
                const question = lines[0];
                const answer = lines.slice(1).join('<br />');
                faqs.push({ question, answer });
            }
        }
    }

    return faqs;
}


export async function getStaticProps({ params }) {
  const slug = params.slug;

  try {
    const res = await fetch(`https://admin.scoopcost.com/gift-cards/${slug}/`,{
  headers: {
    'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
  },
});

    if (!res.ok) {
      console.error(`Failed to fetch gift card for slug: ${slug}. Status: ${res.status}`);
      return { notFound: true };
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Expected JSON, but got: ${contentType}`);
      return { notFound: true };
    }

    const gift_card = await res.json();

    if (gift_card.detail) {
      return { notFound: true };
    }

    const currentYear = moment().format('YYYY');
    const title = gift_card.store_name;

    gift_card.seo_title = gift_card.seo_title
      .replace(/Storename/g, title)
      .replace(/%%Year%%/g, currentYear)

    gift_card.seo_description = gift_card.seo_description.replace(/Storename/g, title);

    gift_card.store_h1 = gift_card.h1
      .replace(/Storename/g, title)
      .replace(/%%Year%%/g, currentYear);

    const faqs = parseHtmlToFaqs(gift_card.faqs);
    delete gift_card.faqs;

    // Second fetch - handle errors
    const res2 = await fetch(`https://admin.scoopcost.com/giftcard-page/alphabetical-filter/?paginate=false&id=${gift_card.id}`,{
  headers: {
    'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
  },
});
    let toprated = [];

    if (res2.ok && res2.headers.get('content-type')?.includes('application/json')) {
      toprated = await res2.json();
    } else {
      console.warn(`Toprated fetch failed or returned non-JSON for slug: ${slug}`);
    }

    return {
      props: {
        gift_card,
        faqs,
        toprated
      },
      revalidate: 60
    };
  } catch (error) {
    console.error(`Error in getStaticProps for slug: ${slug}`, error);
    return { notFound: true };
  }
}

