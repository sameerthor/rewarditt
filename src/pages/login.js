import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import Image from 'next/image';
import Link from 'next/link';
import "@/styles/login.css";
import { useState } from "react";
import { useRouter } from 'next/router';
import axios from 'axios';
import { parse } from 'cookie';

export default function loginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/login', {
        email,
        password
      });

      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

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
            <img className='illustration' src='/images/login-user.webp' alt="Login" />
          </div>
          <div className="login-box">
            <h2 className="login-title text-center">USER LOGIN</h2>

            {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}

            <form onSubmit={handleLogin}>
              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/></svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="options">
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#">Forgot Password?</a>
              </div>

              <div className='text-center'>
                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? 'Logging in...' : 'LOGIN'}
                </button>
              </div>

              <div className='txt'>
                <a href="/register" className='mt-4'>Don't have an account? Register here</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}


export async function getServerSideProps(context) {
  const { parse } = await import('cookie'); // ✅ Import only on the server
  const cookies = parse(context.req.headers.cookie || '');
  const token = cookies.auth_token;

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

