import { describe, it } from "node:test";
import assert from "node:assert";

import { version } from "acorn";

assert.equal(version, "8.15.0");
