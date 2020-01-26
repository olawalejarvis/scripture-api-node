# Scripture-API Node Interface
A Node interface to access the APIs provided by [API.Bible
](https://scripture.api.bible/)


## Pre Step
SignUp on [API.Bible](https://scripture.api.bible/) and generate your api token

## Installation
```
npm install scripture-api --save
```

## Usage
```
const ScriptureApi = require('scripture-api');
const scriptureApi = new ScriptureApi('YOUR_API_TOKEN_HERE');
```

### Fetch all bibles
Gets an array of Bible objects authorized for current API Key

```js
const params = {
// ISO 639-3 three digit langage code used to filter results, (optional)
 language: 'eng',

 // Bible abbreviation to search for (optional)
 abbreviation: 'kjv',

 // Bible name to search for (optional)
 name: 'king james version',

 // Comma separated list of Bible Ids to return (optional)
 ids: 'de4e12af7f28f599-01,...'
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
Gets a single Bible for a given bibleId

```js
// Id of Bible to be fetched(required)
const bibleId = 'de4e12af7f28f599-01' 

scriptureApi.getBible(bibleId)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

```

### Fetch Bible Books
Gets an array of Book objects for a given bibleId
```js
// Id of Bible to be fetched(required)
const bibleId = 'de4e12af7f28f599-01'

const params = {
  // Boolean indicating if an array of chapter summaries should be included in the results. Defaults to false
  includeChapters: false,

  // Boolean indicating if an array of chapter summaries and an   array of sections should be included in the results. Defaults to false.
  includeChaptersAndSections: false
};

scriptureApi.getBibleBooks(bibleId, params)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })
```

### Fetch a book in the bible
Gets a single Book object for a given bibleId and bookId

```js

// Id of Bible whose Book to fetch 
const bibleId = '';

// Id of the Book to fetch
const bookId = '';

const params = {
  // Boolean indicating if an array of chapter summaries should be included in the results. Defaults to false.
  includeChapters: false
};

scriptureApi.getBibleBook(bibleId, bookId, params)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })
```

### Fetch Chapters for a Bible
Gets an array of Chapter objects for a given bibleId and bookId

```js
// Id of Bible whose Book to fetch 
const bibleId = '';

// Id of the Book to fetch
const bookId = '';

scriptureApi.getBibleBookChapters(bibleId, bookId)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })
```

### Fetch Chapter for a Bible
Gets a single Chapter object for a given bibleId and chapterId. This Chapter object also includes an content property with all verses for the Chapter.

```js

// Id of Bible whose Chapter to fetch
const bibleId = '';

// Id of the Chapter to fetch
const chapterId = '';

const params = {
  
  // Content type to be returned in the content property. Supported values are html (default), json (beta), and text (beta)
  contentType: 'json',

  // Include footnotes in content
  includeNotes: false,

  // Include section titles in content
  includeTitles: false,

  // Include chapter numbers in content
  includeChapterNumbers: false,

  // Include verse numbers in content.
  includeVerseNumbers: false,

  // Include spans that wrap verse numbers and verse text for bible content.
  includeVerseSpans: false,

  // Comma delimited list of bibleIds to include
  paralles: ''
};

scriptureApi.getBibleBookChapter(bibleId, chapterId, params)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })
```

### Fetch a Passage for a Bible
Gets a Passage object for a given bibleId and passageId. This Passage object also includes an content property with all verses corresponding to the passageId. The passageId parameter can represent a chapter, verse, or range of verses.

```js

// Id of Bible whose Chapter to fetch
const bibleId = 'de4e12af7f28f599-01';

// String reference id for the requested passage.
const passageId = 'REV.22.3';

const params = {
  
  // Content type to be returned in the content property. Supported values are html (default), json (beta), and text (beta)
  contentType: 'json',

  // Include footnotes in content
  includeNotes: false,

  // Include section titles in content
  includeTitles: false,

  // Include chapter numbers in content
  includeChapterNumbers: false,

  // Include verse numbers in content.
  includeVerseNumbers: false,

  // Include spans that wrap verse numbers and verse text for bible content.
  includeVerseSpans: false,

  // Comma delimited list of bibleIds to include
  paralles: ''
};

scriptureApi.getBiblePassage(bibleId, passageId, params)
  .then((data) => {
    console.log(JSON.stringify(data))
  })
  .catch((error) => {
    console.log(error);
  })
};

