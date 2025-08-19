import 'bootstrap/dist/css/bootstrap.css';
import "@/styles/globals.css";
import "@/styles/fonts.css";
import Head from "next/head";

import { useEffect, useState } from "react";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config, dom } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from 'next/script';

import { parseCookies } from "nookies";

export default function App({ Component, pageProps, loggedIn }) {
  const [hasConsent, setHasConsent] = useState(null); // null for undecided

  useEffect(() => {
    // bootstrap JS
    window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // check GA consent
    const consent = localStorage.getItem('ga_consent');
    if (consent === 'granted') {
      setHasConsent(true);
    } else if (consent === 'denied') {
      setHasConsent(false);
    }
  }, []);

  const handleAccept = () => {
    setHasConsent(true);
    localStorage.setItem('ga_consent', 'granted');
  };

  const handleReject = () => {
    setHasConsent(false);
    localStorage.setItem('ga_consent', 'denied');
  };

  return (
    <main>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon"/>
        <meta name="theme-color" content="#003b94"/>
        <style>{dom.css()}</style>
      </Head>
     
      {/* 👇 Pass loggedIn into Header */}
      <Header loggedIn={loggedIn} />

      {/* Google Analytics - Only load if user consents */}
      {hasConsent && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-P0PSQ4W4GS"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P0PSQ4W4GS');
            `}
          </Script>
        </>
      )}

      {/* Consent Banner */}
      {hasConsent === null && (
        <div className="consent-banner">
          <p>We use cookies to enhance your experience. Do you consent to analytics tracking?</p>
          <div className='BtnBxx'>
            <button onClick={handleAccept} className="btn btn-primary">
              Accept
            </button>
            <button onClick={handleReject} className="btn btn-secondary">
              Reject
            </button>
          </div>
        </div>
      )}

      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

// 👇 Attach getInitialProps to App (runs on every request, SSR)
App.getInitialProps = async ({ ctx, Component }) => {
  const cookies = parseCookies(ctx);
  const loggedIn = Boolean(cookies.auth_token);

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps, loggedIn };
};
