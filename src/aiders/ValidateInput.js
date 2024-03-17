export function validateInput(inputs) {
  console.log(inputs);
  for (const key in inputs) {
    console.log(inputs[key]);
    if (!inputs[key]) {
      return false;
    }
  }
  return true;
}
