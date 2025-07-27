const excludedSlugs = require('./excluded-slugs.json')

module.exports = {
  siteUrl: 'https://rewarditt.com',
  generateRobotsTxt: false,
  exclude: excludedSlugs.map(slug => `/${slug}`),
    generateIndexSitemap: false, // ❌ disables sitemap-index.xml
  additionalSitemaps: ['https://rewarditt.com/store-sitemap.xml'],
  transform: async (config, path) => {
    if (excludedSlugs.some(slug => path === `/${slug}` || path.startsWith(`/${slug}/`))) {
      return null
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }
  },
}
