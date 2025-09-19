import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"
import Image from "next/image" // Import Image component
import { compareDesc } from "date-fns"

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-rose-500 mb-8">
        Let&apos;s Learn English Together!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <Link href={post.slug}>
              {post.youtubeId ? (
                <div className="relative w-full h-48">
                  <Image
                    src={`https://img.youtube.com/vi/${post.youtubeId}/mqdefault.jpg`}
                    alt={`Thumbnail for ${post.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-secondary-200 flex items-center justify-center text-secondary-600 text-lg font-semibold">
                  No Video Thumbnail
                </div>
              )}
            </Link>
            <div className="p-4 flex flex-col flex-grow">
              <Link href={post.slug}>
                <h2 className="text-xl font-semibold text-primary-600 mb-2 hover:text-primary-800">
                  {post.title}
                </h2>
              </Link>
              {post.description && (
                <p className="text-secondary-700 text-sm flex-grow">
                  {post.description}
                </p>
              )}
              {post.category && (
                (<Link href={`/categories/${post.category.toLowerCase()}`} className="mt-auto">
                  <p className="text-xs mt-2 text-gray-500 hover:text-primary-600">
                    Category: {post.category}
                  </p>
                </Link>)
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
