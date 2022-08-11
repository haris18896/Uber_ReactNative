import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

const EatScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={tw`mt-20 ml-5`}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`} type='antdesign' color='white' name='arrowleft' />
      </TouchableOpacity>
      <Text style={tw`ml-2 mt-2`}>Under Construction, kindly Go Back</Text>
    </View>
  )
}

export default EatScreen
