// Hàm hook sử dụng thông tin xác thực
export const useAuthInfo = () => {
  // Hàm lấy thông tin xác thực từ local storage
  const getAuthInfo = () => {
    const info = JSON.parse(localStorage.getItem("UserInfo")); // Đọc thông tin người dùng từ local storage và chuyển từ chuỗi JSON thành đối tượng

    return info; // Trả về thông tin người dùng
  };

  // Trả về đối tượng chứa thông tin người dùng hiện tại
  return {
    currentUser: getAuthInfo(), // Gọi hàm getAuthInfo để lấy thông tin người dùng
  };
};