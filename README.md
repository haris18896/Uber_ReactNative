# UBER-CLONE : Home Screen

clean the `yarn` cache so that the fast refresh can work

```
sudo yarn start --reset-cache
```

[React Native Elements](https://reactnativeelements.com/) is a Cross Platform React Native UI toolkit with a Material design library.

```
npm install @rneui/themed @rneui/base
npm install react-native-vector-icons

npm install --save react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-screens @react-native-community/masked-view

npx react-native link react-native-vector-icons
npx react-native link react-native-safe-area-context


```

## Wrap your app with SafeAreaProvider from react-native-elements

```js
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return <SafeAreaProvider>...</SafeAreaProvider>;
}
```