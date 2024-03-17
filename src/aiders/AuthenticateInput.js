import { csvToArray } from "./CSVToArray";
import { queryKeyGenerator } from "./QueryKeyGenerator";

export function AuthenticateInput(input) {
  console.log("inpuy ", input);
  // input.Genre = csvToArray(input.Genre);
  // input.Cast = csvToArray(input.Cast);
  input.QueryKey = queryKeyGenerator([
    input.Title.toLowerCase(),
    input.Director.toLowerCase(),
  ]);
  return input;
}
