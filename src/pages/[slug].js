import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/reward-store.css";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import _ from 'lodash'
import moment from 'moment';

const RatingBox = dynamic(() => import('@/components/ratingbox'),
  {
    ssr: false,
  });
export default function Store({ store, relStores, faqs }) {
  return (
    <>
      <NextSeo
        title="Rewards - Best Gift Card For 2025"
        description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
      />
      <MetaTags />
      <section className='rewardStr rewardPage'>
        <div className="container">
          <div className="row">
            <div className="col-md-6 bgImg">
                <div className='txtBox'>
                    <small className='hashTag'>#getReward</small>
                    <h1> Join {store.title} Reward Program</h1>
                    <a href="/register" className='joinNow'>Join Today!</a>
                    <p>Already have an account? <a href="/login">Login Now</a></p>
                </div>
                <div className='implinks'>
                     <div className="infoItem"><button data-bs-toggle='modal' data-bs-target='#redeemModal'>Read how to redeem ?</button></div>
                      <div className="infoItem"><button data-bs-toggle='modal' data-bs-target='#impPoints'>Important Points</button></div>
                </div>
            </div>
            <div className="col-md-6 noPadding">
              <div className='pageHead'>
                <div className='rewdheading'>Get 100 Reward points on {store.title}  and coupons</div>
                <div className="barndInfo">
                  <div className="left">
                    <div className="ttl">{store.title}</div>
                    <RatingBox key={'store_' + store.id} store={store} />
                    <div className="infoBox"></div>
                    <div className="infoBox">
                      <div className="infoHead">Categories</div>
                      <div className="infoItem">
                        {store?.category?.[0]?.title || ''}
                      </div>
                    </div>

                    <div className="infoBox">
                      <div className="infoHead">Location</div>
                      <div className="infoItem">
                        {(store?.contact?.split?.('|')?.[0]) || ''}
                      </div>
                    </div>
                    
                    <div className="infoBox">
                      <div className="infoItem" data-bs-toggle='modal' data-bs-target='#termsCondition'><button>Terms &amp; Conditions for {store.title}</button></div>
                    </div>
                  </div>

                  <div className="right">
                    <div className="brandLogo">
                      <Image
                        alt="logo"
                        src={store?.image || '/default-logo.png'}
                        width={150}
                        height={50}
                        style={{ color: 'transparent' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about */}
      <section className="about-store-section">
        <div className="about-container">
          <div className="about-text">
            <h2>About {store.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: store.store_description }}
            ></div>
          </div>
        </div>
      </section>
       <section className="rewards-section">
          <div className="container" style={{borderBottom: "1px solid #ccc"}}>
                <h2>Ways to Earn Points</h2>
              <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1">
                  <div className="col">
                      <div className="reward-box">
                          <div className="reward-icon">👤</div>
                          <div className="reward-title">50 Points</div>
                          <div className="reward-desc">Create An Account</div>
                      </div>
                  </div>
                  <div className="col">
                      <div className="reward-box">
                          <div className="reward-icon">🛒</div>
                          <div className="reward-title">1 Point</div>
                          <div className="reward-desc">For Every $ Spent</div>
                      </div>
                  </div>
                  <div className="col">
                      <div className="reward-box">
                          <div className="reward-icon">💬</div>
                          <div className="reward-title">30+ Points</div>
                          <div className="reward-desc">Leave a Review</div>
                      </div>
                  </div>

          
                  <div className="col">
                      <div className="reward-box">
                          <div className="reward-icon">🎂</div>
                          <div className="reward-title">100 Points</div>
                          <div className="reward-desc">Happy Birthday</div>
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
      {/* faqs */}
      <section className='faqssec'>
        <div className="container">
            <h2 className="mb-4 text-center secHeading">Frequently Asked Questions About {store.title}  Gift Cards</h2>

            <div className="accordion" id="giftCardFaq">
                {faqs.map((item, index) => {
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
                                    <div
                                        className="faq-question"
                                        dangerouslySetInnerHTML={{ __html: item.question }}
                                      ></div>
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
                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                />
                                
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
      </section>
       <section className='rewardPage mb-5'>
          <div className="container">
              <div className="row">
                  
                  <div className="col-md-7">
                      <div className='imgBox'>
                          <Image
                              src="/images/placeholder.webp"
                              alt="reward"
                              width={650}
                              height={300}
                              loading="lazy"
                          />
                      </div>
                  </div>
                  <div className="col-md-5">
                      <div className='txtBox'>
                          <div className='headingone'>Redeem for Discounts</div>
                         <p className='mb-3'>Every 100 points = $10 Discount. Redeem your points at checkout. Points expire 12 months after the date earned and cannot be combined with any other promotions or coupons. </p>
                         <a href="/login" className='joinNow'>Join Today!</a>
                      </div>
                  </div>
              </div>
          </div>
      </section>
       <section className='topBrands brand-grid'>
          <div className="container">
              <h2 className="secHeading"> Get Reward on Top Rated Brands</h2>
              <div className="row row-cols-lg-5 row-col-md-3 row-cols-2">
                  <div className='col mb-5'>
                      
                      <a href="" className='brand-card'>
                          <Image
                              className='brand-logo'
                              src="/images/800-kicks.webp"
                              alt="brand-logo"
                              width={50}
                              height={50}
                              loading="lazy"
                          />
                          <div className="brand-name">8000Kicks</div>
                          <div className="discount-badge">Footwear</div>
                      </a>
                  </div>
                    <div className='col mb-5'>
                      
                      <a href="" className='brand-card'>
                          <Image
                              className='brand-logo'
                              src="/images/800-kicks.webp"
                              alt="brand-logo"
                              width={50}
                              height={50}
                              loading="lazy"
                          />
                          <div className="brand-name">8000Kicks</div>
                          <div className="discount-badge">Footwear</div>
                      </a>
                  </div>
                    <div className='col mb-5'>
                      
                      <a href="" className='brand-card'>
                          <Image
                              className='brand-logo'
                              src="/images/800-kicks.webp"
                              alt="brand-logo"
                              width={50}
                              height={50}
                              loading="lazy"
                          />
                          <div className="brand-name">8000Kicks</div>
                          <div className="discount-badge">Footwear</div>
                      </a>
                  </div>
                    <div className='col mb-5'>
                      
                      <a href="" className='brand-card'>
                          <Image
                              className='brand-logo'
                              src="/images/800-kicks.webp"
                              alt="brand-logo"
                              width={50}
                              height={50}
                              loading="lazy"
                          />
                          <div className="brand-name">8000Kicks</div>
                          <div className="discount-badge">Footwear</div>
                      </a>
                  </div>
                    <div className='col mb-5'>
                      
                      <a href="" className='brand-card'>
                          <Image
                              className='brand-logo'
                              src="/images/800-kicks.webp"
                              alt="brand-logo"
                              width={50}
                              height={50}
                              loading="lazy"
                          />
                          <div className="brand-name">8000Kicks</div>
                          <div className="discount-badge">Footwear</div>
                      </a>
                  </div>
              </div>
          </div>
       </section>

      {/* modal */}
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
                  dangerouslySetInnerHTML={{ __html: store.how_to_redeem }}
                ></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div
        className="modal fade giftModal"
        id="impPoints"
        tabIndex="-1"
        aria-labelledby="redeemModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Important Points</h5>
              <button
                type="button"
                className="closeBtn ms-auto"
                data-bs-dismiss="modal"
                aria-label="Close"
              >x</button>
            </div>
            <div className="modal-body">
                <div className="listItem">
                  <div className="custom-list">
                    <ul className="custom-list">
                      <li>Visit the store’s official website www.theiuga.com.</li>
                      <li>Choose the items you wish to buy from the store’s website.</li>
                      <li>Go to the checkout page and start the payment process.</li>
                      <li>Enter the code provided on your e-gift card or voucher.</li>
                      <li>The amount on the gift card will be reduced from your total price.</li>
                      <li>Confirm the payment and complete your purchase.</li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
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
              <div
                className="custom-list"
                dangerouslySetInnerHTML={{ __html: store.term_condition }}
              ></div>
            </div>
          </div>
        </div>
      </div>



    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://admin.rewarditt.com/stores/', {
    headers: {
      'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
    },
  });
  const stores = await res.json();

  const paths = stores.map(store => ({
    params: { slug: store.slug },
  }));

  return { paths, fallback: "blocking" };
}



export async function getStaticProps({ params }) {
  const slug = params.slug || req.headers.get('host')?.split('.')[0];

  const res = await fetch('https://admin.rewarditt.com/stores/' + slug + '/', {
    headers: {
      'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
    },
  })
  var store = await res.json()
  if (store.detail) {
    return {
      notFound: true
    };
  }



  var simCat = [];
  if (store.category[0]) {
    const resRelStores = await fetch(`https://admin.rewarditt.com/stores/?category__id=${store.category[0].id}&ordering=-id`, {
      headers: {
        'x-api-key': process.env.SECRET_KEY, // must be defined in .env.local
      },
    })
    var relStores = await resRelStores.json()
    relStores = relStores.filter((s) => s.id !== store.id);
    relStores = _.shuffle(relStores).slice(0, 12)

  } else {
    var relStores = [];
  }
  const baseDomain = "rewarditt.com";
  const store_names = relStores
    .filter(f => f.id !== store.id)
    .slice(0, 2)
    .map(item => `<a href="${`/${item.slug}`}">${item.title}</a>`)
    .join(', ');

  const title = store.title || store.Title;


  store.store_description = store.store_description.replaceAll("%%storename%%", store.title);

  store.store_description = store.store_description.replaceAll("%%currentmonth%%", moment().format('MMMM'));
  store.store_description = store.store_description.replaceAll("%%curre­ntmonth%%", moment().format('MMMM'));
  store.store_description = store.store_description.replaceAll("%%currentyear%%", moment().format('YYYY'));
  store.store_description = store.store_description.replaceAll("currentyear%%", moment().format('YYYY'));
  store.store_description = store.store_description.replaceAll(/%%categorystore%% and %%categorystore%%|%categorystore%, %categorystore%, and %categorystore%|%categorystore%, %categorystore%|%categorystore% and %categorystore%|%%categorystore%%, %%categorystore%%|%categorystore%, %categorystore%, %categorystore%|%categorystore% %categorystore%, %categorystore%|%categorystore% %categorystore% %categorystore%|%categorystore% %categorystore% and %categorystore%/gi, store_names);


  store.seo_title = store.seo_title
    .replace(/Storename/g, title);

  store.seo_description = store.seo_description
    .replace(/Storename/g, title)

  store.store_h1 = store.store_h1
    .replace(/Storename/g, title)

  const faqs = await parseHtmlToFaqs(store.extra_info);
  delete store.extra_info

  return {
    props: {
      store,
      relStores,
      faqs
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}

async function parseHtmlToFaqs(htmlString) {
  const { JSDOM } = await import('jsdom');
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const faqs = [];

  const questions = document.querySelectorAll('h4.faq_question');
  const answers = document.querySelectorAll('p.faq_answer');

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i]?.textContent?.trim();
    const answer = answers[i]?.innerHTML?.trim(); // use innerHTML to preserve formatting

    if (question && answer) {
      faqs.push({ question, answer });
    }
  }

  return faqs;
}