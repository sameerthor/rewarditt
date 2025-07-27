const fs = require('fs')
const path = require('path')
const https = require('https')

const API_URL = 'https://admin.rewarditt.com/store-search/'
const OUT_PATH = path.join(__dirname, '..', 'excluded-slugs.json')

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          resolve(json)
        } catch (err) {
          reject(err)
        }
      })
    }).on('error', reject)
  })
}

async function run() {
  try {
    const json = await fetchJson(API_URL)
    const stores = json

    const excluded = stores.map(s => s.slug).filter(Boolean)

    fs.writeFileSync(OUT_PATH, JSON.stringify(excluded, null, 2))
    console.log(`✅ excluded-slugs.json updated with ${excluded.length} slugs`)
  } catch (err) {
    console.error('❌ Failed to update excludes:', err)
    process.exit(1)
  }
}

run()
