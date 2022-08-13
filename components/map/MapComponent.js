import React, { useRef, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../../redux/slices/navSlice'
import { useDispatch, useSelector } from 'react-redux'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_KEY } from '@env'

const MapComponent = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return
    // Zoom and fit to marker
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
  }, [origin, destination])

  useEffect(() => {
    if (!origin || !destination) return
    // Responsible for Calculating the Travel time
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origin=${origin.description}&description=${destination.description}&key=${GOOGLE_MAPS_KEY}`

      fetch(URL)
        .then(res => res.json())
        .then(data => {
          console.log('data : ', data)
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        })
    }
  }, [origin, destination, GOOGLE_MAPS_KEY])

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      region={{
        latitude: parseFloat(origin?.location?.lat || 37.78825),
        longitude: parseFloat(origin?.location?.long || -122.4324),
        latitudeDelta: parseFloat(0.005),
        longitudeDelta: parseFloat(0.005)
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin?.description}
          destination={destination?.description}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={3}
          strokeColor='black'
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: parseFloat(origin?.location?.lat),
            longitude: parseFloat(origin?.location?.long)
          }}
          title='origin'
          description={origin?.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: parseFloat(destination?.location?.lat),
            longitude: parseFloat(destination?.location?.long)
          }}
          title='destination'
          description={destination?.description}
          identifier='destination'
        />
      )}
    </MapView>
  )
}

export default MapComponent
