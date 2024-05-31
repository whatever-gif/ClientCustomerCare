import { faker } from "@faker-js/faker";
import { Flex, Input } from "antd";
import React from "react";
import "./FormTimKiem.scss";

const FormTimKiem = ({ formValue, onFormSubmit }) => {
  const onSearch = (value) => {
    // Hàm này sẽ được gọi khi tìm kiếm
    const result = {
      // Tạo đối tượng result từ dữ liệu form
      ...formValue,
      Keyword: value,
      id: faker.string.uuid(),
    };

    onFormSubmit(result); // Gọi hàm onFormSubmit và truyền đối tượng result vào
  };

  const { Search } = Input; // Lấy component Search từ Input

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        marginBottom: 12,
      }}
    >
      <Search
        placeholder="Tìm theo mã và tên"
        allowClear
        enterButton="Tìm kiếm"
        size="middle"
        onSearch={onSearch}
        style={{
          width: 500,
        }}
      />
    </Flex>
  );
};

export default FormTimKiem;
