/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default async function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

  if (!projectId || !dataset) {
    return (
      <main className="grid min-h-screen place-items-center bg-nb-bg p-6 text-nb-text">
        <div className="max-w-2xl border-2 border-nb-border bg-nb-surface p-5 shadow-hard">
          <h1 className="mb-2.5 text-lg font-black">Sanity Studio belum terkonfigurasi</h1>
          <p className="m-0 leading-relaxed text-nb-muted">
            Tambahkan <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> dan <code>NEXT_PUBLIC_SANITY_DATASET</code> di Vercel Project Settings - Environment Variables, lalu redeploy.
          </p>
        </div>
      </main>
    )
  }

  const { default: config } = await import('../../../sanity.config')
  return <NextStudio config={config} />
}
