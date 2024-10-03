
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'],
    },
    sitemap:`https://sexnew.xyz/sitemap.xml`,
    host:'https://sexnew.xyz/'
  }
}