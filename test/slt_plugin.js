import { describe, it } from "node:test";
import assert from "node:assert";

import { sltPlugin } from "../src/slt_plugin.js";

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





