# UBER-CLONE : Google AutoComplete Input

So in this app we are going to use 3 API's `Google Places API` for auto complete places, `Google distance API` for measuring distance between point A and point B, and the last one is `Distance matrix API` for measuring the time of travel.

to autocomplete input field we are going to use [Google Places autocomplete package](https://github.com/FaridSafi/react-native-google-places-autocomplete),

```
npm install react-native-google-places-autocomplete --save
```

* Get your [Google Places API](https://developers.google.com/maps/documentation/places/web-service/get-api-key/) keys and enable "Google Places API Web Service" (NOT Android or iOS) in the console. Billing must be enabled on the account.

```js
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'YOUR API KEY',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;
```

---
# Google Places API KEY
Go to the [Google Cloud Platform](https://cloud.google.com/) ===> click on `console` ===> Create a new project..

* After successfully Creating a project. before using the API's we have to enable Billing account,

after that go to the `Dashboard of API's and Services` ==> click on `Enable API's and Services`

1. the first one to enable is `directions api`
2. secondly activate `places api`
3.  Distance metrix api

activate the above `API's`..

Now the Second step is to set our credentials , so go to the `Credentials` to get a key. This will be a secret API key, copy it to some where safe, because this API KEY will access all the above API's. store it in `.env` file e.g

```js
// .env
GOOGLE_MAPS_KEY=SuperSeCretkeYHere
```

to use `env` in react-native we have to install a package `react-native-dotenv`

```
npm install react-native-dotenv
```

and after that we have to add some settings to the `bable.config.js` file to support `env`

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env'
        }
      ]
    ]
  }
}

```

```js
// HomeScreen.js
// this is how we will be importing environment variable from the env
import {GOOGLE_MAPS_KEY} from '@env'
```

---

## INSTALLING react-native-maps

```
yarn add react-native-maps
```

Now we also have to install react-native-maps and will point from point A to point B.

### Below we are going to use `GooglePlacesAutocomplete` API: 

```js
// Home Screen
import { View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import NavOptions from '../../components/nav-options/NavOptions'

import { GOOGLE_MAPS_KEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import { setOrigin, setDestination } from '../../redux/slices/navSlice.js'

const HomeScreen = () => {
  const dispatch = useDispatch()
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
        <GooglePlacesAutocomplete
          placeholder='Where From?'
          nearbyPlacesAPI='GooglePlaceSearch'
          debounce={400}
          query={{
            key: GOOGLE_MAPS_KEY,
            language: 'en'
          }}
          style={tw`flex-0 text-[18] bg-gray-500`}
          minLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry?.location,
                description: data?.description
              })
            )

            dispatch(setDestination(null))
          }}
          fetchDetails={true}
        />
        <NavOptions />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
```

### get the data form redux and put it in the `MapScreen`


```js
// MapScreen
import { View, Text } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { selectOrigin } from '../../redux/slices/navSlice'
import { useSelector } from 'react-redux'

const MapComponent = () => {
  const origin = useSelector(selectOrigin)
  return (
    <MapView
      style={tw`flex-1`}
      region={{
        latitude: parseFloat(origin?.location?.lat || 37.78825),
        longitude: parseFloat(origin?.location?.long || -122.4324),
        latitudeDelta: parseFloat(0.005),
        longitudeDelta: parseFloat(0.005)
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: parseFloat(origin?.location?.lat || 37.78825),
            longitude: parseFloat(origin?.location?.long || -122.4324)
          }}
        />
      )}
    </MapView>
  )
}

export default MapComponent

```


```js
//NavigateCard Component
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_KEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../../redux/slices/navSlice'
import { useNavigation } from '@react-navigation/native'

const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Haris</Text>
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
```

so know at this point we are navigating to the `RideOptionsScreen` also at this point we have to update our `Map` so go back to `MapScreen` and lets update it to introduce `Direction API` and for that we have to add a dependency [react-native-maps-directions](https://www.npmjs.com/package/react-native-maps-directions)

```
npm i react-native-maps-directions
```

while updating we will also add the `map zooming effect on click the destination` and that will be done by referencing the `MapView` and for that we will  be using `useRef hook`

```js
//MapComponent.js
import React, { useRef, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { selectDestination, selectOrigin } from '../../redux/slices/navSlice'
import { useSelector } from 'react-redux'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_KEY } from '@env'

const MapComponent = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!origin || !destination) return

    // Zoom and fit to marker
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }
    })
  }, [origin, destination])

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      region={{
        latitude: parseFloat(origin?.location?.lat || 37.78825),
        longitude: parseFloat(origin?.location?.long || -122.4324),
        latitudeDelta: parseFloat(0.005),
        longitudeDelta: parseFloat(0.005)
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin?.description}
          destination={destination?.description}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={3}
          strokeColor='black'
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: parseFloat(origin?.location?.lat),
            longitude: parseFloat(origin?.location?.long)
          }}
          title='origin'
          description={origin?.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: parseFloat(destination?.location?.lat),
            longitude: parseFloat(destination?.location?.long)
          }}
          title='destination'
          description={destination?.description}
          identifier='destination'
        />
      )}
    </MapView>
  )
}

export default MapComponent

```

