import React from 'react'

const MAIN_DOMAIN = 'https://rewarditt.com'

export default function MainDomainLink({ href, children, ...props }) {
  const isInternal = href?.startsWith('/')

  return (
    <a
      href={isInternal ? `${MAIN_DOMAIN}${href}` : href}
      {...props}
    >
      {children}
    </a>
  )
}
