import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import vi_VN from "antd/locale/vi_VN";
import App from "./App";
import GlobalSpin from "./components/reuse/GlobalSpin";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    locale={vi_VN} // Sử dụng ngôn ngữ tiếng Việt
    theme={{
      // Tùy chỉnh theme cho ứng dụng
      token: {
        colorPrimary: "#03884A",
        borderRadius: 8,
        colorBorderSecondary: "#bebebe",
      },
      components: {
        Menu: {
          colorBgContainer: "#03884A",
          horizontalItemSelectedBg: "#fff",
          itemSelectedColor: "#fff",
          colorPrimaryActive: "#fff",
          colorPrimaryText: "#fff",
          colorPrimary: "#fff",
        },
        Button: {
          colorBgBase: "#03884A",
          colorPrimaryBg: "#03884A",
        },
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <GlobalSpin />
      <App />
    </QueryClientProvider>
  </ConfigProvider>
);
