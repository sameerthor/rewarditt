// pages/user-info.js
import { NextSeo } from 'next-seo';
import MetaTags from '@/components/MetaTags';
import "@/styles/user-info.css";
import { useState } from "react";
import { parse } from 'cookie';

export default function UserInfo({ user_info }) {
    const [formData, setFormData] = useState({
        name: user_info?.username || '',
        email: user_info?.email || '',
        paypal_email: user_info?.bank_detail?.paypal_email || '',
        bank_name: user_info?.bank_detail?.bank_name || '',
        account_number: user_info?.bank_detail?.account_number || '',
        account_holder_name: user_info?.bank_detail?.account_holder_name || '',
        ifsc_code: user_info?.bank_detail?.ifsc_code || '',
        swift_code: user_info?.bank_detail?.swift_code || '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/user-details', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.name,
                    email: formData.email,
                    bank_detail: {
                        paypal_email: formData.paypal_email,
                        bank_name: formData.bank_name,
                        account_number: formData.account_number,
                        account_holder_name: formData.account_holder_name,
                        ifsc_code: formData.ifsc_code,
                        swift_code: formData.swift_code,
                    }
                })
            });

            const data = await res.json();

            if (res.status === 200) {
                alert('Details saved successfully');
            } else {
                alert(data.error || 'Failed to save details');
            }
        } catch (err) {
            console.error(err);
            alert('❌ Failed to save details.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NextSeo title="Rewards - Best Gift Card For 2025" description="Find the best Gift Card online..." />
            <MetaTags />
            <section className='userInfo'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card shadow-lg border-0 rounded-4">
                                <div className="card-body p-5">
                                    <h1 className="text-center mb-4">Complete your profile</h1>
                                    <form className='row row-cols-1 row-cols-lg-2' onSubmit={handleSubmit}> {/* Name */}
                                        <div className="form-floating-custom col">
                                            <input type="text" className="form-control" id="name" name="name" placeholder=" " value={formData.name} onChange={handleChange} required />
                                            <label htmlFor="name">Name</label>
                                        </div> {/* Email */}
                                        <div className="form-floating-custom col">
                                            <input type="email" className="form-control" id="email" name="email" placeholder=" " value={formData.email} onChange={handleChange} required />
                                            <label htmlFor="email">Email</label>
                                        </div> {/* PayPal */}
                                        <div className="form-floating-custom col">
                                            <input type="email" className="form-control" id="paypal_email" name="paypal_email" placeholder=" " value={formData.paypal_email} onChange={handleChange} />
                                            <label htmlFor="paypal_email">PayPal Email</label>
                                        </div> {/* Bank fields */}
                                        <div className="form-floating-custom col">
                                            <input type="text" className="form-control" id="bank_name" name="bank_name" placeholder=" " value={formData.bank_name} onChange={handleChange} required />
                                            <label htmlFor="bank_name">Bank Name</label>
                                        </div>
                                        <div className="form-floating-custom col">
                                            <input type="text" className="form-control" id="account_number" name="account_number" placeholder=" " value={formData.account_number} onChange={handleChange} required />
                                            <label htmlFor="account_number">Account Number</label>
                                        </div>
                                        <div className="form-floating-custom col">
                                            <input type="text" className="form-control" id="account_holder_name" name="account_holder_name" placeholder=" " value={formData.account_holder_name} onChange={handleChange} required />
                                            <label htmlFor="account_holder_name">Name on Bank Account</label>
                                        </div>
                                        <div className="form-floating-custom col">
                                            <input type="text" className="form-control text-uppercase" id="ifsc_code" name="ifsc_code" placeholder=" " value={formData.ifsc_code} onChange={handleChange} required />
                                            <label htmlFor="ifsc_code">IFSC Code</label>
                                        </div>
                                        <div className="form-floating-custom col">
                                            <input type="text" className="form-control text-uppercase" id="swift_code" name="swift_code" placeholder=" " value={formData.swift_code} onChange={handleChange} />
                                            <label htmlFor="swift_code">SWIFT Code</label>
                                        </div>
                                        <div className="d-grid text-center col-lg-12">
                                            <button type="submit" className="btn btn-primary btn-lg rounded-3" disabled={loading}> {loading ? 'Saving...' : 'Save'} </button>
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

// Fetch user data server-side
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

    try {
        const res = await fetch(`https://admin.rewarditt.com/api/user-details/`, {
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
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const user_info = await res.json();

        return {
            props: { user_info },
        };
    } catch (err) {
        console.error(err);
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}
