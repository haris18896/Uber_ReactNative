import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../../redux/slices/navSlice'

const NavOptions = () => {
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)

  const data = [
    {
      id: 'getARide',
      title: 'Get a Ride',
      image: 'https://links.papareact.com/3pn',
      screen: 'MapScreen'
    },
    {
      id: 'orderFood',
      title: 'Order Food',
      image: 'https://links.papareact.com/28w',
      screen: 'EatScreen' // not building this one
    }
  ]

  return (
    <FlatList
      style={tw`mt-15`}
      data={data}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`pl-5 pb-8 pt-4  bg-gray-200 m-2 w-39`}
          // disabled={!origin}
        >
          <View
          // style={tw`${!origin && 'opacity-20'}`}
          >
            <Image
              source={{
                uri: item.image
              }}
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`} type='antdesign' color='white' name='arrowright' />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions
