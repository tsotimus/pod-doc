import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    const currentUrl = process.env.NEXT_PUBLIC_URL

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/',
        },
        sitemap: `${currentUrl}/sitemap.xml`,
    }
}