```

### Search by Keyword or reference
Gets search results for a given bibleId and query string. Searches will match all verses with the list of keywords provided in the query string. Order of the keywords does not matter. However all keywords must be present in a verse for it to be considered a match. The total number of results returned from a search can be limited by populating the limit attribute in the query string with a non-negative integer value. If no limit value is provide a default of 10 is used. offset can be used to traverse paginated results. So for example if you are using the default limit of 10, using an offset of 10 will return the second page of results, namely results 11-20. The text property of each verse object contains only the verse text. It does not contain footnote references. However, those can be queried directly using the /bibles/{bibleId}/verses/{verseId} endpoint.

```js

// Id of Bible whose Chapter to fetch
const bibleId = 'de4e12af7f28f599-01';

const params = {

  // Search keywords or passage reference.
  query: '',

  // Integer limit for how many matching results to return. Default is 10.
  limit: 10,

  // Offset for search results. Used to paginate results
  offset: 0
};

scriptureApi.search(bibleId, params)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })

```

### Fetch book sections for a bible
Gets an array of Section objects for a given bibleId and bookId

```js
// Id of Bible whose Chapter to fetch
const bibleId = 'de4e12af7f28f599-01';

// Id of the Book whose Sections to fetch
const bookId = 'REV.22.3';

const params = {
  
  // Content type to be returned in the content property. Supported values are html (default), json (beta), and text (beta)
  contentType: 'json',

  // Include footnotes in content
  includeNotes: false,

  // Include section titles in content
  includeTitles: false,

  // Include chapter numbers in content
  includeChapterNumbers: false,

  // Include verse numbers in content.
  includeVerseNumbers: false,

  // Include spans that wrap verse numbers and verse text for bible content.
  includeVerseSpans: false,

  // Comma delimited list of bibleIds to include
  paralles: ''
};

scriptureApi.getBibleBookSections(bibleId, bookId, params)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })

```

### Fetch chapter sections for a bible
Gets an array of Section objects for a given bibleId and chapterId

```js

// Id of Bible whose Sections to fetch
const bibleId = '';

// Id of the Chapter whose Sections to fetch
const chapterId = '';

scriptureApi.getBibleChapterSections(bibleId, chapterId)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })

```

### Fetch a bible section

Gets a single Section object for a given bibleId and sectionId. This Section object also includes an content property with all verses for the Section.

```js

// Id of Bible whose Section to fetch
const bibleId = '';

// Id of the Section to fetch
const sectionId = '';

const params = {
  
  // Content type to be returned in the content property. Supported values are html (default), json (beta), and text (beta)
  contentType: 'json',

  // Include footnotes in content
  includeNotes: false,

  // Include section titles in content
  includeTitles: false,

  // Include chapter numbers in content
  includeChapterNumbers: false,

  // Include verse numbers in content.
  includeVerseNumbers: false,

  // Include spans that wrap verse numbers and verse text for bible content.
  includeVerseSpans: false,

  // Comma delimited list of bibleIds to include
  paralles: ''
};

scriptureApi.getBibleSections(bibleId, sectionId)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })

```

### Fetch Verses for a bible
Gets an array of Verse objects for a given bibleId and chapterId

```js

// Id of Bible whose Verses to fetch
const bibleId = '';

// Id of the Chapter whose Verses to fetch
const chapterId = '';

scriptureApi.getBibleChapterVerses(bibleId, chapterId)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })

```

### Fetch a verse from the bible
Gets a Verse object for a given bibleId and verseId. This Verse object also includes an content property with the verse corresponding to the verseId.

```js

// Id of Bible for passage
const bibleId = '';


// String reference id for the requested verse.
const verseId = '';

const params = {
  
  // Content type to be returned in the content property. Supported values are html (default), json (beta), and text (beta)
  contentType: 'json',

  // Include footnotes in content
  includeNotes: false,

  // Include section titles in content
  includeTitles: false,

  // Include chapter numbers in content
  includeChapterNumbers: false,

  // Include verse numbers in content.
  includeVerseNumbers: false,

  // Include spans that wrap verse numbers and verse text for bible content.
  includeVerseSpans: false,

  // Comma delimited list of bibleIds to include
  paralles: ''
};

scriptureApi.getBibleVerses(bibleId, chapterId)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.log(error);
  })

```


## Copyright
The author of this code has no formal relationship with https://scripture.api.bible/ and does not claim to have created any of the facilities provided by https://scripture.api.bible/

(c) [@olawalejarvis](https://github.com/olawalejarvis)
