
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin','/private/'],
    },
    sitemap:`https://sexnew.xyz/sitemap.xml`,
    host:'https://sexnew.xyz/'
  }
}