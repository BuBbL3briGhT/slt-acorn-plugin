import { describe, it, before } from "node:test";
import assert from "node:assert";

import { Parser } from "acorn";

import { sltPlugin } from "../src/slt_plugin.js";

let SLTParser;

describe("SLTParser", function() {

  before(function () {
    SLTParser = sltPlugin(Parser);
  });

  describe("parse", function () {
    it("parses an es return statement", function () {
      // const resultado = SLTParser.parse(`función () { vuelta 42; }`)
      const resultado = SLTParser.parse(`function () { vuelta 42; }`)
      console.log(resultado.body);
    });
  });


  it("parses si as if", function () {
    const reslutado = SLTParser.parse("si (true) {}");
    console.log(resultado);
  });

});

