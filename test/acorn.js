import { describe, it } from "node:test";
import assert from "node:assert";

import * as acorn from "acorn";

describe("acorn", function () {
  it("is the expected version", function () {
    assert.equal(acorn.version, "8.15.0");
  });
});

