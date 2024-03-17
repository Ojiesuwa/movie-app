export function Truncate(input, maxLength) {
  let data =
    input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
  return data;
}
