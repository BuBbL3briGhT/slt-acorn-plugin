function wordsRegexp(words) {
  return new RegExp("^(?:" +
    words.replace(/ /g, "|") + ")$")
}


export function sltPlugin(BaseParser, keywordMap) {
  return class extends BaseParser {

    constructor(...params) {
      super(...params);
      const keywordTypes =
        BaseParser.acorn.keywordTypes;
      const tokTypes = BaseParser.acorn.tokTypes;
      const newKeywords = Object.keys(keywordMap);
      this.keywords = wordsRegexp(newKeywords.join(" "));

      for (const keyword in keywordMap) {
        const tt = tokTypes["_" +
          keywordMap[keyword]];
        if(tt) tt.keyword = keyword;
        keywordTypes[keyword] = tt;
      }
      return this;
    }

  }
}
