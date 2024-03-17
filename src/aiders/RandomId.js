import { redirectDocument } from "react-router-dom";

export function generateRandomId(length = 16) {
  let alphaNumerals =
    "abcdefgghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId +=
      alphaNumerals[Math.floor(Math.random() * (alphaNumerals.length - 1))];
  }

  return randomId;
}
