const languageMap = {
  'en-US': 'English - United States',
  'en-GB': 'English - United Kingdom',
  'en-AU': 'English - Australia',
  'en-CA': 'English - Canada',
  'fr-FR': 'French - France',
  'fr-CA': 'French - Canada',
  'ja-JP': 'Japanese',
  'ko-KR': 'Korean',
  'pt-BR': 'Portuguese',
  'it-IT': 'Italian',
  'ru-RU': 'Russian',
  'hi-IN': 'Hindi',
  'th-TH': 'Thai',
  'id-ID': 'Indonesian',
  'da-DK': 'Danish',
  'no-NO': 'Norwegian',
  'nl-NL': 'Dutch',
  'sv-SE': 'Swedish'
}

const methods = {
  getLanguageMap () {
    return languageMap
  },
  getLanguagesForSelect () {
    let selectList = []
    for (let languageKey in languageMap) {
      selectList.push({
        value: languageKey,
        text: languageMap[languageKey]
      })
    }
    return selectList
  }
}

export default methods
