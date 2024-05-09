import { Col, Flex, Row, Typography } from "antd";
import React from "react";
import { renderTagColor } from "../../../../../../components/reuse/RenderTagColor";

const ChiTietTab = ({ data }) => {
  const gioiTinh =
    data.GioiTinh == "Male" ? "Nam" : data.GioiTinh == "Female" ? "Nữ" : "Khác";

  return (
    <Row gutter={24}>
      <Col span={12}>
        <Flex vertical gap={20}>
          <Flex>
            <Typography className="chitiet-label">Mã khách hàng:</Typography>
            <Typography.Text strong>{data.MaKhachHang}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Tên khách hàng:</Typography>
            <Typography.Text strong>{data.TenKhachHang}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Ngày sinh:</Typography>
            <Typography.Text strong>{data.NgaySinh}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Giới tính:</Typography>
            <Typography.Text strong>{gioiTinh}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Quốc gia:</Typography>
            <Typography.Text strong>{data.TenQuocGia}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Tỉnh/TP:</Typography>
            <Typography.Text strong>{data.TenTinhTP}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Quận/Huyện:</Typography>
            <Typography.Text strong>{data.TenQuanHuyen}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Xã/Phường:</Typography>
            <Typography.Text strong>{data.TenPhuongXa}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Địa chỉ:</Typography>
            <Typography.Text strong>{data.DiaChi}</Typography.Text>
          </Flex>
        </Flex>
      </Col>
      <Col span={12}>
        <Flex vertical gap={20}>
          <Flex>
            <Typography className="chitiet-label">Điện thoại:</Typography>
            <Typography.Text strong>{data.SoDienThoai}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Email:</Typography>
            <Typography.Text strong>{data.Email}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Số GTTT:</Typography>
            <Typography.Text strong>{data.SoGTTT}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Loại GTTT:</Typography>
            <Typography.Text strong>{data.TenGTTT}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Nghề nghiệp:</Typography>
            <Typography.Text strong>{data.NgheNghiep}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Nguồn khách:</Typography>
            <Typography.Text strong>{data.TenNguonKhach}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Ngày tạo:</Typography>
            <Typography.Text strong>{data.NgayTao}</Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Người tạo:</Typography>
            <Typography.Text strong>
              {data.TenNguoiDung} - {data.NguoiTao}
            </Typography.Text>
          </Flex>
          <Flex>
            <Typography className="chitiet-label">Trạng thái:</Typography>
            {renderTagColor({ renderedCellValue: data.TrangThai })}
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
};

export default ChiTietTab;
