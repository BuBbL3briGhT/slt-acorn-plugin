
// Source - https://stackoverflow.com/a

// Posted by bruceceng

// Retrieved 2025-11-25, License - CC BY-SA 4.0


var program =
`
  si(true) {
    veultaA 42;
  }
`;

const acorn = require("acorn");

const Parser = acorn.Parser;

const tt = acorn.tokTypes;
//used to access standard token types like "("

const TokenType = acorn.TokenType;
//used to create new types of Tokens.

//add a new keyword to Acorn.
Parser.acorn.keywordTypes["si"] =
  new TokenType("si",
    { keyword: "si" });

//const isIdentifierStart =
//  acorn.isIdentifierStart;

function wordsRegexp(words) {
  return new RegExp("^(?:" +
    words.replace(/ /g, "|") + ")$")
}

var bruceware = function(Parser) {
  return class extends Parser {
    parse(program) {
      console.log("hooking parse.");

      //it appears it is necessary to add keywords
      //here also.
      var newKeywords =
        `break case catch continue debugger default
      do else finally for function if return switch
      throw try var while with null true false
        instanceof typeof void delete new in this
      const class extends export import super`;

      newKeywords += " si";
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

    //In my language, MyStatement, optionally has a
    //parameter. It can also by called as
    //MyStatement() { ... }
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

process.stdout.write('\033c'); //cls

var result2 =
  Parser.extend(bruceware).parse(program);
//attempt to parse

console.log(JSON.stringify(result2,null,' '));
//show the results.


