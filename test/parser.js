
import { Parser, tokTypes, TokenType } from "acorn";

var program =
`
  si (true) {
    42;
  }
`;

const tt = tokTypes;

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
      var starttype = this.type;
      console.log("!!!hooking parseStatement",
        starttype);

      if (starttype ==
          Parser.acorn.keywordTypes["si"]) {
        console.log("Parse MyStatement");
        var node = this.startNode();
        return this.parseSi(node);
      }
      else {
        return(super.parseStatement(context,
          topLevel, exports));
      }
    }

    parseSi(node) {
      console.log("parse MyStatement");
      this.next();

      //In my language, MyStatement doesn't have to have a parameter. It could be called as `MyStatement { ... }`
      if (this.type == tt.parenL) {
        node.test =
          this.parseOptionalParenExpression();
      }
      else {
        node.test = 0;
        //If there is no test, just make it 0 for now
        //(note that this may break code generation
        //later).
      }

      node.isSi = true;
      //set a flag so we know that this if a
      //"MyStatement" instead of an if statement.

      //process the body of the block just like a
      //normal if statement for now.

      // allow function declarations in branches, but
      // only in non-strict mode
      node.consequent = this.parseStatement("if");
      //node.alternate = this.eat(acornTypes["else"])
      //? this.parseStatement("if") : null;
      return this.finishNode(node, "IfStatement")
    };

    parseOptionalParenExpression() {
      this.expect(tt.parenL);

      //see what type it is
      console.log("Type: ", this.type);

      //allow it to be blank.
      var val = 0;
      //for now just make the condition 0. Note that
      //this may break code generation later.
      if (this.type == tt.parenR) {
        this.expect(tt.parenR);
      }
      else {
        val = this.parseExpression();
        this.expect(tt.parenR);
      }

      return val
    };

  }
}

var result = makeParser(Parser).parse(program);

console.log(JSON.stringify(result ,null,' '));

