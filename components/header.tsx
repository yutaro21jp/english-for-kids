"use client"

import { useState } from "react"
import Link from "next/link"
import { CategoryMenu } from "@/components/category-menu"

interface HeaderProps {
  categories: string[]
}

export function Header({ categories }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header>
      <div className="flex items-center justify-between">
        {/* Site Title/Logo on the left */}
        <Link href="/" className="text-2xl font-bold text-primary-600">
          English For Kids
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center text-sm font-medium space-x-2">
          <Link href="/" className="px-3 py-2 rounded-full transition-colors text-primary-500 hover:bg-primary-200 hover:text-primary-700">Home</Link>
          <CategoryMenu categories={categories} />
          <Link href="/about" className="px-3 py-2 rounded-full transition-colors text-primary-500 hover:bg-primary-200 hover:text-primary-700">About</Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-primary-500 hover:text-primary-700" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="text-primary-500 hover:text-primary-700" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <hr/>
            <h3 className="font-semibold">Categories</h3>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
