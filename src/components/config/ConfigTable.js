// Hàm hook sử dụng để cấu hình bảng
export const useConfigTable = () => {
  // Trả về đối tượng cấu hình
  return {
    config: {
      // Cấu hình địa phương hóa
      localization: {
        rowsPerPage: "Hiển thị", // Chữ hiển thị trước số dòng trên mỗi trang
        sortByColumnAsc: "Sắp xếp theo thứ tự tăng dần", // Chữ hiển thị khi sắp xếp tăng dần
        sortByColumnDesc: "Sắp xếp theo thứ tự giảm dần", // Chữ hiển thị khi sắp xếp giảm dần
        page: "Trang", // Chữ hiển thị trước số trang hiện tại
        of: "của", // Chữ hiển thị giữa số trang hiện tại và tổng số trang
        nextPage: "Trang tiếp theo", // Chữ hiển thị cho nút trang tiếp theo
        previousPage: "Trang trước", // Chữ hiển thị cho nút trang trước
        firstPage: "Trang đầu", // Chữ hiển thị cho nút trang đầu
        lastPage: "Trang cuối", // Chữ hiển thị cho nút trang cuối
        clearSort: "Xóa sắp xếp", // Chữ hiển thị cho nút xóa sắp xếp
        clearFilter: "Xóa bộ lọc", // Chữ hiển thị cho nút xóa bộ lọc
        filterByColumn: "Lọc theo cột này", // Chữ hiển thị cho nút lọc theo cột
        hideColumn: "Ẩn cột này", // Chữ hiển thị cho nút ẩn cột
        showAllColumns: "Hiển thị tất cả các cột", // Chữ hiển thị cho nút hiển thị tất cả các cột
        showHideSearch: "Ẩn/Hiện tìm kiếm nhanh", // Chữ hiển thị cho nút ẩn/hiện tìm kiếm nhanh
        search: "Tìm kiếm...", // Chữ hiển thị cho ô tìm kiếm
        showHideFilters: "Ẩn/Hiện bộ lọc", // Chữ hiển thị cho nút ẩn/hiện bộ lọc
        showHideColumns: "Ẩn/Hiện cột", // Chữ hiển thị cho nút ẩn/hiện cột
        hideAll: "Ẩn tất cả", // Chữ hiển thị cho nút ẩn tất cả
        showAll: "Hiện tất cả", // Chữ hiển thị cho nút hiện tất cả
        toggleDensity: "Thay đổi tỷ lệ", // Chữ hiển thị cho nút thay đổi tỷ lệ
        toggleFullScreen: "Toàn màn hình", // Chữ hiển thị cho nút toàn màn hình
        clearSearch: "Xóa nội dung tìm kiếm", // Chữ hiển thị cho nút xóa nội dung tìm kiếm
      },
      enableGlobalFilter: false, // Tắt chức năng lọc toàn cầu
      enableFilters: false, // Tắt chức năng lọc
      enableDensityToggle: false, // Tắt chức năng thay đổi tỷ lệ
      enableFullScreenToggle: false, // Tắt chức năng toàn màn hình
      muiPaginationProps: {
        rowsPerPageOptions: [100, 200, 500, 1000, 2000, 5000, 100000], // Các tùy chọn số dòng trên mỗi trang
        showRowsPerPage: true, // Hiển thị chọn số dòng trên mỗi trang
      },
      displayColumnDefOptions: {
        "mrt-row-actions": {
          size: 80, // Nếu sử dụng layoutMode không phải là 'semantic', các cột sẽ không tự động điều chỉnh kích thước, vì vậy bạn cần đặt kích thước thủ công
          grow: false, // Không cho phép cột mở rộng
        },
      },
      enableDensityToggle: false, // Tắt chức năng thay đổi tỷ lệ
      enableEditing: false, // Tắt chức năng chỉnh sửa
    },
  };
};