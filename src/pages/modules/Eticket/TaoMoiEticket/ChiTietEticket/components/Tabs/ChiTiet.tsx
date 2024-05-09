import { Flex, Typography } from "antd";
import React from "react";

const ChiTiet = ({ data }) => {
  return (
    <Flex
      vertical
      gap={10}
      style={{
        padding: 10,
        overflow: "auto",
        height: 600,
      }}
    >
      <Flex align="center">
        <div
          style={{
            width: 60,
            fontWeight: "600",
          }}
        >
          Chi tiết:
        </div>
        <Typography.Text
          style={{
            width: "calc(100% - 60px)",
          }}
        >
          {data?.ChiTiet ?? ""}
        </Typography.Text>
      </Flex>

      <Flex align="start">
        <div
          style={{
            width: 150,
            fontWeight: "600",
          }}
        >
          Thời điểm tiếp nhận:
        </div>
        <Typography.Text
          style={{
            width: "calc(100% - 150px)",
          }}
        >
          {data?.ThoiDiemTiepNhan ?? ""}
        </Typography.Text>
      </Flex>

      <Flex align="start">
        <div
          style={{
            width: 150,
            fontWeight: "600",
          }}
        >
          Người tạo:
        </div>
        <Typography.Text
          style={{
            width: "calc(100% - 150px)",
          }}
        >
          {data?.TenNguoiTao ?? ""}
        </Typography.Text>
      </Flex>

      <Flex align="start">
        <div
          style={{
            width: 150,
            fontWeight: "600",
          }}
        >
          Thời gian tạo:
        </div>
        <Typography.Text
          style={{
            width: "calc(100% - 150px)",
          }}
        >
          {data?.ThoiGianTao ?? ""}
        </Typography.Text>
      </Flex>

      <Flex align="start">
        <div
          style={{
            width: 150,
            fontWeight: "600",
          }}
        >
          Người cập nhật:
        </div>
        <Typography.Text
          style={{
            width: "calc(100% - 150px)",
          }}
        >
          {data?.TenNguoiCapNhat ?? ""}
        </Typography.Text>
      </Flex>

      <Flex align="start">
        <div
          style={{
            width: 150,
            fontWeight: "600",
          }}
        >
          Thời gian cập nhật:
        </div>
        <Typography.Text
          style={{
            width: "calc(100% - 150px)",
          }}
        >
          {data?.ThoiGianCapNhat ?? ""}
        </Typography.Text>
      </Flex>
    </Flex>
  );
};

export default ChiTiet;
