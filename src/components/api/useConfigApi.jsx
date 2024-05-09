import { message } from "antd";
import axios from "axios";

export const useConfigApi = () => {
  const get = async (endPoint, postData) => {
    return await axios
      .post(`https://localhost:7097/api/${endPoint}`, postData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Set the content type
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        // use alert antd to show error

        message.error(err.message);
      });
  };

  return {
    get,
  };
};
