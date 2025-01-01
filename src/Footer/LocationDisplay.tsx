import { Fullscreen } from 'lucide-react'
import Link from 'next/link'

interface Iprops {
  latitude: number
  longitude: number
}

const LocationDisplay = ({ latitude, longitude }: Iprops) => {
  const openStreetMapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-full h-96 rounded-md border-2 border-gray-300 shadow-lg overflow-hidden relative">
        <iframe
          title="Map Location"
          src={openStreetMapEmbedUrl}
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
        <Link
          href={openStreetMapEmbedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black bg-white p-1 rounded border-2 border-gray-400  absolute top-20 left-3"
        >
          <Fullscreen className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

export default LocationDisplay
