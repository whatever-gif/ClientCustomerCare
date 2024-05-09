import { Card, Col, Flex, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { renderTagColor } from "../../../../../../components/reuse/RenderTagColor";

const EticketTab = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      gap={10}
      style={{
        height: 500,
        overflowY: "scroll",
        paddingRight: 10,
        paddingBottom: 60,
      }}
    >
      {data.map((item) => {
        const cardClassName =
          item.FlagQuaHanXuLy == 1
            ? "danger-card"
            : // : item.FlagQuaHanXuLy == 0 &&
              //   (item.MaTrangThaiTicket == "Closed" ||
              //     item.MaTrangThaiTicket == "Solved")
              // ? "success-card"
              "";

        const renderTag = renderTagColor({
          renderedCellValue: item.MaTrangThaiTicket,
        });

        const handleDetail = () => {
          navigate(`/dashboard/eticket/detail/${item.MaTicket}`);
        };

        return (
          <Card
            key={item.MaTicket}
            className={`custom-card ${cardClassName}`}
            onClick={handleDetail}
          >
            <Row gutter={24}>
              <Col span={8}>
                <Flex vertical gap={10}>
                  <Typography.Text>
                    <strong>Tên ticket:</strong> {item.TenTicket}
                  </Typography.Text>
                  <Typography.Text>
                    <strong>Phụ trách:</strong> {item.TenNguoiCapNhat}
                  </Typography.Text>
                </Flex>
              </Col>
              <Col span={8}>
                <Flex vertical gap={10}>
                  <Typography.Text>
                    <strong>Thời gian xử lý: </strong> {item.ThoiGianXuLy}
                  </Typography.Text>
                  <Typography.Text>
                    <strong>Thời gian tạo:</strong> {item.ThoiGianTao}
                  </Typography.Text>
                </Flex>
              </Col>
              <Col span={8}>
                <Flex vertical gap={10}>
                  <Typography.Text>
                    <strong>Trạng thái:</strong> {renderTag}
                  </Typography.Text>
                  <Typography.Text>
                    <strong>Deadline:</strong> {item.TicketDeadline}
                  </Typography.Text>
                </Flex>
              </Col>
            </Row>
          </Card>
        );
      })}

      {data.length === 0 && (
        <Flex align="center" justify="center" style={{ height: "100%" }}>
          <Typography.Text strong>Không có dữ liệu</Typography.Text>
        </Flex>
      )}
    </Flex>
  );
};

export default EticketTab;
