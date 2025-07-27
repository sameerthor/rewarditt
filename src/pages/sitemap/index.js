const baseDomain = 'rewarditt.com'

const toUrl = (data) =>
  `<url><loc>${data.url}</loc></url>`

const createSitemap = (urlList) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml" 
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urlList.map(toUrl).join('\n')}
</urlset>`

export async function getServerSideProps({ res }) {
  const urlList = []

  const result = await fetch(
    'https://admin.rewarditt.com/store-search'
  )
  const json = await result.json()
  const stores =  json

  stores.forEach((store) => {
    if (!store.slug) return

    const url = store.subdomain
      ? `https://${store.slug}.${baseDomain}`
      : `https://${baseDomain}/${store.slug}`

    urlList.push({ url })
  })

  const sitemap = createSitemap(urlList)

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}

// Default export to satisfy Next.js page requirement
export default function SitemapPage() {
  return null
}
