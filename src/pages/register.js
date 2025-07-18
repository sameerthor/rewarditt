import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/login.css";
import { useState, useEffect } from "react";


export default function registerPage({ }) {

    return (
        <>
            <NextSeo
                title="Rewards - Best Gift Card For 2025"
                description="Find the best Gift Card online. We have curated the largest gift card store. 200+ brands across 20+ categories. Avail exclusive offers on top brand gift cards. Instant delivery."
            />
            <MetaTags />
            <section className='loginSec'>
              <div className='container'>
                <div className='illustrationBox'>
                  <img className='illustration' src='/images/login-user.webp' />
                </div>
                <div className="login-box">
                  <h2 className="login-title text-center">REGISTER</h2>
                  <form>
                    <div className="input-group">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                      <input type="text" placeholder="Email" required />
                    </div>
                    <div className="input-group">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                      <input type="password" placeholder="Password" required />
                    </div>
                    <div className="input-group">
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                      <input type="password" placeholder="Confirm Password" required />
                    </div>

                    <div className="options">
                      <label>
                        <input type="checkbox" /> Remember Me
                      </label>
                    </div>

                    <div className='text-center'>
                        <button type="submit" className="login-btn">
                            LOGIN
                        </button>
                    </div>
                    <div className='txt'>
                        <a href="/login" className='mt-4'>Already have an account ?  Login here</a>
                    </div>
                  </form>
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
