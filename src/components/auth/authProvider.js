import { message } from "antd";
import { redirect } from "react-router-dom";
import { useApiService } from "../service/useApiService";

export const authProvider = {
  isAuthenticated: false,
  Email: null,

  async signout() {
    localStorage.setItem("UserInfo", null);
    authProvider.isAuthenticated = false;
    authProvider.Email = "";
  },
};

export async function loginAction({ request }) {
  let formData = await request.formData();

  const api = useApiService();

  let Email = formData.get("Email");
  let MatKhau = formData.get("MatKhau");

  // check email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(Email)) {
    return {
      error: "Email không hợp lệ!",
    };
  }

  // check mật khẩu
  if (MatKhau.length < 6) {
    return {
      error: "Mật khẩu không hợp lệ!",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    const resp = await api.login({
      Email: Email,
      MatKhau: MatKhau,
    });

    if (resp.Success) {
      localStorage.setItem("UserInfo", JSON.stringify(resp.Data));
      authProvider.isAuthenticated = true;
      authProvider.Email = Email;
    } else {
      message.error(resp.Error);
    }
  } catch (error) {
    return {
      error: "Login thất bại!",
    };
  }

  let redirectTo = formData.get("redirectTo");

  return redirect("/dashboard");
}

export async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/dashboard");
  }
  return null;
}

export function protectedLoader({ request }) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication

  const info = JSON.parse(localStorage.getItem("UserInfo"));

  const token = info?.Email;

  if (!token || token.length == 0) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}
