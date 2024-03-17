export function modifyArray(arr, str) {
  const index = arr.indexOf(str);
  let newArray = [...arr];
  let alreadyExists = false;

  if (index !== -1) {
    // String already exists, so remove it
    newArray.splice(index, 1);
    alreadyExists = true;
  } else {
    // String doesn't exist, so append it
    newArray.push(str);
  }

  return {
    newArray,
    alreadyExists,
  };
}
