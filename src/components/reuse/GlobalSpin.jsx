// Import icon LoadingOutlined từ thư viện @ant-design/icons
import { LoadingOutlined } from "@ant-design/icons";
// Import hook useIsFetching từ thư viện @tanstack/react-query
import { useIsFetching } from "@tanstack/react-query";
// Import component Spin từ thư viện antd
import { Spin } from "antd";
// Import React từ thư viện react
import React from "react";

// Component GlobalSpin không nhận prop nào
function GlobalSpin() {
  // Sử dụng hook useIsFetching để kiểm tra xem có request nào đang được thực hiện hay không
  const isFetching = useIsFetching();

  // Nếu có request đang được thực hiện thì hiển thị Spin, ngược lại trả về null
  return isFetching ? (
    <Spin
      tip="Loading..." // Text hiển thị bên dưới icon
      fullscreen // Spin hiển thị trên toàn màn hình
      indicator={ // Custom icon cho Spin
        <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
      }
    />
  ) : null;
}

// Xuất component GlobalSpin
export default GlobalSpin;