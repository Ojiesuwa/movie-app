export function csvToArray(csv) {
  let arr = csv.split(",");
  return arr.map((string) => string.trimStart());
}
