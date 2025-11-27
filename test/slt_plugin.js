import { describe, it } from "node:test";
import assert from "node:assert";

import { sltPlugin } from "../src/slt_plugin.js";
import { Parser } from "acorn";

describe("sltPlugin", function () {
  it("returns an SLTParser instance", function () {
    assert(sltPlugin(Parser));
  });
});


const SLTParser = sltPlugin(Parser);
SLTParser.configureKeywords({
  "si": "if",
  "función": "function",
  "vuelta": "return"
});


var program =
`
  función miFunción() {
    si (true) {
      vuelta 42;
    }
  }
`;

const resultado = SLTParser.parse(program);

console.log(resultado);







