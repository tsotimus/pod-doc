import type { MetadataRoute } from 'next'

 
export default async function sitemap() {
    const currentUrl = process.env.NEXT_PUBLIC_URL


    const mainPages: MetadataRoute.Sitemap = [
        {
            url: `${currentUrl}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
    ]

    return [...mainPages]
}