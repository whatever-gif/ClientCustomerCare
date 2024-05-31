// Nhập các thư viện và hàm cần thiết
import { message } from "antd";
import { redirect } from "react-router-dom";
import { useApiService } from "../service/useApiService";

// Tạo đối tượng authProvider để quản lý trạng thái đăng nhập
export const authProvider = {
  isAuthenticated: false, // biến kiểm tra trạng thái đăng nhập
  Email: null, // biến lưu email của người dùng

  // Hàm đăng xuất
  async signout() {
    localStorage.setItem("UserInfo", null); // xóa thông tin người dùng khỏi localStorage
    authProvider.isAuthenticated = false; // đặt trạng thái đăng nhập về false
    authProvider.Email = ""; // xóa email người dùng
  },
};

// Hàm thực hiện đăng nhập
export async function loginAction({ request }) {
  let formData = await request.formData(); // lấy dữ liệu từ form

  const api = useApiService(); // khởi tạo api service

  let Email = formData.get("Email"); // lấy email từ form data
  let MatKhau = formData.get("MatKhau"); // lấy mật khẩu từ form data

  // kiểm tra email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // biểu thức chính quy kiểm tra email

  // nếu email không hợp lệ, trả về lỗi
  if (!emailRegex.test(Email)) {
    return {
      error: "Email không hợp lệ!",
    };
  }

  // kiểm tra mật khẩu
  // nếu mật khẩu ngắn hơn 6 ký tự, trả về lỗi
  if (MatKhau.length < 6) {
    return {
      error: "Mật khẩu không hợp lệ!",
    };
  }

  // thực hiện đăng nhập và chuyển hướng nếu thành công
  try {
    const resp = await api.login({
      Email: Email,
      MatKhau: MatKhau,
    });

    // nếu đăng nhập thành công, lưu thông tin người dùng và cập nhật trạng thái đăng nhập
    if (resp.Success) {
      localStorage.setItem("UserInfo", JSON.stringify(resp.Data));
      authProvider.isAuthenticated = true;
      authProvider.Email = Email;
    } else {
      message.error(resp.Error); // nếu đăng nhập thất bại, hiển thị lỗi
    }
  } catch (error) {
    return {
      error: "Login thất bại!", // nếu có lỗi xảy ra, trả về lỗi
    };
  }

  return redirect("/dashboard"); // chuyển hướng đến trang dashboard
}

// Hàm kiểm tra trạng thái đăng nhập và chuyển hướng nếu cần
export async function loginLoader() {
  if (authProvider.isAuthenticated) {
    return redirect("/dashboard"); // nếu đã đăng nhập, chuyển hướng đến trang dashboard
  }
  return null;
}

// Hàm kiểm tra trạng thái đăng nhập khi truy cập vào trang yêu cầu đăng nhập
export function protectedLoader({ request }) {
  // nếu người dùng chưa đăng nhập và cố gắng truy cập vào `/protected`, chúng ta sẽ chuyển hướng
  // họ đến `/login` với một tham số `from` cho phép chuyển hướng trở lại trang này sau khi đăng nhập thành công

  const info = JSON.parse(localStorage.getItem("UserInfo")); // lấy thông tin người dùng từ localStorage

  const token = info?.Email; // lấy email từ thông tin người dùng

  // nếu không có email hoặc email rỗng, chuyển hướng đến trang đăng nhập
  if (!token || token.length == 0) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}