export function queryKeyGenerator(arrayOfStrings) {
  const result = [];

  // Iterate over each string in the array
  arrayOfStrings.forEach((str) => {
    // Create substrings of increasing lengths
    for (let i = 0; i < str.length; i++) {
      result.push(str.slice(0, i + 1));
    }
  });

  return result;
}
