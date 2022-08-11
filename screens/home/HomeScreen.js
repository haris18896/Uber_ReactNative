import { View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import NavOptions from '../../components/nav-options/NavOptions'
import { GOOGLE_MAPS_KEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

const HomeScreen = () => {
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

        <NavOptions />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
