import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_KEY } from '@env'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setDestination } from '../../redux/slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavorites from '../navFavorites/NavFavorites'
import { Icon } from '@rneui/themed'

const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View>
        <TouchableOpacity style={tw`absolute top-3 left-5 p-3 z-50 rounded-full `} onPress={() => navigation.navigate('Home')}>
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Good Morning, Haris</Text>
      </View>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            debounce={400}
            nearbyPlacesAPI='GooglePlacesSearch'
            styles={toInputBoxStyle}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: 'en'
            }}
            returnKeyType={'search'}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry?.location,
                  description: data?.description
                })
              )
              navigation.navigate('RideOptionsCard')
            }}
          />
        </View>
        <NavFavorites />
      </View>

      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
          disabled={!origin && !destination}
          onPress={() => navigation.navigate('RideOptionsCard')}
          style={tw`flex justify-between flex-row bg-black w-24 px-4 py-3 rounded-full ${
            !origin && !destination && 'opacity-30'
          }`}
        >
          <Icon type='font-awesome' color='white' size={16} name='car' />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!origin && !destination}
          style={tw`flex justify-between flex-row w-24 px-4 py-3 rounded-full ${!origin && !destination && 'opacity-30'}`}
        >
          <Icon type='ionicon' color='black' size={16} name='fast-food-outline' />
          <Text style={tw`text-center `}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyle = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0
  },
  textInput: {
    backgroundColor: '#dddddf',
    borderRadius: 0,
    fontSize: 18
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }
})
