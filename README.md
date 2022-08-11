# UBER-CLONE : Redux toolkit

## App Installation
```
npx create-expo-app <app name>
```

## Redux, navigation, tailwindcss : Installation

```
npm install @reduxjs/toolkit react-redux
npm i @react-navigation/native
npm i @react-navigation/native-stack
npm i tailwindcss-react-native
npm install --save-dev tailwindcss
```

## tailwind.config.js

```js
// tailwind.config.js
module.exports = {
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
};
```

## babel.config.js

```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["tailwindcss-react-native/babel"],
  };
};
```

## App.js

```js
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { TailwindProvider } from 'tailwindcss-react-native'

import HomeScreen from './screens/home/HomeScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{
                presentation: 'fullScreenModal',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
```

## HomeScreen.js
~
```js
import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const HomeScreen = () => {
  return (
    <SafeAreaView className='mt-10 bg-red-500'>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen
```

---
# Above settings are for Redux, React-Native-Navigation and Tailwind CSS.