import { faker } from "@faker-js/faker";
import { Flex, Input } from "antd";
import React from "react";
import "./FormTimKiem.scss";

const FormTimKiem = ({ formValue, onFormSubmit }) => {
  const onSearch = (value) => {
    const result = {
      ...formValue,
      Keyword: value,
      id: faker.string.uuid(),
    };

    onFormSubmit(result);
  };

  const { Search } = Input;

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
