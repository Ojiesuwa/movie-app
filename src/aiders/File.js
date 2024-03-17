export function fetchImage() {
  return new Promise((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.addEventListener("change", () => {
      let file = input.files[0];
      let fileURL = URL.createObjectURL(file);

      resolve({
        file,
        name: file.name,
        size: file.size.toFixed(1),
        url: fileURL,
      });
    });
  });
}
export function fetchVideo() {
  return new Promise((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.click();

    input.addEventListener("change", () => {
      let file = input.files[0];
      let fileURL = URL.createObjectURL(file);

      let duration = null;

      resolve({
        file,
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1),
        url: fileURL,
      });
    });
  });
}
