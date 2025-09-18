"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface TagMenuProps {
  tags: string[]
}

export function TagMenu({ tags }: TagMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-full transition-colors text-primary-500 hover:bg-primary-200 hover:text-primary-700"
      >
        Tags
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)} // Close on link click
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}