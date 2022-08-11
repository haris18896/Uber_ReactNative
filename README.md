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

After successfully Creating a project