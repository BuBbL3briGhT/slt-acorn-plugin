
import { Parser, tokTypes, TokenType } from "acorn";

var program =
`
  función miFunción() {
    si (true) {
      vuelta 42;
    }
  }
`;

const tt = tokTypes;

function wordsRegexp(words) {
  return new RegExp("^(?:" +
    words.replace(/ /g, "|") + ")$")
}

tt._if.keyword = "si";
tt._function.keyword = "función";
tt._return.keyword = "vuelta";

Parser.acorn.keywordTypes["si"] = tt._if;
Parser.acorn.keywordTypes["función"] = tt._function;
Parser.acorn.keywordTypes["vuelta"] = tt._return;

function makeParser(BaseParser) {
  return class extends BaseParser {

    constructor(...params) {
      super(...params);
      const newKeywords = "si función vuelta";
      this.keywords = wordsRegexp(newKeywords);
      return this;
    }

    configureKeywords(keywordMap) {
      const keywordTypes = this.acorn.keywordTypes;
      for (keyword in keywordMap) {
        const tt = tokTypes["_" +
          keywordMap[keyword]];
        tt.keyword = keyword;
        keywordTypes[keyword] = tt;
      }

    }

  }
}

var result = makeParser(Parser).parse(program);

console.log(JSON.stringify(result ,null,' '));

