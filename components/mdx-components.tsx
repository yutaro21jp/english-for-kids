"use client"

import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import { useState, ReactNode } from "react" // Import ReactNode

export const YouTube = ({ id }: { id: string }) => (
  <div className="aspect-w-16 aspect-h-9">
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full"
    ></iframe>
  </div>
);

// New MDX components for each language
interface LanguageTranscriptProps {
  children: ReactNode;
}

export function EnglishTranscript({ children }: LanguageTranscriptProps) {
  return <>{children}</>;
}

export function ThaiTranslation({ children }: LanguageTranscriptProps) {
  return <>{children}</>;
}

export function JapaneseTranslation({ children }: LanguageTranscriptProps) {
  return <>{children}</>;
}


interface TranscriptTabsProps {
  children: ReactNode; // Now accepts children
}

export function TranscriptTabs({ children }: TranscriptTabsProps) {
  // Extract transcripts from children
  const englishTranscript = (
    Array.isArray(children) ? children : [children]
  ).find((child: any) => child.type === EnglishTranscript);
  const thaiTranslation = (
    Array.isArray(children) ? children : [children]
  ).find((child: any) => child.type === ThaiTranslation);
  const japaneseTranslation = (
    Array.isArray(children) ? children : [children]
  ).find((child: any) => child.type === JapaneseTranslation);


  const [activeTab, setActiveTab] = useState<"english" | "thai" | "japanese">(
    englishTranscript ? "english" : thaiTranslation ? "thai" : "japanese"
  )

  return (
    <div className="w-full flex flex-col lg:flex-row bg-primary-100 rounded-lg p-4 border border-primary-400 mt-8 shadow-lg">
      <div className="flex flex-row lg:flex-col border-b lg:border-b-0 lg:border-r border-primary-300 pb-4 lg:pb-0 pr-0 lg:pr-4 mb-4 lg:mb-0">
        {englishTranscript && (
          <button
            className={`py-3 px-6 text-lg font-bold rounded-lg text-center transition-colors duration-200 ${
              activeTab === "english"
                ? "bg-primary-300 text-primary-900"
                : "text-secondary-600 hover:bg-primary-100"
            }`}
            onClick={() => setActiveTab("english")}
          >
            🇬🇧 English
          </button>
        )}
        {thaiTranslation && (
          <button
            className={`py-3 px-6 text-lg font-bold rounded-lg text-center transition-colors duration-200 ${
              activeTab === "thai"
                ? "bg-primary-300 text-primary-900"
                : "text-secondary-600 hover:bg-primary-100"
            }`}
            onClick={() => setActiveTab("thai")}
          >
            🇹🇭 Thai
          </button>
        )}
        {japaneseTranslation && (
          <button
            className={`py-3 px-6 text-lg font-bold rounded-lg text-center transition-colors duration-200 ${
              activeTab === "japanese"
                ? "bg-primary-300 text-primary-900"
                : "text-secondary-600 hover:bg-primary-100"
            }`}
            onClick={() => setActiveTab("japanese")}
          >
            🇯🇵 Japanese
          </button>
        )}
      </div>

      <div className="mt-4 lg:mt-0 lg:pl-4 w-full prose prose-xl dark:prose-invert"> {/* Apply prose here */}
        {activeTab === "english" && englishTranscript && (
          <>
            <h2 className="text-primary-600">English Transcript</h2>
            {englishTranscript}
          </>
        )}
        {activeTab === "thai" && thaiTranslation && (
          <>
            <h2 className="text-primary-600">Thai Translation</h2>
            {thaiTranslation}
          </>
        )}
        {activeTab === "japanese" && japaneseTranslation && (
          <>
            <h2 className="text-primary-600">Japanese Translation</h2>
            {japaneseTranslation}
          </>
        )}
      </div>
    </div>
  )
}

const components = {
  Image,
  YouTube,
  TranscriptTabs,
  EnglishTranscript, // Added
  ThaiTranslation,   // Added
  JapaneseTranslation, // Added
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
