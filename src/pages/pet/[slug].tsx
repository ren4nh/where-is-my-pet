import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';



export default function Token({ lat, long }) {

    const [latitude, setLatitude] = useState<Number | null>(lat)
    const [longitude, setLongitude] = useState<Number | null>(long)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, [])

    const mapCenter = useMemo(
        () => ({ lat: Number(latitude), lng: Number(longitude) }),
        []
    );

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: false,
            scrollwheel: false,
        }),
        []
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div className="grid grid-cols-6 gap-4 w-full max-w-5xl mx-auto">
            <div className="col-start-1 col-end-7 lg:col-start-1 lg:col-end-3">
                <div className="mx-auto bg-white rounded-lg shadow-md text-grey-950 py-5 px-7 w-full">
                    <img className="w-32 h-32 rounded-full mx-auto" src="https://pinnpet.s3.sa-east-1.amazonaws.com/pets/profile/dab5c8c0-ef2c-4253-b01a-5616e739d61c.png?m=1686064124018" alt="Profile picture" />
                    <h2 className="text-center text-2xl font-semibold mt-3 text-black">Diditos</h2>
                    <p className="text-center text-gray-600 mt-1">Pug</p>
                </div>
            </div>
            <div className="col-start-1 col-end-7 lg:col-start-3 lg:col-end-7">
                <div className="mx-auto mb-10 bg-white rounded-lg shadow-md text-grey-950 py-5 px-7 w-full">
                    <p className="text-center mt-10 text-2xl font-bold">Informações do Pet</p>
                    <div className="mt-6 flex flex-col">
                        <div className="flex flex-row justify-between ">
                            <h3 className="text-xl text-gray-950 font-bold">Idade</h3>
                            <p className="text-gray-600">2 anos</p>
                        </div>
                        <div className="flex flex-row justify-between mt-5">
                            <h3 className="text-xl font-bold">Genero</h3>
                            <p className="text-gray-600">Macho</p>
                        </div>
                        <div className="flex flex-row justify-between mt-5">
                            <h3 className="text-xl font-bold">Peso</h3>
                            <p className="text-gray-600">8kg</p>
                        </div>
                        <div className="flex flex-row justify-between mt-5">
                            <h3 className="text-xl font-bold">Cor</h3>
                            <p className="text-gray-600">Branco</p>
                        </div>
                        <div className="flex flex-row justify-between mt-5">
                            <h3 className="text-xl font-bold">Castrado</h3>
                            <p className="text-gray-600">Não</p>
                        </div>
                    </div>
                    <p className="text-center mt-10 text-2xl font-bold">Tutores</p>
                    <div className="mt-6 flex flex-col">
                        <div className="flex flex-row justify-between ">
                            <h3 className="text-xl text-gray-950 font-bold">Renan Hartwig</h3>
                            <p className="text-gray-600">(53) 98100-3625</p>
                        </div>
                        <div className="flex flex-row justify-between mt-5">
                            <h3 className="text-xl text-gray-950 font-bold">Jane</h3>
                            <p className="text-gray-600">(53) 98100-3625</p>
                        </div>
                    </div>
                    <p className="text-center mt-10 text-2xl font-bold">Ultima localização</p>
                    <div className="mt-5">
                        <GoogleMap
                            options={mapOptions}
                            zoom={14}
                            center={mapCenter}
                            mapTypeId={google.maps.MapTypeId.ROADMAP}
                            mapContainerStyle={{ width: '100%', height: '300px' }}
                            onLoad={() => console.log('Map Component Loaded...')}
                        >
                            <MarkerF position={mapCenter} onLoad={() => console.log('Marker Loaded')} />
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=07601ad9743942d09764b1d11cfaa8e5")
    const data = await res.json()

    // Pass data to the page via props
    return { props: { lat: data.latitude, long: data.longitude } }
}
