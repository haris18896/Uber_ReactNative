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
        'nodule:react-native-dotenv',
        {
          moduleName: '@env',
          path: './env'
        }
      ]
    ]
  }
}
```