
import { Parser, tokTypes, TokenType } from "acorn";

var program =
`
  si (true) {
    42;
  }
`;

const tt = tokTypes;

const _si =
  Parser.acorn.keywordTypes["si"] =
  new TokenType("si",
    { keyword: "si" });

function wordsRegexp(words) {
  return new RegExp("^(?:" +
    words.replace(/ /g, "|") + ")$")
}

function makeParser(BaseParser) {
  return class extends BaseParser {

    parse(program) {
      console.log("hooking parse.");

      const newKeywords = "si";
      console.log(wordsRegexp(newKeywords));

      this.keywords = wordsRegexp(newKeywords);

      return(super.parse(program));
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

