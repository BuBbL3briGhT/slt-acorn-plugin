
import { Parser, tokTypes, TokenType } from "acorn";

var program =
`
  si (true) {
    42;
  }

  función miFunción() {}
`;

const tt = tokTypes;

function wordsRegexp(words) {
  return new RegExp("^(?:" +
    words.replace(/ /g, "|") + ")$")
}

tt._if.keyword = "si";
tt._function.keyword = "función";

Parser.acorn.keywordTypes["si"] = tt._if;
Parser.acorn.keywordTypes["función"] = tt._function;

function makeParser(BaseParser) {
  return class extends BaseParser {

    constructor(...params) {
      super(...params);
      const newKeywords = "si función";
      this.keywords = wordsRegexp(newKeywords);
      return this;
    }

  }
}

var result = makeParser(Parser).parse(program);

console.log(JSON.stringify(result ,null,' '));

