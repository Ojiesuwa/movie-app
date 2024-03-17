export function getUserId() {
  return localStorage.getItem("user-id");
}

export function logOutUser() {
  return localStorage.removeItem("user-id");
}

export function loginUser(userId) {
  return localStorage.setItem("user-id", userId);
}

export function verifyAuth() {
  return localStorage.getItem("user-id");
}
