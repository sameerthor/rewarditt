import { useState } from "react";
import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import "@/styles/login.css";
import { useRouter } from 'next/router';
import { parse } from 'cookie';

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      // Check passwords match
      if (password !== confirmPassword) {
        setStatus("❌ Passwords don't match");
        return;
      }

      // Send code
      const res = await fetch('/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep(2); // move to code verification
        setStatus("✅ Verification code sent to email");
      } else {
        setStatus('❌ ' + data.message);
      }
    } else if (step === 2) {
      // Submit registration with verification code
      const res = await fetch('/api/verify-and-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, code: codeInput }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Registered successfully!");
        setTimeout(() => {
          router.push('/login');
        })
      } else {
        setStatus("❌ " + data.message);
      }
    }
  };

  return (
    <>
      <NextSeo title="Register - Rewarditt" />
      <MetaTags />
      <section className='loginSec'>
        <div className='container'>
          <div className='illustrationBox'>
            <img className='illustration' src='/images/login-user.webp' />
          </div>
          <div className="login-box">
            <h2 className="login-title text-center">REGISTER</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>

              {step === 1 && (
                <>
                  <div className="input-group">
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <div className="input-group">
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="input-group">
                  <input type="text" placeholder="Enter verification code" value={codeInput} onChange={e => setCodeInput(e.target.value)} required />
                </div>
              )}

              <div className="text-center">
                <button type="submit" className="login-btn">
                  {step === 1 ? 'Submit' : 'Complete Registration'}
                </button>
              </div>

              {status && <p className="status-msg">{status}</p>}

              <div className='txt'>
                <a href="/login" className='mt-4'>Already have an account? Login here</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}



export async function getServerSideProps(context) {
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
