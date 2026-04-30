// src/utils/auth.js

export function isLoggedIn() {
  return localStorage.getItem("user") === "true";
}

export function login() {
  localStorage.setItem("user", "true");
}

export function logout() {
  localStorage.removeItem("user");
}