import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import tw from 'twrnc'

const NavFavorites = () => {
  const data = [
    {
      id: '123',
      icon: 'home',
      location: 'Home',
      destination: 'LUMS, Lahore, Pakistan'
    },
    {
      id: '234',
      icon: 'briefcase',
      location: 'work',
      destination: 'Gulberg, Lahore, Pakistan'
    }
  ]

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={[tw`bg-gray-300`, { height: 0.5 }]} />}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon style={tw`mr-4 rounded-full p-3 bg-gray-300`} name={icon} type='ionicon' color='white' size={18} />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500 `}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavorites
