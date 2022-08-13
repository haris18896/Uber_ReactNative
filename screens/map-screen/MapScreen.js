import { View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import MapComponent from '../../components/map/MapComponent'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../../components/navigateCard/NavigateCard'
import RideOptionsCard from '../../components/rideOptionsCard/RideOptionsCard'
import { TouchableOpacity } from 'react-native'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

const MapScreen = () => {
  const Stack = createNativeStackNavigator()
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={tw`absolute p-3 top-16 left-8 bg-gray-100 z-50 rounded-full bg-white shadow-xl`}
      >
        <Icon name='chevron-left' color='black' />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <MapComponent />
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCard'
            component={NavigateCard}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen
