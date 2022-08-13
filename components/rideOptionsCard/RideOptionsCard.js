import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../../redux/slices/navSlice'
import Intl from 'intl'
import 'intl/locale-data/jsonp/en-US'

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const travelInformation = useSelector(selectTravelTimeInformation)

  const data = [
    {
      id: 'Uber-X-123',
      title: 'Uber X',
      multiplier: 1,
      image: 'https://links.papareact.com/3pn'
    },
    {
      id: 'Uber-XL-456',
      title: 'Uber XL',
      multiplier: 1.2,
      image: 'https://links.papareact.com/5w8'
    },
    {
      id: 'Uber-LUX-789',
      title: 'Uber LUX',
      multiplier: 1.75,
      image: 'https://links.papareact.com/7pf'
    }
  ]

  // If we have SURGE pricing, this goes up
  const SURGE_CHARGE_RATE = 1.5

  return (
    <SafeAreaView vertical style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 z-50 rounded-full `}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5  text-xl`}>Select A Ride - {travelInformation?.distance?.text || '(NO API)'}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && 'bg-gray-200'}`}
          >
            <Image
              style={{
                width: 70,
                height: 70,
                resizeMode: 'contain'
              }}
              source={{
                uri: image
              }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold `}>{title}</Text>
              <Text>{travelInformation?.duration?.text || '(NO API)'} Travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PKR'
              }).format((travelInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100)}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity disabled={!selected?.item} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-400'}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard
