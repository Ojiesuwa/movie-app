export function generateRandomColor() {
  const hexCode = "ABCDEF123456789";
  let randomId = "";
  for (let i = 0; i < 6; i++) {
    randomId += hexCode[Math.floor(Math.random() * (hexCode.length - 1))];
  }
  return "#" + randomId;
}
