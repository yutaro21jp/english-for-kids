import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

const YouTube = ({ id }: { id: string }) => (
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

const components = {
  Image,
  YouTube,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}