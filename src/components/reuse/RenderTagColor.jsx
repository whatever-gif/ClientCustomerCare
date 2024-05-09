import { Tag } from "antd";
import React from "react";

export const renderTagColor = ({ renderedCellValue }) => {
  if (renderedCellValue === "Open") {
    return <Tag color="#87d068">Mới tạo</Tag>;
  }
  if (renderedCellValue === "Processing") {
    return <Tag color="#D74B76">Đang xử lý</Tag>;
  }
  if (renderedCellValue === "Closed") {
    return <Tag color="#FBAB7E">Đóng</Tag>;
  }
  if (renderedCellValue === "Solved") {
    return <Tag color="#08AEEA">Hoàn thành</Tag>;
  }
  if (renderedCellValue === "1") {
    return <Tag color="#03884a">Hoạt động</Tag>;
  }
  if (renderedCellValue === "0") {
    return <Tag color="#bebebe">Không hoạt động</Tag>;
  }

  return <></>;
};
