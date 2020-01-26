const Fetch = require('./Fetch');

/**
 * Scripture API Class
 */
class ScriptureApi {

  /**
   * contructor
   * @param {string} apiKey 
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * GET Bibles
   * Gets an array of Bible objects authorized for current API Key
   * @param {object} params 
   *  params = {
   *   language: '' - ISO 639-3 three digit langage code used to filter results,
   *   abbreviation: '' - Bible abbreviation to search for,
   *   name: '' - Bible name to search for,
   *   ids: '' - Comma separated list of Bible Ids to return
   *  }
   * @returns {object} returns a promise 
   */
  getBibles(params = {}) {
    return new Promise((resolve, reject) => {
      Fetch.bibles(this.apiKey, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * Get Bible by bibleId
   * Gets a single Bible for a given bibleId
   * @param {string} bibleId 
   * @returns {object} returns a promise
   */
  getBible(bibleId) {
    return new Promise((resolve, reject) => {
      Fetch.bible(this.apiKey, bibleId, (error, response, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE BOOKS
   * Gets an array of Book objects for a given bibleId
   * @param {string} bibleId 
   * @param {object} params 
   *   params = {
   *    includeChapters: true/false - default false,
   *    includeChaptersAndSections: true/false - default false
   *   }
   *  @returns {object} returns a promise
   */
  getBibleBooks(bibleId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBooks(this.apiKey, bibleId, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE BOOK
   * Gets a single Book object for a given bibleId and bookId
   * @param {string} bibleId 
   * @param {string} bookId 
   * @param {object} params
   * params = {
   *   include-chapters: true/false - default is false
   * } 
   * @returns {object} returns a promise
   */
  getBibleBook(bibleId, bookId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBook(this.apiKey, bibleId, bookId, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE BOOK CHAPTERS
   * Gets an array of Chapter objects for a given bibleId and bookId
   * @param {string} bibleId 
   * @param {string} bookId 
   * @returns {object} returns a promise
   */
  getBibleBookChapters(bibleId, bookId) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBookChapters(this.apiKey, bibleId, bookId, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE BOOK CHAPTER
   * Gets a single Chapter object for a given bibleId and chapterId. This Chapter object also includes an content property with all verses for the Chapter.
   * @param {string} bibleId 
   * @param {string} chapterId 
   * @param {object} params
   * params = {
   *   content-type: html/text/json - default json,
   *   include-notes: true/false - default false,
   *   include-titles: true/false - default false,
   *   include-chapter-numbers: true/false - default false,
   *   include-verse-numbers: true/false - default false,
   *   include-verse-spans: true/false - default false,
   *   parallels: '' - Comma delimited list of bibleIds to include
   * }
   * @returns {object} returns a promise 
   */
  getBibleBookChapter(bibleId, chapterId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBookChapter(this.apiKey, bibleId, chapterId, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE PASSAGE
   * Gets a Passage object for a given bibleId and passageId. This Passage object also includes an content property with all verses corresponding to the passageId. The passageId parameter can represent a chapter, verse, or range of verses.
   * @param {string} bibleId 
   * @param {string} passageId 
   * @param {object} params 
   * params = {
   *   content-type: html/text/json - default json,
   *   include-notes: true/false - default false,
   *   include-titles: true/false - default false,
   *   include-chapter-numbers: true/false - default false,
   *   include-verse-numbers: true/false - default false,
   *   include-verse-spans: true/false - default false,
   *   parallels: '' - Comma delimited list of bibleIds to include
   * }
   * @returns {object} returns a promoise
   */
  getBiblePassage(bibleId, passageId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.biblePassage(this.apiKey, bibleId, passageId, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * SEARCH THE BIBLE
   * Gets search results for a given bibleId and query string.
   * Searches will match all verses with the list of keywords provided in the query string.
   * Order of the keywords does not matter.
   * However all keywords must be present in a verse for it to be considered a match.
   * The total number of results returned from a search can be limited by populating the limit attribute in the query string with a non-negative integer value.
   * If no limit value is provide a default of 10 is used. offset can be used to traverse paginated results.
   * So for example if you are using the default limit of 10, using an offset of 10 will return the second page of results,
   * namely results 11-20. The text property of each verse object contains only the verse text. It does not contain footnote references.
   * However, those can be queried directly using the /bibles/{bibleId}/verses/{verseId} endpoint.
   * @param {string} bibleId 
   * @param {object} params
   * params = {
   *  query: '' - Search keywords or passage reference,
   *  limit: '' - Integer limit for how many matching results to return. Default is 10,
   *  offset: '' - Offset for search results. Used to paginate results
   * }
   * @returns {object} returns a promise
   */
  search(bibleId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.search(this.apiKey, bibleId, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE BOOK SECTION
   * Gets an array of Section objects for a given bibleId and bookId
   * @param {string} bibleId 
   * @param {string} bookId 
   * @param {object} params
   * params = {
   *   content-type: html/text/json - default json,
   *   include-notes: true/false - default false,
   *   include-titles: true/false - default false,
   *   include-chapter-numbers: true/false - default false,
   *   include-verse-numbers: true/false - default false,
   *   include-verse-spans: true/false - default false,
   *   parallels: '' - Comma delimited list of bibleIds to include
   * }
   * @returns {object} returns a promise
   */
  getBibleBookSections(bibleId, bookId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBookSections(this.apiKey, bibleId, bookId, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE CHAPTER SECTIONS
   * Gets an array of Section objects for a given bibleId and chapterId
   * @param {string} bibleId 
   * @param {string} chapterId 
   * @param {object} params
   * @returns {object} returns a promise
   */
  getBibleChapterSections(bibleId, chapterId) {
    return new Promise((resolve, reject) => {
      Fetch.bibleChapterSections(this.apiKey, bibleId, chapterId, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE SECTION
   * Gets a single Section object for a given bibleId and sectionId.
   * This Section object also includes an content property with all verses for the Section.
   * @param {string} bibleId 
   * @param {string} sectionId 
   * @param {object} params
   * params = {
   *   content-type: html/text/json - default json,
   *   include-notes: true/false - default false,
   *   include-titles: true/false - default false,
   *   include-chapter-numbers: true/false - default false,
   *   include-verse-numbers: true/false - default false,
   *   include-verse-spans: true/false - default false,
   *   parallels: '' - Comma delimited list of bibleIds to include
   * }
   * @returns {object} returns a promise
   */
  getBibleSections(bibleId, sectionId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleSection(this.apiKey, bibleId, sectionId, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE CHAPTER VERSES
   * Gets an array of Verse objects for a given bibleId and chapterId
   * @param {string} bibleId 
   * @param {string} chapterId 
   * @param {object} params
   * @returns {object} returns a promise
   */
  getBibleChapterVerses(bibleId, chapterId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleChapterVerses(this.apiKey, bibleId, chapterId, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }

  /**
   * GET BIBLE VERSES
   * Gets a Verse object for a given bibleId and verseId. This Verse object also includes an content property with the verse corresponding to the verseId.
   * @param {string} bibleId 
   * @param {string} verseId 
   * @param {object} params 
   * @returns {object} returns a promise
   */
  getBibleVerses(bibleId, verseId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleChapterVerses(this.apiKey, bibleId, verseId, params, (error, res, body) => {
        if (error) {
          return reject(JSON.parse(error));
        }
        resolve(JSON.parse(body));
      })
    })
  }
}

module.exports = ScriptureApi;
