const axios = require('axios');

const ApiEnum = require('./ApiEnum');

class Fetch {
  static bibles(apiKey, params) {
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
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bible(apiKey, bibleId) {
    const url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}`;
    if (!bibleId) {
      return this.bibles(apiKey);
    }
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleBooks(apiKey, bibleId, params) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books?`;
    const { includeChapters, includeChaptersAndSection } = params;
    if (includeChapters) {
      url = `${url}include-chapters=${includeChapters}&`;
    }

    if (includeChaptersAndSection) {
      url = `${url}include-chapters-and-sections=${includeChaptersAndSection}`
    }

    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleBook(apiKey, bibleId, bookId, params) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books/${bookId}?`;
    const { includeChapters } = params;
    if (includeChapters) {
      url = `${url}include-chapters=${includeChapters}`;
    }

    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleBookChapters(apiKey, bibleId, bookId, params) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books/${bookId}/chapters`;
     return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleBookChapter(apiKey, bibleId, chapterId, params) {
    let url = _getLongUrl(`${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/chapters/${chapterId}`, params);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static biblePassage(apiKey, bibleId, passageId, params) {
    let url = _getLongUrl(`${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/passages/${passageId}`, params);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static search(apiKey, bibleId, params) {
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

    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleBookSections(apiKey, bibleId, bookId, params) {
    const url = this._getLongUrl(`${ApiEnum.baseUrl}/bibles/${bibleId}/books/${bookId}/sections`, params);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleChapterSections(apiKey, bibleId, chapterId, params) {
    const url = this._getLongUrl(`${ApiEnum.baseUrl}/bibles/${bibleId}/chapters/${chapterId}/sections`, params);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleSection(apiKey, bibleId, sectionId, params) {
    const url = this._getLongUrl(`${ApiEnum.baseUrl}/bibles/${bibleId}/sections/${sectionId}`, params);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleChapterVerses(apiKey, bibleId, chapterId, params) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/chapters/${chapterId}/verses`;
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  static bibleVerse(apiKey, bibleId, verseId, params) {
    let url = _getLongUrl(`${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/verses/${verseId}`, params);
    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    })
  }

  _isNumber(n) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0) && (typeof n === 'string' || typeof n === 'number') 
  }

  _getLongUrl(link, params) {
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
}

module.exports = Fetch;
