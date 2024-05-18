import { LoadingOutlined } from "@ant-design/icons";
import { useIsFetching } from "@tanstack/react-query";
import { Spin } from "antd";
import React from "react";

function GlobalSpin() {
  const isFetching = useIsFetching();

  return isFetching ? (
    <Spin
      tip="Loading..."
      fullscreen
      indicator={
        <LoadingOutlined style={{ fontSize: 24, color: "#fff" }} spin />
      }
    />
  ) : null;
}

export default GlobalSpin;
