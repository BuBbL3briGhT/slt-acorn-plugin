import { tokTypes, TokenType } from "acorn";

function wordsRegexp(words) {
  return new RegExp("^(?:" +
    words.replace(/ /g, "|") + ")$")
}


export function sltPlugin(BaseParser) {
  return class extends BaseParser {

    constructor(...params) {
      super(...params);
      const newKeywords = Object.keys(this.constructor.keywordMap);
      this.keywords = wordsRegexp(newKeywords.join(" "));
      return this;
    }

    static configureKeywords(keywordMap) {
      const keywordTypes =
        BaseParser.acorn.keywordTypes;

      this.keywordMap = keywordMap;

      for (const keyword in keywordMap) {
        const tt = tokTypes["_" +
          keywordMap[keyword]];
        tt.keyword = keyword;
        keywordTypes[keyword] = tt;
      }
    }
  }
}
