import { describe, it } from "node:test";
import assert from "node:assert";

import { sltPlugin } from "../src/slt_plugin.js";

// const { Parser } = require("acorn");
import { Parser } from "acorn";

const SLTParser = sltPlugin(Parser);

console.log({kool: SLTParser.parse(
   "// Some bigint + JSX code")})

console.log({kool: SLTParser.parse(
   "print('hello');")})

console.log({kool: SLTParser.parse(
   "slt_print('hello');")})


describe("sltPlugin", function () {
  it("returns an SLTParser instance", function () {
    assert(sltPlugin(function(){}));
  });
});


describe("SLTParser", () => {
  describe("readWord", () => {
    // Descrition of readWord
  });
  describe("parseStatement");
  describe("parseSLT");
});

describe("createParser");





