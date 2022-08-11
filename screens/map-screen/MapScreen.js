import { View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import MapComponent from '../../components/map/MapComponent'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../../components/navigateCard/NavigateCard'
import RideOptionsCard from '../../components/rideOptionsCard/RideOptionsCard'

const MapScreen = () => {
  const Stack = createNativeStackNavigator()

  return (
    <View>
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
