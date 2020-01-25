# Scripture-API Node Interface
A Node interface to access the APIs provided by [API.Bible
](https://scripture.api.bible/)


## Pre Step
SignUp on [API.Bible](https://scripture.api.bible/) and generate your api token

## Installation
```
npm install scripture-api-node --save
```

## Usage
```
const ScriptureApi = require('scripture-api-node');
const scriptureApi = new ScriptureApi('YOUR_API_TOKEN_HERE');
```

### Fetch all bibles
```js
const params = {
 language: 'eng', // ISO 639-3 three digit langage code used to filter results, (optional)
 abbreviation: 'kjv', // Bible abbreviation to search for (optional)
 name: 'king james version', // Bible name to search for (optional)
 ids: 'de4e12af7f28f599-01,...' // Comma separated list of Bible Ids to return (optional)
}

scriptureApi.getBibles(params)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

### Fetch a Bible
```js
const bibleId = 'de4e12af7f28f599-01' // Id of Bible to be fetched(required)
scriptureApi.getBible(bibleId)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

```



### Copyright
 * The author of this code has no formal relationship with https://scripture.api.bible/ and does not
 * claim to have created any of the facilities provided by https://scripture.api.bible/

(c) [@olawalejarvis](https://github.com/olawalejarvis)
