import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function GuestbookPage() {
  return (
    <>
      <PageSEO
        title={`Guestbook - ${siteMetadata.author || 'Unknown Author'}`}
        description="Guestbook for my future visitors"
      />
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Hello World
        </h1>
        <p className="text-md leading-7 text-gray-500 dark:text-gray-400">
          Welcome to my guestbook. Say hello!
        </p>
      </div>
    </>
  )
}
