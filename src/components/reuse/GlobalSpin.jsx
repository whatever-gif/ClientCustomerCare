import { useIsFetching } from "@tanstack/react-query";
import { Spin } from "antd";

function GlobalSpin() {
  const isFetching = useIsFetching();

  return isFetching ? <Spin fullscreen /> : null;
}

export default GlobalSpin;
