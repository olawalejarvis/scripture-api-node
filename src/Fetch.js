const request = require('request');

const ApiEnum = require('./ApiEnum');

/**
 * FETCH CLASS
 */
class Fetch {
  /**
   * Fetch all available bible translations
   * @param {string} apiKey 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibles(apiKey, params, callback) {
    const {
      language,
      abbreviation,
      name,
      ids
    } = params;

    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}?`
      if (language) {
        url = `${url}language=${language}&`;
      }
      if (abbreviation) {
        url = `${url}abbreviation=${abbreviation}&`;
      }
      if (name) {
        url = `${url}name=${name}&`;
      }
      if(ids) {
        url = `${url}ids=${ids}`;
      }
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch a bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bible(apiKey, bibleId, callback) {
    const url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}`;
    if (!bibleId) {
      return this.bibles(apiKey);
    }
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch all books from the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleBooks(apiKey, bibleId, params, callback) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books?`;
    const { includeChapters, includeChaptersAndSection } = params;
    if (includeChapters) {
      url = `${url}include-chapters=${includeChapters}&`;
    }

    if (includeChaptersAndSection) {
      url = `${url}include-chapters-and-sections=${includeChaptersAndSection}`
    }
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch a book from the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} bookId 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleBook(apiKey, bibleId, bookId, params, callback) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books/${bookId}?`;
    const { includeChapters } = params;
    if (includeChapters) {
      url = `${url}include-chapters=${includeChapters}`;
    }
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch all chapters from a book in the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} bookId 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleBookChapters(apiKey, bibleId, bookId, callback) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books/${bookId}/chapters`;
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch a chapter from bible book
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} chapterId 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleBookChapter(apiKey, bibleId, chapterId, params, callback) {
    let url = this._getLongUrl(`${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/chapters/${chapterId}`, params);
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Get a passage from the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} passageId 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static biblePassage(apiKey, bibleId, passageId, params, callback) {
    let url = this._getLongUrl(`${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/passages/${passageId}`, params);
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Search the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static search(apiKey, bibleId, params, callback) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/search?`;
    const {
      query,
      limit,
      offset
    } = params;
    if (query) {
      url = `${url}query=${query}&`;
    }
    if (limit && this._isNumber(limit)) {
      url = `${url}limit=${limit}&`;
    } else {
      url = `${url}limit=10&`;
    }
    if (offset && this._isNumber(offset)) {
      url = `${url}offset=${offset}&`;
    } else {
      url = `${url}offset=0&`;
    }
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch all sections in a bible book
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} bookId 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleBookSections(apiKey, bibleId, bookId, params, callback) {
    const url = this._getLongUrl(`${ApiEnum.baseUrl}/bibles/${bibleId}/books/${bookId}/sections`, params);
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch all sections in a chapter of the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} chapterId 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleChapterSections(apiKey, bibleId, chapterId, callback) {
    const url = this._getLongUrl(`${ApiEnum.baseUrl}/bibles/${bibleId}/chapters/${chapterId}/sections`);
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch a section in the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} sectionId 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleSection(apiKey, bibleId, sectionId, params, callback) {
    const url = this._getLongUrl(`${ApiEnum.baseUrl}/bibles/${bibleId}/sections/${sectionId}`, params);
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch all verses in a chapter of the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} chapterId 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleChapterVerses(apiKey, bibleId, chapterId, callback) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/chapters/${chapterId}/verses`;
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * Fetch a verse in the bible
   * @param {string} apiKey 
   * @param {string} bibleId 
   * @param {string} verseId 
   * @param {object} params 
   * @param {function name(error, res, body) {
     
   }} callback 
   */
  static bibleVerse(apiKey, bibleId, verseId, params, callback) {
    let url = this._getLongUrl(`${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/verses/${verseId}`, params);
    return request(this._getRequestOption(url, apiKey), callback);
  }

  /**
   * check if a value is a number
   * @param {number} n 
   */
  static _isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0) && (typeof n === 'string' || typeof n === 'number') 
  }

  /**
   * generate url based on params
   * @param {string} link 
   * @param {object} params 
   */
  static _getLongUrl(link, params = {}) {
    const {
      contentType,
      includeNotes,
      includeTitles,
      includeChapterNumbers,
      includeVerseNumbers,
      includeVerseSpans,
      parallels,
    } = params;

    let url = `${link}?`;
    if (includeNotes) {
      url = `${url}include-notes=${includeNotes}&`;
    }
    if (includeTitles) {
      url = `${url}include-titles=${includeTitles}&`;
    }
    if (includeChapterNumbers) {
      url = `${url}include-chapter-numbers=${includeChapterNumbers}&`;
    }
    if (includeVerseNumbers) {
      url = `${url}include-verse-numbers=${includeVerseNumbers}&`;
    }
    if (includeVerseSpans) {
      url = `${url}include-verse-spans=${includeVerseSpans}&`;
    }
    if (parallels) {
      url = `${url}parallels=${parallels}&`;
    }
    if (contentType && ['json, htnl, text'].includes(contentType.toLowerCase())) {
      url = `${url}content-type=${contentType.toLowerCase()}`;
    } else {
      url = `${url}content-type=json`;
    }
    return url;
  }

  /**
   * Generate request option
   * @param {string} url 
   * @param {string} apiKey 
   */
  static _getRequestOption(url, apiKey) {
    return {
      method: 'GET',
      url,
      headers: {
        'api-key': apiKey
      }
    }
  }
}

module.exports = Fetch;
