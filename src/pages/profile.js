import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/user-info.css";
import { useState, useEffect } from "react";


export default function userInfo({ }) {

    return (
        <>
            <NextSeo
                title="Rewards - Best Gift Card For 2025"
                description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
            />
            <MetaTags />
            <section className='userInfo'>
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg border-0 rounded-4">
                        <div className="card-body p-5">
                            <h1 className="text-center mb-4">Hello MS Dhoni, complete you profile</h1>
                            <form className='row row-cols-1 row-cols-lg-2'>

                            {/* Name */}
                            <div className="form-floating-custom col">
                                <input type="text" className="form-control" id="name" placeholder=" " required />
                                <label htmlFor="name">Name</label>
                            </div>

                            {/* Email */}
                            <div className="form-floating-custom col">
                                <input type="email" className="form-control" id="email" placeholder=" " required />
                                <label htmlFor="email">Email</label>
                            </div>
                             <div className="form-floating-custom col">
                                <input type="text" className="form-control" id="payPal" placeholder=" " required />
                                <label htmlFor="payPal">Paypal ID</label>
                            </div>

                            {/* Bank Name */}
                            <div className="form-floating-custom col">
                                <input type="text" className="form-control" id="bankName" placeholder=" " required />
                                <label htmlFor="bankName">Bank Name</label>
                            </div>

                            {/* Account Number */}
                            <div className="form-floating-custom col">
                                <input type="text" className="form-control" id="accountNumber" placeholder=" " required />
                                <label htmlFor="accountNumber">Account Number</label>
                            </div>

                            {/* Name on Bank Account */}
                            <div className="form-floating-custom col">
                                <input type="text" className="form-control" id="accountName" placeholder=" " required />
                                <label htmlFor="accountName">Name on Bank Account</label>
                            </div>

                            {/* IFSC Code */}
                            <div className="form-floating-custom col">
                                <input type="text" className="form-control text-uppercase" id="ifsc" placeholder=" " required />
                                <label htmlFor="ifsc">IFSC Code</label>
                            </div>

                            {/* SWIFT Code */}
                            <div className="form-floating-custom col">
                                <input type="text" className="form-control text-uppercase" id="swift" placeholder=" " required />
                                <label htmlFor="swift">SWIFT Code</label>
                            </div>

                            {/* Submit */}
                            <div className="d-grid text-center col-lg-12">
                                <button type="submit" className="btn btn-primary btn-lg rounded-3">
                               Save
                                </button>
                            </div>

                            </form>
                        </div>
                        </div>
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
