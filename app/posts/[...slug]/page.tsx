import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Metadata } from "next"
import Link from "next/link"
import { Mdx } from "@/components/mdx-components"

interface PostProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const ogImage = post.image
    ? post.image
    : post.youtubeId
    ? `https://img.youtube.com/vi/${post.youtubeId}/mqdefault.jpg`
    : undefined

  return {
    title: post.title,
    description: post.description,
    ...(ogImage && {
      openGraph: {
        images: [ogImage],
      },
    }),
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="py-6 max-w-5xl mx-auto prose prose-xl dark:prose-invert">
      <h1 className="mb-2 text-rose-500 text-3xl md:text-4xl">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
      <hr className="my-8" />
      {post.category && (
        <div className="text-lg">
          <span>Category: </span>
          <Link href={`/categories/${post.category.toLowerCase()}`}>
            <span className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-primary-200 dark:text-primary-900 hover:bg-primary-200 dark:hover:bg-primary-300 transition-colors">
              {post.category}
            </span>
          </Link>
        </div>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="text-lg mt-4">
          <span>Tags: </span>
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag.toLowerCase()}`}>
              <span className="inline-block bg-rose-100 text-rose-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded-full dark:bg-rose-200 dark:text-rose-900 hover:bg-rose-200 dark:hover:bg-rose-300 transition-colors">
                {tag}
              </span>
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
