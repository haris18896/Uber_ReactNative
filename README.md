# UBER-CLONE : Select ride Component

before adding `Select Ride Component` we have to do some thing to the keyboard so that the when the keyboard opens then the entire component should shift up and for that we are going to use `keyboard avoiding view`  

```js
// App.js
import { KeyboardAvoidingView, Platform } from 'react-native'
```


```js
// App.js

import { Provider } from 'react-redux'
import { store } from './redux/store'
import { KeyboardAvoidingView, Platform } from 'react-native'

// ..........

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          >
            <Stack.Navigator>
            //  ..................
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  )
}

```

```js
// RideOptionsScreen.js
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)

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

  return (
    <SafeAreaView vertical style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 z-50 rounded-full `}
          onPress={() => navigation.navigate('NavigateCard')}
        >
          <Icon name='chevron-left' type='fontawesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5  text-xl`}>Select A Ride</Text>
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
              <Text>Travel time...</Text>
            </View>
            <Text style={tw`text-xl`}>£ 9.99</Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity disabled={!selected?.item} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-400'}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard
```

---

## Adding The Travel Time Calculation using Distance Matrix API

```js
// MapComponents.js

//...............
  useEffect(() => {
    if (!origin || !destination) return
    // Responsible for Calculating the Travel time
    const getTravelTime = async () => {
      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origin=${origin.description}&description=${destination.description}&key=${GOOGLE_MAPS_KEY}`

      fetch(URL)
        .then(res => res.json())
        .then(data => {
          console.log('data : ', data)
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        })
    }
  }, [origin, destination, GOOGLE_MAPS_KEY])

  //............
```
 distance and time calculated using distance matrix api
```js
// RideOptionsCard.js

//...........

const travelInformation = useSelector(selectTravelTimeInformation)

  // If we have SURGE pricing, this goes up
  const SURGE_CHARGE_RATE = 1.5
//..............
        <Text style={tw`text-center py-5  text-xl`}>Select A Ride - {travelInformation?.distance.text || '(NO API)'}</Text>
//.............
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold `}>{title}</Text>
              <Text>{travelInformation?.duration?.text || '(NO API)'} Travel time</Text>
            </View>
```

for the `Price` we are going to to use the `Internationalization JavaScript API` to get the currency symbol and the price.

```js
// RideOptionsCard.js
import Intl from 'intl'
import 'intl/locale-data/jsonp/en-US'
 
 //......
 //......

          <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PKR'
              }).format((travelInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 100)}
            </Text>

```
