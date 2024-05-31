import "./App.css";
import "./styles/common.scss";

import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import {
  authProvider,
  loginAction,
  loginLoader,
  protectedLoader,
} from "./components/auth/authProvider";
import { useAuthInfo } from "./components/auth/useAuthInfo";
import CustomLayout from "./components/layout/CustomLayout";
import LoginPage from "./pages/modules/Auth/Login/Login";
import BaoCaoKPI from "./pages/modules/BaoCao/BaoCaoKPI/BaoCaoKPI";
import QuanLyEticket from "./pages/modules/Eticket/QuanLyEticket/QuanLyEticket";
import ChiTietEticket from "./pages/modules/Eticket/TaoMoiEticket/ChiTietEticket/ChiTietEticket";
import TaoMoiEticket from "./pages/modules/Eticket/TaoMoiEticket/TaoMoiEticket";
import ChiTietKhachHang from "./pages/modules/KhachHang/ChiTietKhachHang/ChiTietKhachHang";
import LoadingPage from "./pages/modules/KhachHang/Loading/LoadingPage";
import QuanLyKhachHang from "./pages/modules/KhachHang/QuanLyKhachHang/QuanLyKhachHang";
import TaoMoiKhachHang from "./pages/modules/KhachHang/TaoMoiKhachHang/TaoMoiKhachHang";
import Page404 from "./pages/modules/Page404/Page404";
import QuanLyNguoiDung from "./pages/modules/QuanTri/NguoiDung/QuanLyNguoiDung/QuanLyNguoiDung";
import Welcome from "./pages/modules/Welcome/Welcome";

function App() {
  // createBrowserRouter là một hàm tạo router
  // Hàm này nhận vào một mảng các route
  // Mỗi route sẽ có các thuộc tính như id, path, loader, Component, children
  // id: id của route
  // path: đường dẫn của route
  // loader: hàm loader sẽ được gọi khi route được truy cập
  // Component: component sẽ được render khi route được truy cập
  // children: mảng các route con

  const router = createBrowserRouter([
    // Tạo router
    {
      id: "root",
      path: "/",
      loader() {
        // Our root route always provides the user, if logged in
        return { user: authProvider.Email };
      },
      Component: null,
      children: [
        {
          index: true,
          Component: Welcome,
        },
        {
          path: "login",
          action: loginAction,
          loader: loginLoader,
          Component: LoginPage,
        },
        {
          path: "dashboard",
          loader: protectedLoader,
          Component: CustomLayout,

          children: [
            {
              path: "khachhang",
              element: <QuanLyKhachHang />,
            },
            {
              path: "khachhang/:Type/:MaKhachHang?",
              element: <TaoMoiKhachHang />,
            },
            {
              path: "khachhang/detail/:MaKhachHang?",
              element: <ChiTietKhachHang />,
            },
            {
              path: "eticket",
              element: <QuanLyEticket />,
            },
            {
              path: "eticket/:Type/:MaTicket?",
              element: <TaoMoiEticket />,
            },
            {
              path: "eticket/detail/:MaTicket?",
              element: <ChiTietEticket />,
            },
            {
              path: "baocao",
              element: <BaoCaoKPI />,
            },
            {
              path: "quantri",
              loader: async () => {
                // Loader for admin route
                const { currentUser } = useAuthInfo(); // Get current user
                if (currentUser.FlagSysAdmin != "1") {
                  // Check if user is admin
                  return redirect("/dashboard"); // Redirect to home if not admin
                }

                return true;
              },
              element: <QuanLyNguoiDung />,
            },
            {
              path: "*",
              element: <Page404 />,
            },
          ],
        },
        {
          path: "*",
          element: <Page404 />,
        },
      ],
    },
    {
      path: "/logout",
      async action() {
        // We signout in a "resource route" that we can hit from a fetcher.Form
        await authProvider.signout();
        return redirect("/");
      },
    },

    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return <RouterProvider router={router} fallbackElement={<LoadingPage />} />; // Render router
}

export default App;
