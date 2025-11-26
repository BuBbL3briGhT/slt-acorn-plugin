
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

const _si = Parser.acorn.keywordTypes["si"] =
  new TokenType("si", { keyword: "si" });

const _función = Parser.acorn.keywordTypes["función"] =
  new TokenType("función", { keyword: "función" });

function makeParser(BaseParser) {
  return class extends BaseParser {

    constructor(...params) {
      super(...params);
      const newKeywords = "si función";
      this.keywords = wordsRegexp(newKeywords);
      return this;
    }

    parseStatement(context, topLevel, exports) {
      let starttype = this.type, node = this.startNode(), kind

      switch(starttype) {
        case _función:
          // Function as sole body of either an if statement or a labeled statement
          // works, but not when it is part of a labeled statement that is the sole
          // body of an if statement.
          if ((context && (this.strict || context !== "if" && context !== "label")) && this.options.ecmaVersion >= 6) this.unexpected()
          return this.parseFunctionStatement(node, false, !context)
        case _si: return this.parseIfStatement(node);
      }

      return(super.parseStatement(context, topLevel,
        exports));
    }

  }
}

var result = makeParser(Parser).parse(program);

console.log(JSON.stringify(result ,null,' '));

