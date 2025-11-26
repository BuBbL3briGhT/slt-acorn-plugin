
import { Parser, tokTypes, TokenType } from "acorn";

var program =
`
  si (true) {
    42;
  }
`;

const tt = tokTypes;

function wordsRegexp(words) {
  return new RegExp("^(?:" +
    words.replace(/ /g, "|") + ")$")
}

const _si = Parser.acorn.keywordTypes["si"] =
  new TokenType("si", { keyword: "si" });

function makeParser(BaseParser) {
  return class extends BaseParser {

    constructor(...params) {
      super(...params);
      const newKeywords = "si";
      this.keywords = wordsRegexp(newKeywords);
      return this;
    }

    parseStatement(context, topLevel, exports) {
      let starttype = this.type, node = this.startNode(), kind

      switch(starttype) {
        case _si: return this.parseIfStatement(node);
      }

      return(super.parseStatement(context, topLevel,
        exports));
    }

  }
}

var result = makeParser(Parser).parse(program);

console.log(JSON.stringify(result ,null,' '));

