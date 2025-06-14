import Cookies from "js-cookie";

export function checkAuth(): boolean {
  try {
    const token = Cookies.get("login");
    return !!token;
  } catch (error) {
    console.error("Error checking auth:", error);
    return false;
  }
}