'use client';
import Link from "next/link";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import ResponsiveRender from '@/components/ResponsiveRender';
import ReactSearchBox from 'react-search-box';
import { useRouter } from 'next/router';

export default function Header() {

  const router = useRouter();
  const [filterdata, setFilterdata] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const fetchData = () => {
    Promise.all([
      axios.get("https://admin.rewarditt.com/store-search")
    ])
      .then(([storeRes]) => {


        const stores = (storeRes.data || []).map(store => ({
          key: store.slug,
          value: store.title,
        }));

        setFilterdata([...stores]);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');

    const closeNavbar = (event) => {
      if (collapse?.classList.contains('show')) {
        if (
          event.target !== toggler &&
          !collapse.contains(event.target)
        ) {
          toggler?.click();
        }
      }

      if (
        showSearch &&
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    };

    const handleScroll = () => {
      if (showSearch) setShowSearch(false);
    };

    const observer = new MutationObserver(() => {
      if (collapse?.classList.contains('show')) {
        setShowSearch(false);
      }
    });

    if (collapse) {
      observer.observe(collapse, { attributes: true, attributeFilter: ['class'] });
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', closeNavbar);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', closeNavbar);
      observer.disconnect();
    };
  }, [showSearch]);

  const handleSearchToggle = () => {
    const collapse = document.querySelector('.navbar-collapse');
    if (collapse?.classList.contains('show')) {
      document.querySelector('.navbar-toggler')?.click();
    }
    setShowSearch(prev => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <div className="mobileFlex">
          <button
            className="navbar-toggler"
            type="button"
            aria-label="Click here to toggle navigation"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand brandLogo" href="/">
            rewarditt
          </a>
          <ResponsiveRender
            mobile={
              <>
                <div className="searchBox">
                  {showSearch && (
                    <div className="d-flex searchForm" ref={searchRef}>
                      <ReactSearchBox
                        placeholder="Search Store"
                        value=""
                        className="d-flex navbarSearch"
                        data={filterdata}
                        onFocus={() => fetchData()}
                        clearOnSelect={true}
                        onSelect={(record) => {
                          const { key } = record.item;

                          window.location.href = `/${key}`;

                        }}
                        leftIcon={<svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="#2f3c97"
                          className="bi bi-search"
                          viewBox="0 0 20 20"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>}
                      />
                      <button className="btn btn-outline-success" type="button">Search</button>
                    </div>
                  )}
                  <div className="showSearchBox" ref={toggleBtnRef}>
                    <button onClick={handleSearchToggle}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28.224" height="28.752" viewBox="0 0 28.224 28.752">
                        <g transform="translate(-3.389 -3.123)">
                          <path d="M14.348,25.042a10.96,10.96,0,1,1,10.961-10.96A10.971,10.971,0,0,1,14.348,25.042ZM14.348,5a9.08,9.08,0,1,0,9.08,9.079A9.089,9.089,0,0,0,14.348,5Z" fill="#132D35"></path>
                          <rect width="1.88" height="13.643" transform="translate(20.633 22.232) rotate(-45.022)" fill="#132D35"></rect>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="loginBtn">
                    <a href="/login" aria-label="login / sign up" title="login / signup">
                      <svg className="svg-inline--fa fa-user g-icon g-icon-md" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M320 128a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM32 480l384 0c-1.2-79.7-66.2-144-146.3-144l-91.4 0c-80 0-145 64.3-146.3 144zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </>
            }
            desktop={
              <>

              </>
            }
          />
        </div>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav navLinks">
            <li className="nav-item">
              <Link className="nav-link" href="/stores">
                Stores
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" prefetch={false} href="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" prefetch={false} href="/category">
                Category
              </Link>
            </li>
          </ul>
        </div>
        <ResponsiveRender
          mobile={
            <>

            </>
          }
          desktop={
            <>
              <div className="searchBox">
                {showSearch && (
                  <div className="d-flex searchForm" ref={searchRef}>

                    <ReactSearchBox
                      placeholder="Search Store"
                      value=""
                      className="d-flex navbarSearch"
                      data={filterdata}
                      onFocus={() => fetchData()}
                      clearOnSelect={true}
                      onSelect={(record) => {
                        const { key } = record.item


                        window.location.href = `/${key}`

                      }}
                      leftIcon={<svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="#2f3c97"
                        className="bi bi-search"
                        viewBox="0 0 20 20"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>}
                    />
                    <button class="btn btn-outline-success" type="button">Search</button>

                  </div>
                )}
                <div className="showSearchBox">
                  <button onClick={() => setShowSearch(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28.224" height="28.752" viewBox="0 0 28.224 28.752">
                      <g transform="translate(-3.389 -3.123)">
                        <path d="M14.348,25.042a10.96,10.96,0,1,1,10.961-10.96A10.971,10.971,0,0,1,14.348,25.042ZM14.348,5a9.08,9.08,0,1,0,9.08,9.079A9.089,9.089,0,0,0,14.348,5Z" fill="#132D35"></path>
                        <rect width="1.88" height="13.643" transform="translate(20.633 22.232) rotate(-45.022)" fill="#132D35"></rect>
                      </g>
                    </svg>
                  </button>
                </div>
                <div className="loginBtn">
                  <a href="/login" aria-label="login / sign up" title="login / signup">
                    <svg class="svg-inline--fa fa-user g-icon g-icon-md" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path d="M320 128a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM32 480l384 0c-1.2-79.7-66.2-144-146.3-144l-91.4 0c-80 0-145 64.3-146.3 144zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </>
          }
        />
      </div>
    </nav>
  );
}
