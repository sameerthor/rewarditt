import MainDomainLink from '@/components/MainDomainLink';
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

import Link from 'next/link';
export default function SimCat({category_id}) {

    const [categories, setFilterdata] = useState([]);
    useEffect(() => {
        axios.get('https://backend.rewarditt.com/categories/?limit=8&offset='+(parseInt(category_id)+1))
            .then(function (response) {
                setFilterdata(response.data.results);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, []);
    return (
        <>
            <div className="storeWidget">
                <h4 className="widgetHeading">Similar Categories</h4>
                <div className="topStore">
                    <ul>
                        {categories.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <MainDomainLink prefetch={false} href={`/category/${item.slug}`}>{item.title}</MainDomainLink>
                                    </li>
                                );
                        }
                        )}


                    </ul>
                </div>
            </div>
        </>
    );

}
