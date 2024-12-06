import Image from 'next/image'
import location from '/public/images/location.png'
interface Iprops {
  latitude: number
  longitude: number
}
const LocationDisplay = ({ latitude, longitude }: Iprops) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15`

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mb-4 block">
        <Image
          src={location}
          alt="Location on Map"
          width={450}
          height={200}
          className="rounded-md border-2 border-gray-300 shadow-lg transition hover:shadow-2xl"
        />
      </a>
    </div>
  )
}

export default LocationDisplay
