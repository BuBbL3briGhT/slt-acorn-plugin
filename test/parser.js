
import { Parser } from "acorn";

var program =
`
  if (true) {
    42;
  }
`;

var result = Parser.parse(program);

console.log(JSON.stringify(result ,null,' '));

