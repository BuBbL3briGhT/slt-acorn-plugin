// import * as acorn from "acorn";

// Minimal SLT plugin for Acorn v8 (CommonJS)
export function sltPlugin(BaseParser) {
  return class SLTParser extends BaseParser {
    readWord() {
      // call base implementation
      if (typeof super.readWord === "function") super.readWord();
      // super.readWord sets `this.value` and `this.type` at runtime
      if (typeof this.value === "string" && this.value.startsWith("slt_")) {
        this.type = acorn.tokTypes.name;
        this._isSLTToken = true;
      }
      return;
    }

    parseStatement(context, topLevel) {
      if (this._isSLTToken) {
        // parseSLT may be defined on instance below
        if (typeof this.parseSLT === "function") {
          return this.parseSLT();
        }
      }
      return super.parseStatement(context, topLevel);
    }

    parseSLT() {
      const start = this.start;
      const keyword = String(this.value);

      // consume keyword
      if (typeof this.next === "function") this.next();
      this._isSLTToken = false;

      // simple argument form: slt_print "hello";
      if (this.type !== acorn.tokTypes.braceL) {
        let value = "";
        while (!this.eof() && this.type !== acorn.tokTypes.braceL && this.type !== acorn.tokTypes.semi && !this._isSLTToken) {
          value += this.value + " ";
          if (typeof this.next === "function") this.next();
          else break;
        }
        if (this.type === acorn.tokTypes.semi && typeof this.next === "function") this.next();
        return { type: "SLTExpression", keyword, value: value.trim(), start, end: this.lastTokEnd };
      }

      // block form: slt_block { ... }
      if (this.type === acorn.tokTypes.braceL) {
        if (typeof this.next === "function") this.next(); // consume '{'
        const body = [];
        while (this.type !== acorn.tokTypes.braceR) {
          if (this._isSLTToken && typeof this.parseSLT === "function") {
            body.push(this.parseSLT());
          } else {
            if (typeof this.next === "function") this.next();
            else break;
          }
        }
        if (this.type === acorn.tokTypes.braceR && typeof this.next === "function") this.next();
        return { type: "SLTExpression", keyword, body, start, end: this.lastTokEnd };
      }

      this.raise && this.raise(start, `Unexpected SLT keyword: ${keyword}`);
    }
  };
}

export function createParser() {
  return acorn.Parser.extend(sltPlugin);
}

