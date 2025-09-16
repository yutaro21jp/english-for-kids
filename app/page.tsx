import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-primary-600 mb-8">
        Let's Learn English Together!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <Link href={post.slug} className="block">
              {/* Placeholder for video thumbnail */}
              <div className="w-full h-48 bg-secondary-200 flex items-center justify-center text-secondary-600 text-lg font-semibold">
                Video Thumbnail
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-primary-700 mb-2">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-secondary-700 text-sm">
                    {post.description}
                  </p>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}