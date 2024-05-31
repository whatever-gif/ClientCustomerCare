// Import các module cần thiết từ thư viện antd và axios
import { message } from "antd";
import axios from "axios";

// Khai báo hàm useConfigApi
export const useConfigApi = () => {
  // Khai báo hàm get với tham số là endPoint và postData
  const get = async (endPoint, postData) => {
    // Thực hiện gửi request POST đến server bằng axios
    const response = await axios
      .post(`https://localhost:7097/api/${endPoint}`, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Đặt kiểu nội dung của request
        },
      })
      // .then((res) => res.data)
      .catch((err) => {
        // Sử dụng alert của antd để hiển thị lỗi

        message.error(err.message);
      });

    // Tạo một delay 1 giây
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Trả về dữ liệu từ response
    return response?.data;
  };

  // Trả về hàm get
  return {
    get,
  };
};