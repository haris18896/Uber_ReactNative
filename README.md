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