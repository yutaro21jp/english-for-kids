import Link from "next/link"
import "./globals.css"
import { Mitr } from "next/font/google"
import { Analytics } from "@/components/analytics"
import { allPosts } from "@/.contentlayer/generated"
import { Header } from "@/components/header"
import { CategoryMenu } from "@/components/category-menu"
import { TagMenu } from "@/components/tag-menu"

const mitr = Mitr({
  weight: ["400", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-mitr",
})

export const metadata = {
  metadataBase: new URL("https://english-for-kids-one.vercel.app"),
  title: "English For Kids：ONE",
  description: "This is an English learning website created especially for my dear daughter, who is learning English. I hope you enjoy learning and watching your favorite YouTube videos here!",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const categories = Array.from(new Set(allPosts.map((post) => post.category)))
  const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags || [])))

  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-white text-secondary-900 ${mitr.className}`}
      >
        <div className="max-w-5xl mx-auto py-10 px-4">
          <Header categories={categories} tags={tags} />
          <main>{children}</main>
          <footer className="py-6 text-center text-sm text-secondary-600">
            <nav className="mb-4 flex justify-center items-center text-sm font-medium space-x-2">
              <Link href="/" className="px-3 py-2 rounded-full transition-colors text-primary-500 hover:bg-primary-200 hover:text-primary-700">Home</Link>
              <CategoryMenu categories={categories} />
              <TagMenu tags={tags} />
              <Link href="/about" className="px-3 py-2 rounded-full transition-colors text-primary-500 hover:bg-primary-200 hover:text-primary-700">About</Link>
            </nav>
            <p>&copy; {new Date().getFullYear()} English For Kids：ONE. All rights reserved.</p>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  )
}