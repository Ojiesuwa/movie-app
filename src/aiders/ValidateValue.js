export function validateValue(input) {
  if (Array.isArray(input)) {
    return input.join(", ");
  } else {
    return String(input);
  }
}
