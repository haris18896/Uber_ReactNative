import { Provider } from 'react-redux'
import { store } from './redux/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HomeScreen from './screens/home/HomeScreen'
import MapScreen from './screens/map-screen/MapScreen'
import EatScreen from './screens/eat-screen/EatScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false
              }}
            />
            <Stack.Screen
              name='MapScreen'
              component={MapScreen}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false
              }}
            />
            <Stack.Screen
              name='EatScreen'
              component={EatScreen}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  )
}
