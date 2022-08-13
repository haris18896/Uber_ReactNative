import { View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import NavOptions from '../../components/nav-options/NavOptions'

import { GOOGLE_MAPS_KEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import { setOrigin, setDestination } from '../../redux/slices/navSlice.js'
import NavFavorites from '../../components/navFavorites/NavFavorites'

const HomeScreen = () => {
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={tw`android:pt-10 bg-white h-full`}>
      <View style={tw`p-2`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain'
          }}
          source={{
            uri: 'https://links.papareact.com/gzs'
          }}
        />
        <GooglePlacesAutocomplete
          placeholder='Where From?'
          nearbyPlacesAPI='GooglePlaceSearch'
          debounce={400}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en'
          }}
          style={tw`flex-0 text-[18] bg-gray-500`}
          minLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry?.location,
                description: data?.description
              })
            )

            dispatch(setDestination(null))
          }}
          fetchDetails={true}
        />
        <NavOptions />

        <NavFavorites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
