import { tokTypes, TokenType } from "acorn";

export function sltPlugin(BaseParser) {
  return class extends BaseParser {

    configureKeywords(keywordMap) {
      const keywordTypes =
        BaseParser.acorn.keywordTypes;

      const newKeywords = Object.keys(keywordMap);
      this.keywords =
        BaseParser.acorn.Parser.keywords +
        " " + newKeywords.join(" ");

      for (const keyword in keywordMap) {
        const tt = tokTypes["_" +
          keywordMap[keyword]];
        tt.keyword = keyword;
        keywordTypes[keyword] = tt;
      }
    }
  }
}
